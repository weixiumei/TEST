// 没有依赖的模块
(function(){
  let name = 'dataservice'
  function getName(){
    return name
  }
  window.dataservice = {getName}
})()