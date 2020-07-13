//定义非独立的模块（这个模块依赖其他模块）
define(['module1', 'module2'], function(m1, m2) {
  return {
      methodC: function() {
          m1.methodA();
          m2.methodB();
      }
  };
});