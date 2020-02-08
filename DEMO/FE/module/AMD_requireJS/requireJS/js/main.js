requirejs.config({
  // 基本路径，出发点是根路径
  baseUrl: 'js/',
  // 没有baseUrl，出发点是当前路径
  paths: {
    dataService: './modules/dataService',
    alerter: './modules/alerter',
    jquery: './libs/jquery'
  }
});

require(['alerter', 'jquery'],function(alerter, $){
  alerter.getMsg()
  $('body').css('background', 'green')
})