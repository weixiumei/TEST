var Promise = (function() {
  function Promise(resolver) {
    if (typeof resolver !== 'function') { // resolver必须是函数
      throw new TypeError('Promise resolver ' + resolver + ' is not a function')
    }
    if (!(this instanceof Promise)) return new Promise(resolver)
    var self = this // 保存this
    self.callbacks = [] // 保存onResolve和onReject函数集合
    self.status = 'pending' // 当前状态
    function resolve(value) {
      setTimeout(function() { //异步调用
        if (self.status !== 'pending') {
          return
        }
        self.status = 'resolved' //修改状态
        self.data = value
        for (var i = 0; i < self.callbacks.length; i++) {
          self.callbacks[i].onResolved(value)
        }
      })
    }
    function reject(reason) {
      setTimeout(function(){ //异步调用
        if (self.status !== 'pending') {
          return
        }
        self.status = 'rejected' //修改状态
        self.data = reason
        for (var i = 0; i < self.callbacks.length; i++) {
          self.callbacks[i].onRejected(reason)
        }
      })
    }
    try{
      resolver(resolve, reject) // 执行resolver函数
    } catch(e) {
      reject(e)
    }
  }
  function resolvePromise(promise, x, resolve, reject) {
    var then
    if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) {
      try {
        then = x.then
        if (typeof then === 'function') {
          console.log('x=', x)
          then.call(x, function rs(y) {
            return resolvePromise(promise, y, resolve, reject)
          }, function rj(r) {
            return reject(r)
          })
        } else {
          return resolve(x)
        }
      } catch(e) {
        return reject(e)
      }
    } else {
      return resolve(x)
    }
  }
  Promise.prototype.then = function(onResolved, onRejected) {
    var self = this
    var promise2
    if (self.status === 'pending') {
      return promise2 = new Promise(function(resolve, reject) {
        self.callbacks.push({
          onResolved: function(value) {
            try {
              var x = onResolved(value)
              resolvePromise(promise2, x, resolve, reject)
            } catch(e) {
              return reject(e)
            }
          },
          onRejected: function(reason) {
            try {
              var x = onRejected(reason)
              console.log('2')
              resolvePromise(promise2, x, resolve, reject)
            } catch(e) {
              return reject(e)
            }
          }
        })
      })
    }

      //promise状态为resolved
      if (self.status === 'resolved') {
        console.log('XXXXXXXX1')
        return promise2 = new Promise(function(resolve, reject) {
            setTimeout(function() {
                try {
                    var x = onResolved(self.data)
                    console.log('3')
                    resolvePromise(promise2, x, resolve, reject)
                } catch(e) {
                    return reject(e)
                }
            })
        })
    }

    //promise状态为rejected
    if (self.status === 'rejected') {
      console.log('XXXXXXXX2')
        return promise2 = new Promise(function(resolve, reject) {
            setTimeout(function() {
                try {
                    var x = onRejected(self.data)
                    console.log('4')
                    resolvePromise(promise2, x, resolve, reject)
                } catch(e) {
                    return reject(e)
                }
            })
        })
    }
  }
  try { // CommonJS compliance
    module.exports = Promise
  } catch(e) {}
  return Promise
})()