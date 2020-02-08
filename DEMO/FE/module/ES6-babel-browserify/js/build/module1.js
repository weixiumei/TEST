'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = foo;
exports.bar = bar;
// 分别暴露
function foo() {
  console.log('foo');
}

function bar() {
  console.log('bar');
}

var arr = exports.arr = [1, 1, 5, 3, 2, 11];