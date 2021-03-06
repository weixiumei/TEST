/* eslint-disable */
function _detect () {
  var u = navigator.userAgent
  var isWX = u.indexOf('MicroMessenger') > -1 // wx
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  if (isWX) return 'wx'
  if (isAndroid) return 'android'
  if (isiOS) return 'ios'
  return ''
}

// Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Mobile/15A372
// Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36

var os = _detect()
var flagAd = true

// iOS的方法
function setupWebViewJavascriptBridge (callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(WebViewJavascriptBridge)
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback)
  }
  window.WVJBCallbacks = [callback]

  var WVJBIframe = document.createElement('iframe')
  WVJBIframe.style.display = 'none'
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
  document.documentElement.appendChild(WVJBIframe)
  setTimeout(function () {
    document.documentElement.removeChild(WVJBIframe)
  }, 0)
}

// android的方法
function connectWebViewJavascriptBridge (callback) {
  if (window.WebViewJavascriptBridge) {
    callback(WebViewJavascriptBridge)
  } else {
    document.addEventListener('WebViewJavascriptBridgeReady', function () {
      callback(WebViewJavascriptBridge)
    }, false)
  }
}

// h5调用原生方法
function callhandler (name, data, callback) {
  if (os === 'android') {
    connectWebViewJavascriptBridge(function (bridge) {
      if (flagAd) {
        bridge.init(function (message, responseCallback) {
          var data = {'Javascript Responds': 'Wee!'}
          responseCallback(data)
        })
        flagAd = false
      }
      bridge.callHandler(name, data, callback)
    })
  } else {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler(name, data, callback)
    })
  }
}

// 原生调用H5方法
function registerhandler (name, callback) {
  if (os === 'android') {
    connectWebViewJavascriptBridge(function (bridge) {
      var uniqueId = 1
      if (flagAd) {
        bridge.init(function (message, responseCallback) {
          var data = {'Javascript Responds': 'Wee!'}
          responseCallback(data)
        })
        flagAd = false
      }
      bridge.registerHandler(name, function (data) {
        callback(data)
      })
    })
  } else {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.registerHandler(name, function (data, responseCallback) {
        callback(data, responseCallback)
      })
    })
  }
}

module.exports = {
  registerhandler: registerhandler,
  callhandler: callhandler
}
