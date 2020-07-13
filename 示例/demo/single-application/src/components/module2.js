//另一种定义独立模块的方式
define(function () {
  return {
      methodA: function() {
          console.log('我是module2的methodA');    
      },
      methodB: function() {
          console.log('我是module2的methodB');    
      }
  };
});