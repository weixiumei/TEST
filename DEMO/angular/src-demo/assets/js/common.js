    
    var model = 'Debug';//Debug or Release
    
    var js_bridge = '';
    function setupWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        window.WVJBCallbacks = [callback];
        
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
    }


    
    function connectWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
            callback(WebViewJavascriptBridge)
        } else {
            document.addEventListener('WebViewJavascriptBridgeReady', function() {
                callback(WebViewJavascriptBridge)
            }, false)
        }

    }




    function _detect(){
        var u = navigator.userAgent;
        var isWX = u.indexOf('MicroMessenger') > -1; //android终端
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(isWX) return 'wx';
        if(isAndroid) return 'android';
        if(isiOS) return 'ios';
        return '';
    }

    function _share(bridge,device){
        js_bridge = bridge;
        if(device != 'ios'){
            bridge.init(function(message, responseCallback) {
                var data = { 'Javascript Responds':'Wee!' }
                responseCallback(data)
            })
        }
        if(typeof ext_js_bridge_btn != 'undefined'){
            ext_js_bridge_btn(bridge);
        }

        $('body').on('click','.author',function(e){
            e.preventDefault();
            e.stopPropagation();
            
            return false;
        })

    }

    function init_jsbridge(){

        var os = _detect();
        //console.log(os);
        switch(os){
            case 'wx':
                // _share2();
            break;
            case 'ios':
                setupWebViewJavascriptBridge(function(bridge) {
                    _share(bridge,'ios');
                })
            break;
            case 'android':
                connectWebViewJavascriptBridge(function(bridge) {
                    var uniqueId = 1
                    _share(bridge,'android');
                })
            break;
            default:
                // _share2();
            break;
        }


        // setupWebViewJavascriptBridge(function(bridge) {
        //     _share(bridge,'ios');
        // })
        // connectWebViewJavascriptBridge(function(bridge) {
        //     var uniqueId = 1
        //     _share(bridge,'android');
        // })
    };

    $(document).ready(function(){
        init_jsbridge();
    })
    