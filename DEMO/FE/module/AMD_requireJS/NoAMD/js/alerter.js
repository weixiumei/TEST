// 有依赖的模块
(function(dataservice){
  let msg = 'alerter'
  function getMsg(){
    console.log('dataservice:', dataservice.getName())
    return msg
  }
  window.alerter = { getMsg }
})(dataservice)