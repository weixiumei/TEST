'use strict';

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _module = require('./module1');

var _module2 = require('./module2');

var _module3 = require('./module3');

var _module4 = _interopRequireDefault(_module3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// $(()=>{
//   $('body').css('background', 'green')
// })
// 引入(必须用结构赋值，一一对应)
_jquery2.default.ready = function () {
  (0, _jquery2.default)('body').css('background', 'green');
};

(0, _module.foo)();
(0, _module.bar)();
console.log(_module.arr);

(0, _module2.foo2)();
(0, _module2.bar2)();

_module4.default.foo();
console.log(_module4.default.a);