(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// node app.js

let uniq = require('uniq')

let module1 = require('./src/module1')
let module2 = require('./src/module2')
let module3 = require('./src/module3')
module1.far()
console.log(uniq(module1.arr))
module2()
module3.foo()
module3.bar()
},{"./src/module1":3,"./src/module2":4,"./src/module3":5,"uniq":2}],2:[function(require,module,exports){
"use strict"

function unique_pred(list, compare) {
  var ptr = 1
    , len = list.length
    , a=list[0], b=list[0]
  for(var i=1; i<len; ++i) {
    b = a
    a = list[i]
    if(compare(a, b)) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique_eq(list) {
  var ptr = 1
    , len = list.length
    , a=list[0], b = list[0]
  for(var i=1; i<len; ++i, b=a) {
    b = a
    a = list[i]
    if(a !== b) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique(list, compare, sorted) {
  if(list.length === 0) {
    return list
  }
  if(compare) {
    if(!sorted) {
      list.sort(compare)
    }
    return unique_pred(list, compare)
  }
  if(!sorted) {
    list.sort()
  }
  return unique_eq(list)
}

module.exports = unique

},{}],3:[function(require,module,exports){
let msg = 'module1'
function far(){
  console.log(msg)
}
let arr = [1,2,7,3,4,22]
// 暴露一个对象
module.exports = {
  far, 
  arr
}
},{}],4:[function(require,module,exports){
// 暴露一个函数
module.exports = function(){
  console.log('module2')
}
},{}],5:[function(require,module,exports){
// exports.xxx = value
exports.foo = function(){
  console.log('foo module3')
}
exports.bar = function(){
  console.log('bar module3')
}
},{}]},{},[1]);
