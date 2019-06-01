
var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : sParameterName[1];
      }
  }
}
function formatDate(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1; m = m >= 10 ? m : '0'+m;
    var d = date.getDate(); d = d >= 10 ? d : '0'+d;
    return y+'-'+m+'-'+d;
}
function showLoadingToast(msg){
        var $loadingToast = $('.data_content');
        if ($loadingToast.css('display') != 'none') return;
        if(typeof msg == 'undefined'){
            msg = '加载中...';
        }
        $loadingToast.find('.weui-toast__content').html(msg);
        $loadingToast.fadeIn(100);
}
function hideLoadingToast(){
        var $loadingToast = $('.data_content');
        if ($loadingToast.css('display') == 'none') return;
        $loadingToast.fadeOut(100);
}
// 报错提示
function _error_handle(data){
    if(!!!data){
        return;
    }
    if(!!data.code){
        if((data.code+"").substring(0,1) == 1){
                storage.removeItem('NXPB_TOKEN');
                alert('长期未操作，登录已经超时，请重新登录');
                window.location.href = 'login.html';
        }
        switch(data.code){
            case 100002:
                storage.removeItem('NXPB_TOKEN');
                window.location.href = 'login.html';
            break;
        }
    }
}

$('.dropdown-toggle').dropdown();
var storage = window.localStorage;

var NtSF = angular.module('NtSF',[]);
NtSF.run(['$http', function($http) {
}]);
NtSF.controller('Login', ['$scope', '$http', function ($scope, $http) {
    //get user info
    $scope.data = {
        username:'',
        password:'',
        database: "peacebird",
        data:{

          }
    }
    $scope.login = function(){
        if(!!!$scope.data.username){
            $('input[name=username]').focus();
            return;
        }
        if(!!!$scope.data.password){
            $('input[name=password]').focus();
            return;
        }

        var url = API_URL_PREFIX + API_URL['LOGIN'];
        var config = {};
        // config.headers = {'Token' : TOKEN};
        $scope.loading = true;

        var data = $scope.data;

        $http.post(url,data,config).
        success(function(data) {
            if(data.code != 0){
                _error_handle(data);
                return;
            }
            if(!!!data.data.token){
                return _error_handle(data);
            }
            window.location.href = 'index.html';
        }).error(function(data,status,headers,config){
            _error_handle(data);
        }).finally(function(){
            $scope.loading = false;
        })

    }
}])
.controller('userInfo', ['$scope', '$http', function ($scope, $http) {
    //get user info
    $scope.user = {
        "avatar":"assets/img/avatar.jpg",
        "name":"Administrator",
        "id":1128
    };
}])
.controller('form', ['$scope', '$http', function ($scope, $http) {
    $scope.input = 'input';
    $scope.radio_list = [
        {id:1, name:'radio1'},
        {id:2, name:'radio2'}
    ];
    $scope.radio_input = $scope.radio_list[0].id;
    $scope.nowDate = new Date();
    
    $scope.checkbox_list = [
        {id:1, name:'checkbox1'},
        {id:2, name:'checkbox2'},
        {id:3, name:'checkbox3'},
    ];
    $scope.checkbox_input = $scope.checkbox_list[0].id;

    $scope.select_list = [
        {id:1, name:'select1'},
        {id:2, name:'select2'},
        {id:3, name:'select3'}
    ];
    $scope.select_input = $scope.select_list[0].id;

    $scope.click = function(){
        alert('1212345678');
    }
}])
.controller('table', ['$scope', '$http', function ($scope, $http) {

}])

.controller('bootstrapTest', ['$scope', '$http', function ($scope, $http) {
    $scope.check_all = false;
    $scope.table_list = [
        {id:1, code:001, name:'content1'},
        {id:2, code:002, name:'content2'},
        {id:3, code:003, name:'content3'}
    ];
    $scope.deleteSelectItemBtnShow = false;
    $scope.checkAll = function(){
        $scope.deleteSelectItemBtnShow = false;
        // $scope.isCheckedAll = !$scope.isCheckedAll;
        angular.forEach($scope.table_list, function(value, key){
            value.check = $scope.isCheckedAll;
        });
        if($scope.isCheckedAll && $scope.table_list.length!=0){
            $scope.deleteSelectItemBtnShow = true;
        }
    }
    $scope.checkItem = function(){
        $scope.isCheckedAll = true;
        $scope.deleteSelectItemBtnShow = false;
        angular.forEach($scope.table_list, function(value, key){
            if(!value.check){
                $scope.isCheckedAll = false;
            }
            if(value.check){
                $scope.deleteSelectItemBtnShow = true;
            }
        });
    }

    // arrayObject.splice(index,howmany,item1,.....,itemX)
    // index   必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
    // howmany 必需。要删除的项目数量。如果设置为 0，则不会删除项目。
    // item1, ..., itemX   可选。向数组添加的新项目。
    $scope.deleteOneItem = function(id){
        angular.forEach($scope.table_list, function(value, key){
            if(value.id == id){
                $scope.table_list.splice(key, 1);
            }
        });
    }
    $scope.deleteSelectItem = function(){
        $scope.table_list = $scope.table_list.filter(function(key) {
            if(!key.check){
                return key;
            }
        });
        // angular.forEach($scope.table_list, function(value, key){
        //     if(value.check){
        //         $scope.table_list.splice(key, 1);
        //     }
        // });
        $scope.deleteSelectItemBtnShow = false;
        $scope.isCheckedAll = false;
    }
}])

.controller('grid', ['$scope', '$http', function ($scope, $http) {

}])
// .controller('iscroll', ['$scope', '$http', function ($scope, $http) {
    // var vm = this;  // Use 'controller as' syntax 

    // vm.iScrollState = iScrollService.state;

    // iScrollServiceProvider.configureDefaults({
    //       iscroll: {
    //          invokeApply:false
    //      }
    //   });
        
    // var myScroll,
    //     pullDownEl, pullDownOffset,
    //     pullUpEl, pullUpOffset,
    //     generatedCount = 0;

    // $scope.pullDownAction = function(){
    //     setTimeout(function () {    // <-- Simulate network congestion, remove setTimeout from production!
    //         var el, li, i;
    //         el = document.getElementById('thelist');

    //         for (i=0; i<3; i++) {
    //             li = document.createElement('li');
    //             li.innerText = 'Generated row ' + (++generatedCount);
    //             el.insertBefore(li, el.childNodes[0]);
    //         }
            
    //         myScroll.refresh();     // Remember to refresh when contents are loaded (ie: on ajax completion)
    //     }, 1000);   // <-- Simulate network congestion, remove setTimeout from production!
    // }

    // // function pullUpAction () {
    // //     setTimeout(function () {    // <-- Simulate network congestion, remove setTimeout from production!
    // //         var el, li, i;
    // //         el = document.getElementById('thelist');

    // //         for (i=0; i<3; i++) {
    // //             li = document.createElement('li');
    // //             li.innerText = 'Generated row ' + (++generatedCount);
    // //             el.appendChild(li, el.childNodes[0]);
    // //         }
            
    // //         myScroll.refresh();     // Remember to refresh when contents are loaded (ie: on ajax completion)
    // //     }, 1000);   // <-- Simulate network congestion, remove setTimeout from production!
    // // }
    // $scope.loaded = function(){
    //     pullDownEl = document.getElementById('pullDown');
    //     pullDownOffset = pullDownEl.offsetHeight;
    //     // pullUpEl = document.getElementById('pullUp');   
    //     // pullUpOffset = pullUpEl.offsetHeight;
        
    //     myScroll = new iScroll('wrapper', {
    //         useTransition: true,
    //         topOffset: pullDownOffset,
    //         probeType:1,//执行scroll
    //         // startY:-pullDownOffset
    //         onRefresh: function () {
    //             if (pullDownEl.className.match('loading')) {
    //                 pullDownEl.className = '';
    //                 pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
    //             } 
    //             // else if (pullUpEl.className.match('loading')) {
    //             //     pullUpEl.className = '';
    //             //     pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
    //             // }
    //         },
    //         onScrollMove: function () {
    //             console.log('this.y : ' + this.y + '\n' + 'this.maxScrollY : ' + this.maxScrollY);
    //             if (this.y > 5 && !pullDownEl.className.match('flip')) {
    //                 pullDownEl.className = 'flip';
    //                 // pullUpEl.className = '';
    //                 pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
    //                 this.minScrollY = 0;
    //             } else if (this.y < 5 && pullDownEl.className.match('flip')) {
    //                 pullDownEl.className = '';
    //                 pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
    //                 this.minScrollY = -pullDownOffset;
    //             } 
    //             // else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
    //             //     pullUpEl.className = 'flip';
    //             //     pullDownEl.className = '';
    //             //     pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to refresh...';
    //             //     this.maxScrollY = this.maxScrollY;
    //             // } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
    //             //     pullUpEl.className = '';
    //             //     pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
    //             //     this.maxScrollY = pullUpOffset;
    //             // }
    //         },
    //         onScrollEnd: function () {
    //             if (pullDownEl.className.match('flip')) {
    //                 pullDownEl.className = 'loading';
    //                 pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';                
    //                 $scope.pullDownAction();   // Execute custom function (ajax call?)
    //             } 
    //             // else if (pullUpEl.className.match('flip')) {
    //             //     pullUpEl.className = 'loading';
    //             //     pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';                
    //             //     pullUpAction(); // Execute custom function (ajax call?)
    //             // }
    //         }
    //     });
        
    //     setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
    // }
    // // this.winRef.nativeWindow.addEventListener('touchmove', (evt) => {   
    // //     // do something here
    // //     e.preventDefault();
    // // }, false);
    // // $scope.onTouchmove = function(e){
    // //     e.preventDefault(); 
    // // }

    // document.ontouchmove('touchmove', function (e) { e.preventDefault(); }, false);
    // document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
// }])

.controller('echarts', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
    // echarts type
    $scope.echarts_list = [
            // {key:'all',value:'全部'},
            {key:'line',value:'折线/面积图'},
            {key:'bar',value:'柱状/条形图'},
            {key:'pie',value:'饼图'},
            {key:'radar',value:'雷达图'},
            // {key:'scatter',value:'散点（气泡）图'},
    ];
    $scope.select_echarts = $scope.echarts_list[0].key;

    // echarts自适应高度
    $scope.line_style = {
        'height1' : $('#line1').width() / 3 + 'px'
    }
    $scope.bar_style = {
        'height1' : $('#bar1').width() * 2 / 3 + 'px',
        'height2' : $('#bar2').width() * 2 / 3 + 'px',
        'height3' : $('#bar3').width() * 2 / 3 + 'px'
    }
    $scope.pie_style = {
        'height1' : $('#pie1').width() * 2 / 3 + 'px'
    }
    $scope.radar_style = {
        'height1' : $('#radar1').width() * 2 / 3 + 'px'
    }
    // 设定完高度，填充echarts
    $timeout(function(){
        $scope.echarts_line();
        $scope.echarts_bar();
        $scope.echarts_pie();
        $scope.echarts_radar();
    },0);

    // 折线/面积图
    $scope.echarts_line = function(){
        var echarts_line1 = echarts.init(document.getElementById('line1'));
        line_option1 = {
            color: ['#2185C5','#FFC0A7','#7986CB','#5BD0BB'],
            title: {
                text: '当月每日新增',
                textStyle:{
                    color:'#748292'
                }
            },
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                // data:['微信','京东店','实体店','天猫店'],
                left:'right',
                top:'6%',
                // itemHeight:14,
                orient:'horizontal',
                data: [{
                        name: '微信',
                        // 强制设置图形为圆。
                        icon: 'circle',
                        // color:'#2185C5'
                    },{
                        name: '京东店',
                        // 强制设置图形为圆。
                        icon: 'circle',
                        // color:'#2185C5'
                    },{
                        name: '实体店',
                        // 强制设置图形为圆。
                        icon: 'circle'
                    },{
                        name: '天猫店',
                        // 强制设置图形为圆。
                        icon: 'circle'
                    }
                ]
            },
            toolbox: {
                feature: {
                    saveAsImage: {}//可以保存当前echarts图
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                
                {
                    type : 'category',
                    boundaryGap : false,
                    splitLine:{  
                        show:true //显示网格
                    },
                    data : ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30']
                }
            ],
            yAxis : [
                {
                    max:120,
                    type : 'value',
                    // data:[10,20,30,40,50,60]
                }
            ],
            series : [
                {
                    name:'微信',
                    smooth: true,
                    type:'line',
                    areaStyle: {normal: {
                        opacity:0.2
                    }},
                    data:[20, 15, 20, 25, 20, 15, 20, 25, 20, 15, 20, 25, 20, 15, 20, 25, 20, 15, 20, 25, 20, 15, 20, 25, 20, 15, 20, 25, 20, 15]
                },
                {
                    name:'京东店',
                    type:'line',
                    smooth: true,
                    areaStyle: {normal: {
                        opacity:0.2
                    }},
                    data:[25, 20, 15, 20, 25, 20, 15, 20, 25, 20, 15, 20, 25, 20, 15, 20, 25, 20, 15, 20, 25, 20, 15, 20, 25, 20, 15, 20, 25, 20]
                },
                {
                    name:'实体店',
                    type:'line',
                    smooth: true,
                    areaStyle: {normal: {
                        opacity:0.2
                    }},
                    data:[35, 25, 13, 8, 5, 10, 18, 30, 35, 25, 13, 8, 5, 10, 18, 30, 35, 25, 13, 8, 5, 10, 18, 30, 35, 25, 13, 8, 5, 10]
                },
                {
                    name:'天猫店',
                    type:'line',
                    smooth: true,
                    areaStyle: {normal: {
                        opacity:0.2
                    }},
                    data:[40, 30, 40, 50, 40, 30, 40, 50, 40, 30, 40, 50, 40, 30, 40, 50, 40, 30, 40, 50, 40, 30, 40, 50, 40, 30, 40, 50, 40, 30]
                }
            ]
        };
        echarts_line1.setOption(line_option1);
    }
    // 柱状/条形图
    $scope.echarts_bar = function(){
        var echarts_bar1 = echarts.init(document.getElementById('bar1'));
        var echarts_bar2 = echarts.init(document.getElementById('bar2'));
        var echarts_bar3 = echarts.init(document.getElementById('bar3'));
        var echarts_bar4 = echarts.init(document.getElementById('bar4'));
        bar_option1 = {
            color: ['#BFEBFF','#2185C5','#FF8497'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                left:'right',
                orient:'horizontal',
                data: [{
                        name: '订单总数',
                        // 强制设置图形为圆。
                        icon: 'circle',
                        color:'#2185C5'
                    },{
                        name: '2单及以上订单数',
                        // 强制设置图形为圆。
                        icon: 'circle',
                        color:'#2185C5'
                    },{
                        name: '复购率',
                        // 强制设置图形为圆。
                        icon: 'circle'
                    }
                ]
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                top: '20%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                        {
                            min: 0,
                            max: 500,
                            type: 'value',
                            name: '数量',
                            position: 'left'
                        },
                        {
                            type: 'value',
                            name: '%',
                            min: 0 ,
                            max: 100,
                            tickInterval: 100,
                            // data : ['20%','40%','60%','80%','100%'],
                            position: 'right',
                            // boundaryGap:['20%','20%','20%','60%', '20%']
                        },
                    ],
            series: [
                        {
                            name:'订单总数',
                            type: 'bar',
                            silent: true,
                            barWidth: '60%',
                            barGap: '-100%',
                            data:[20, 152, 500, 434, 490, 430, 320, 250, 420, 320, 220, 240]
                        }, {
                            name:'2单及以上订单数',
                            type: 'bar',
                            barWidth: '60%',
                            z: 10,
                            data:[10, 52, 200, 334, 390, 330, 220, 220, 120, 220, 120, 220]
                        },
                        {
                            name:'复购率',
                            type:'line',
                            z: 11,
                            barWidth: '60%',
                            data:[10, 52, 200, 334, 390, 330, 220, 120, 230, 250, 210, 290]
                        }
                    ]
        };
        bar_option2 = {
            color: ['#2185C5','#FFC0A7','#7986CB','#5BD0BB'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                // data:['订单总数','2单及以上订单数','复购率'],
                left:'right',
                itemWidth:14, 
                itemGap: 40, //右上角标题的间距
                top: 2,
                align: 'right',//右上角标题的圆在左还是右
                right: 0,
                textStyle:{
                  color:'#34495E',
                  fontSize:14
                },
                orient:'horizontal',
                data: [{
                        name: '直营',
                        // 强制设置图形为圆。
                        icon: 'circle',
                        color:'#2185C5'
                    },{
                        name: '非公司直营',
                        // 强制设置图形为圆。
                        icon: 'circle',
                        color:'#FFC0A7'
                    },{
                        name: '承包',
                        // 强制设置图形为圆。
                        icon: 'circle',
                        color:'#7986CB'
                    },{
                        name: '加盟',
                        // 强制设置图形为圆。
                        icon: 'circle',
                        color:'#5BD0BB'
                    }
                ]
            },
            grid: {
                left: '10%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                        {
                            min: 0,
                            max: 250,
                            type: 'value',
                            name: '销量（商品售计量单位）',
                            position: 'left',
                            nameTextStyle:{
                                color:'#34495E',
                                fontSize:14,
                                // padding:[0,60,0,0] //第一个纵坐标的那么位移
                            },
                            nameGap:18
                        },
                        {
                            type: 'value',
                            name: '金额（元）',
                            min: 0,
                            // formatter:'%',
                            max: 10000,
                            tickInterval: 100,
                            // data : ['20%','40%','60%','80%','100%'],
                            position: 'right',
                            // boundaryGap:['20%','20%','20%','60%', '20%']
                        },
                    ],
            series : [
                {
                    name:'直营',
                    type:'bar',
                    silent: true,
                    barWidth: '60%',
                    stack: '订单总数',
                    data:[50, 12, 13, 14, 15, 16, 26, 37, 48, 39, 10, 11]
                },
                {
                    name:'非公司直营',
                    type:'bar',
                    barWidth: '60%',
                    barGap: '-100%',
                    stack: '订单总数',
                    data:[10, 20, 30, 40, 50, 60, 60, 70, 80, 90, 10, 11]
                },
                {
                    name:'承包',
                    type:'bar',
                    barWidth: '60%',
                    barGap: '-100%',
                    stack: '订单总数',
                    data:[20, 32, 23, 34, 45, 26, 36, 37, 28, 59, 60, 41]
                },
                {
                    name:'加盟',
                    type:'bar',
                    barWidth: '60%',
                    barGap: '-100%',
                    stack: '订单总数',
                    data:[50, 25, 36, 47, 53, 62, 65, 72, 81, 20, 60, 31]
                }
            ]
        };
        bar_option3 = {
            color: ['#2185C5'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                
                // data: ['直接访问', '邮件营销','联盟广告','视频广告','搜索引擎']
            },
            grid: {
                left: '3%',
                right: '10%',
                bottom: '3%',
                top:'4%',
                containLabel: true
            },
            xAxis:  {
                type: 'value',
                show:false
            },
            yAxis: {
                show:true,
                inverse:'true',
                axisLine:{
                    show:false
                },
                axisTick:{
                    show:false
                },
                axisLabel:{
                    // show:false
                },
                type: 'category',
                data: ['0012门店名称1','0012门店名称2','0012门店名称3','0012门店名称4','0012门店名称5','0012门店名称6','0012门店名称7','0012门店名称8','0012门店名称9','0012门店名称10']
            },
            series: [
                {
                    name: '直接访问',
                    type: 'bar',
                    stack: '总量',
                    barCategoryGap:'25%',
                    itemStyle:{
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            color:'#222',
                            fontSize:14
                        }
                    },
                    data: [2000, 1800, 1600, 1400, 1300, 1200, 1100, 1000, 900, 800]
                }
            ]
        };
        bar_option4 = {
            title: {
               text: "barTitle",
            },
            //animationDuration: 5000,
            grid: {
                top: 'center',
                left: '1%',
                right: '1%',
                height: '80%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                max: 100,
                axisLabel: {
                    show: true,
                },
                splitLine: {
                    show: false
                },
            },
            yAxis: [
                {   //蓝色条形
                    show:true,
                    inverse:true,
                    type: 'category',
                    
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    data: [
                        {
                            value:'发放人数',
                            textStyle:{
                                padding:[-30,-60,0,0],
                                color:'#1296db'
                            }
                        },
                        {
                            value:'打开人数',
                            textStyle:{
                                padding:[-30,-60,0,0],
                                color:'#1296db'
                            }
                            
                        },
                        {
                            value:'下单人数',
                            textStyle:{
                                padding:[-30,-60,0,0],
                                color:'#1296db'
                            }
                        }
                    ]
                }, {
                    //阴影条形
                    type: 'category',
                    show:false,
                    data: [],
                }
            ],
            series: [{
                name: '',
                type: 'bar',
                barWidth: 10,
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter: '{c}',
                        textStyle: {
                            fontWeight: 'bold',
                            fontFamily: 'Microsoft YaHei',
                            fontSize: 12
                        }
                    }
                },
                
                itemStyle: {
                    normal: {
                        barBorderRadius: 20,
                        shadowBlur: 0,
                        shadowColor: '',
                        color: '#1296db'
                    }
                },
                data: [12,23,45],
                z: 10
            }, {
                type: 'bar',
                barWidth: 10,
                yAxisIndex: 1,
                silent: true,
                itemStyle: {
                    normal: {
                        barBorderRadius: 20,
                        color: '#E0E4E8'
                    }
                },
                data: [100,100,100],
            }]
        };
        echarts_bar1.setOption(bar_option1);
        echarts_bar2.setOption(bar_option2);
        echarts_bar3.setOption(bar_option3);
        echarts_bar4.setOption(bar_option4);
    }
    // 饼图
    $scope.echarts_pie = function(){
        var echarts_pie1 = echarts.init(document.getElementById('pie1'));
        var echarts_pie2 = echarts.init(document.getElementById('pie2'));
        pie_option1 = {
            tooltip: {
                trigger: 'item',
                // formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            title: {
                text: '当月新增会员渠道占比',
                textStyle:{
                    color:'#748292'
                }
            },
            legend: {
                left:'right',
                top:'8%',
                orient:'horizontal',
                data: [{
                        name: '微信',
                        // 强制设置图形为圆。
                        icon: 'circle',
                    },{
                        name: '京东店',
                        // 强制设置图形为圆。
                        icon: 'circle',
                    },{
                        name: '实体店',
                        // 强制设置图形为圆。
                        icon: 'circle'
                    },{
                        name: '天猫店',
                        // 强制设置图形为圆。
                        icon: 'circle'
                    }
                ]
            },
            series: [
                {
                    name:'',
                    type:'pie',
                    radius: ['30%', '50%'],
                    // roseType : 'radius',
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            formatter: "{d}%"
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    data:[
                        {value:335, name:'微信'},
                        {value:310, name:'京东店'},
                        {value:234, name:'实体店'},
                        {value:135, name:'天猫店'},
                    ]
                }
            ]
        }
        pie_option2 = {
            title : {
                text: '南丁格尔玫瑰图',
                subtext: '纯属虚构',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                x : 'center',
                y : 'bottom',
                type:'scroll',
                //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                // icon: 'circle',
                data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {
                        show: true,
                        type: ['pie', 'funnel']
                    },
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            series : [
                {
                    name:'半径模式',
                    type:'pie',
                    radius : [30, 110],
                    center : ['50%', '50%'],
                    roseType : 'radius',
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    lableLine: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:[
                        {value:10, name:'rose1'},
                        {value:25, name:'rose2'},
                        {value:15, name:'rose3'},
                        {value:25, name:'rose4'},
                        {value:20, name:'rose5'},
                        {value:35, name:'rose6'},
                        {value:30, name:'rose7'},
                    ]
                }
            ]
        }
        echarts_pie1.setOption(pie_option1);
        echarts_pie2.setOption(pie_option2);
    }
    // 雷达图
    $scope.echarts_radar = function(){
        var echarts_radar1 = echarts.init(document.getElementById('radar1'));
        radar_option1 = {
            color:['#2185C5'],
            title: {
                text: '当月新增会员渠道占比',
                textStyle:{
                    color:'#748292'
                }
            },
            tooltip: {
                // trigger: 'axis'
            },
            legend: {
                // x: 'center'
            },
            radar: [
                {
                    indicator: [
                        {text: '50-200元', max: 100},
                        {text: '200-400元', max: 100},
                        {text: '400-600元', max: 100},
                        {text: '600-800元', max: 100},
                        {text: '800元以上', max: 100},
                    ],
                    center: ['50%','50%'],
                    radius: '60%'
                }
            ],
            series: [
                {
                    type: 'radar',
                     tooltip: {
                        trigger: 'item'
                    },
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data: [
                        {
                            value: [60, 73, 85, 40, 45],
                            name: '渠道占比',
                            areaStyle: {
                                normal: {
                                    opacity:0.2
                                }
                            },
                        }
                    ]
                }
            ]
        }
        echarts_radar1.setOption(radar_option1);
    }
}])
.controller('test2', ['$scope', '$http', function ($scope, $http) {
    $scope.keys = ['2017-10-16','2017-10-17'];
    $scope.leftLists = [{"2017-10-16":[{"return_status":"RECEIVED","total_amount":"1097.0","order_no":"201710261993","order_line":[{"sku":"114207022010380","image_url":"http://124.127.248.211:11000/www/72/114207022/114207022010/ZTImages/114207022010.jpg","name":"FL REPEAT B LORNA DRESS(LOVE)","color":"黑 Black","price":"399.0","size":"2","unit_price_paid":"365.66","quantity":"1","$$hashKey":"object:13"},{"sku":"114207022010360","image_url":"http://124.127.248.211:11000/www/72/114207022/114207022010/ZTImages/114207022010.jpg","name":"FL REPEAT B LORNA DRESS(LOVE)","color":"黑 Black","price":"399.0","size":"2","unit_price_paid":"365.67","quantity":"2","$$hashKey":"object:14"}],"mobile":"17635758550","accept_user_code":"DA00003813","street":"北京北京市朝阳区天阶大厦14层","refund_order_no":"","confirm_user_name":"","order_status":"ABNORMAL","order_date":"2017-10-16 15:00:00","refund_status":"","confirm_user_code":"","accept_user_name":"郭浩","out_order_no":"EH17102600001002","refund_type":"","customer_name":"唐静","$$hashKey":"object:7"},{"return_status":"RECEIVED","total_amount":"1097.0","order_no":"201710261993","order_line":[{"sku":"114207022010380","image_url":"http://124.127.248.211:11000/www/72/114207022/114207022010/ZTImages/114207022010.jpg","name":"FL REPEAT B LORNA DRESS(LOVE)","color":"黑 Black","price":"399.0","size":"2","unit_price_paid":"365.66","quantity":"1","$$hashKey":"object:13"},{"sku":"114207022010360","image_url":"http://124.127.248.211:11000/www/72/114207022/114207022010/ZTImages/114207022010.jpg","name":"FL REPEAT B LORNA DRESS(LOVE)","color":"黑 Black","price":"399.0","size":"2","unit_price_paid":"365.67","quantity":"2","$$hashKey":"object:14"}],"mobile":"17635758550","accept_user_code":"DA00003813","street":"北京北京市朝阳区天阶大厦14层","refund_order_no":"","confirm_user_name":"","order_status":"ABNORMAL","order_date":"2017-10-16 15:00:00","refund_status":"","confirm_user_code":"","accept_user_name":"郭浩","out_order_no":"EH17102600001002","refund_type":"","customer_name":"唐静","$$hashKey":"object:7"}],"2017-10-17":[{"return_status":"SOURCE_COMPLETE","total_amount":"350.0","order_no":"201711011996","order_line":[{"sku":"216121028160380","image_url":"","name":"O JAYDEN KNITTED DENIM JACKET","color":"牛仔蓝 Mid.Blue Denim","price":"699.0","size":"2","unit_price_paid":"350.0","quantity":"1"}],"mobile":"13683115287","accept_user_code":"DA00003813","street":"北京北京市海淀区中关村大街59号人大文化大厦5层","refund_order_no":"","confirm_user_name":"","order_status":"SHIPPED","order_date":"2017-10-17 15:00:00","refund_status":"","confirm_user_code":"","accept_user_name":"郭浩","out_order_no":"EH17110100001005","refund_type":"","customer_name":"杨朝梁","$$hashKey":"object:8"},{"return_status":"RECEIVED","total_amount":"350.0","order_no":"201711021991","order_line":[{"sku":"216121028160380","image_url":"","name":"O JAYDEN KNITTED DENIM JACKET","color":"牛仔蓝 Mid.Blue Denim","price":"699.0","size":"2","unit_price_paid":"350.0","quantity":"1"}],"mobile":"13683115287","accept_user_code":"NTdev01","street":"北京北京市海淀区中关村大街59号人大文化大厦5层","refund_order_no":"","confirm_user_name":"","order_status":"SHIPPED","order_date":"2017-10-17 15:00:00","refund_status":"","confirm_user_code":"","accept_user_name":"NTdev01","out_order_no":"EH17110200000001","refund_type":"","customer_name":"杨朝梁","$$hashKey":"object:9"}]}];
}])
.controller('test3', ['$scope', '$http', function ($scope, $http) {
    
}])
.controller('test', ['$scope', '$http', function ($scope, $http) {

    
    $scope.getDate = function(date){
        var Year = date.getFullYear();
        var Month = date.getMonth() + 1;
        var Day = date.getDate();
        if(String(Month).length == 1){
            Month = '0' + Month;
        }if(String(Day).length == 1){
            Day = '0' + Day;
        }
        year_month_day = Year + '-' + Month + '-' + Day ;
        return year_month_day;
    }
    // 截止日期
    $scope.end_date = new Date();
    //门店
    $scope.shop_list = [
                        {shop_code:'all',shop_name:'所有店仓'},
                        {shop_code:'other', shop_name:''}
                        ];
    // 年select
    $scope.year_day_list = [
                            {id:365, name:'一年（365天）'},
                            {id:730, name:'两年（730天）'},
                            {id:1095, name:'三年（1095天）'},
                            {id:1460, name:'四年（1460天）'}
                            ];
    $scope.searchType = $scope.year_day_list[0].id;
    // radio
    $scope.type_list = [
                        {id:'member', name:'客户数/占比' },
                        {id:'avg_amount', name:'平均每次购买金额/占比'},
                        {id:'total_amount', name:'累积购买金额/占比'}
                        ];
    $scope.searchRadio = $scope.type_list[0].id;

    $scope.shop_code_input = '';
    $scope.search_data = {
        // "begin_date": "2017-01-01",
        "end_date": $scope.getDate($scope.end_date),
        "shop_code": "all",
        "days": 365,
        "value_type": "member"
    }

    // //店铺选择
    // var url = API_URL_PREFIX + API_URL['SHOP_LIST'];
    // var config = {};
    // config.headers = {'Token' : TOKEN};
    // $scope.data = {shop_id:1};//test
    // $scope.loading = true;
    // $http.post(url,$scope.data,config).
    //     success(function(data) {
    //         if(data.code != 0){
    //             _error_handle(data);
    //             return;
    //         }
    //         $scope.shop_list = [{shop_code:'all',shop_name:'所有店铺'}];
    //         for(var i=0;i<data.data.shops.length;i++){
    //             $scope.shop_list.push(data.data.shops[i]);
    //         }
    //         // $scope.shop_select = $scope.shop_list[0].shop_id;
    //         // $scope.search();
    //     }).error(function(data,status,headers,config){
    //         _error_handle(data);
    //     }).finally(function(){
    //         $scope.loading = false;
    //     })
    //查询报表
    // $scope.button_disable = '';
    $scope.search = function(){
        $scope.button_disable_class = 'button_disable';

        if($scope.end_date==null){
            alert('日期不能为空');
            return;
        }
        if($scope.search_data.shop_code=="other" && $scope.shop_code_input==""){
            alert('指定店仓(编号)不能为空');
            return;
        }
        $scope.data = {
            "end_date": $scope.getDate($scope.end_date),
            "shop_code": $scope.search_data.shop_code!="other" ? "all" : $scope.shop_code_input,
            "days": $scope.search_data.days,
            "value_type": $scope.search_data.value_type
        }

        // var url = API_URL_PREFIX + API_URL['REPORT_MEMBER_RFM'];
        // var config = {};
        // config.headers = {'Token' : TOKEN};
        // $scope.loading = true;
        // $http.post(url,$scope.data,config).
        //     success(function(data) {
        //         if(data.code != 0){
        //             _error_handle(data);
        //             return;
        //         }
                
        //         $scope.list = data.data;
        //         $scope.max_arr = [];//列最大值
        //         for(var i=0;i<$scope.list.body[0].value.length-1;i++){
        //             var max = 0;
        //             for(var j=0;j<$scope.list.body.length-1;j++){
        //                 if($scope.list.body[j].value[i] > max){
        //                     max = $scope.list.body[j].value[i];
        //                 }
        //             }
        //             $scope.max_arr.push(max);
        //         }
        //         for(var i=0;i<$scope.list.body.length;i++){
        //             var values = [], max;
        //             for(var j=0;j<$scope.list.body[i].value.length;j++){
        //                 var num = $scope.list.body[i].value[j];
        //                 var rate;
        //                 if($scope.list.total_qty==0){
        //                     rate = 0
        //                 }else{
        //                     rate = (num / $scope.list.total_qty * 100) % 1 != 0 ? (num / $scope.list.total_qty * 100).toFixed(2) : num / $scope.list.total_qty * 100;
        //                 }
                        
        //                 if(i != $scope.list.body.length - 1){
        //                     max = $scope.max_arr[j];
        //                 }else{
        //                     max = 0;
        //                 }
        //                 values.push({num : num, rate : rate, max: max});
        //             }
        //             $scope.list.body[i].value = values;
        //         }
        //     }).error(function(data,status,headers,config){
        //         _error_handle(data);
        //     }).finally(function(){
        //         $scope.loading = false;
        //         $scope.button_disable_class = '';
        //     })
        
        $scope.list = {
            'header':{
                'name': 'RFM模型',
                'value': ['F=1', 'F=2', 'F=3', 'F=4', 'F≥5', '行合计']
            },
            'body': [
                {
                    'name': 'R≤30',
                    'value': [0, 0, 0, 0, 0, 0]
                },
                {
                    'name': '30＜R≤90',
                    'value': [0, 0, 0, 0, 0, 0]
                },
                {
                    'name': '90＜R≤180',
                    'value': [0, 0, 0, 0, 0, 0]
                },
                {
                    'name': '180＜R≤365',
                    'value': [2, 0, 0, 1, 0, 3]
                },
                {
                    'name': 'R＞365',
                    'value': [0, 0, 0, 0, 0, 0]
                },
                {   
                    'name': '列合计',
                    'value': [2, 0, 0, 1, 0, 3]
                }
            ],
            'uom_name': '人',
            'total_qty': 3
        }
    }

    $scope.search();
}])

.controller('angular', ['$scope', '$http', function ($scope, $http) {
    $scope.loadData1 = function(){
       console.log('加载数据1...');
    }
}])
.controller('angular2', ['$scope', '$http', function ($scope, $http) {
    $scope.crl_flavor = '百威';
    $scope.greet_click = function(name){
        alert('hello ' + name + '!');
    };
    $scope.loadData2 = function(){
       console.log('加载数据2...');
    };
}])
.directive('customDirective', customDirective)

.directive('hello', function(){
    return {
        restrict:'A',
        template:'<div>replace</div>',
        replace:true //替换
    } 
})
.directive('hello2', function(){
    return {
        restrict:'A',
        transclude:true,
        template:'<div>template <div ng-transclude></div> </div>'//包含
    } 
})

// 指令和控制器交互
.directive('loader',function(){
    return {
        restrict: 'A',
        link: function(scope, ele, attr){
            ele.bind('click',function(){
                // scope.loadData();
                // scope.$apply('loadData()');
                scope.$apply(attr.howtoload);//属性如果是驼峰（howToLoad）改为小写，属性如果是how-to-load改为howToLoad
            });
        }
    }
})
 // 指令间交互
.directive('superman',function(){
    return {
        scope:{},//独立scope,指令（包括同名）间不互相影响
        restrict:'E',
        controller:function($scope){
            //暴露些方法给外部使用
            $scope.abilities = [];
            this.addStrong = function(){
                $scope.abilities.push('strong');
            };
            this.addSpeed = function(){
                $scope.abilities.push('speed');
            };
            this.addLight = function(){
                $scope.abilities.push('light');
            };
        },
        link:function(scope, ele, attr){
            //处理内部事务：比如绑定事件，操作DOM
            ele.addClass('btn btn-primary');
            ele.bind('mouseenter',function(){
                console.log(scope.abilities);
            });
        }
    }
})
.directive('strong',function(){
    return {
        restrict:'C',
        require:'^superman',//依赖于Superman指令, 可注入supermanCtrl方法（superman的controller）
        link:function(scope, ele, attr, supermanCtrl){
            supermanCtrl.addStrong();
        }
    }
})
.directive('light',function(){
    return {
        restrict:'C',
        require:'^superman',
        link:function(scope, ele, attr, supermanCtrl){
            supermanCtrl.addLight();
        }
    }
})
.directive('speed',function(){
    return {
        restrict:'C',
        require:'^superman',
        link:function(scope, ele, attr, supermanCtrl){
            supermanCtrl.addSpeed();
        }
    }
})

// 绑定策略
// @ : 新的指令作用域可以访问当前本地作用域中的变量
.directive('myDirective', function () {
    return {
        restrict: 'A',//属性方式
        replace: true,

        scope: {
            myUrl:'@',//@绑定策略(默认绑定到 my-url指令属性)
            myLinkText:'@'//@绑定策略(默认绑定到 my-link-text 指令属性)
        },
        template: '<a href="{{myUrl}}">{{myLinkText}}</a>',
        // link:function(scope, ele, attr){
        //     scope.myUrl = attr.myUrl;
        //     scope.myLinkText = attr.myLinkText;
        // }
    }
})
// = : 指令和控制器里的数据双向绑定
.directive('drink', function () {
    return {
        restrict: 'E',//属性方式
        replace: true,
        scope: {
            flavor:'=',
        },
        template: '<input type="text" ng-model="flavor">'
    }
})

// & : 指令调用控制器里方法
.directive('greeting', function() {
    return {
        restrict: 'E',//属性方式
        replace: true,
        scope: {
            greet:'&',
        },
        templateUrl: 'template1.html'
        // template: '<div><input type="text" ng-model="userName"><button class="btn btn-default" ng-click="greet({name:userName})">Greeting</button></div>'
    }
})
.controller('testForm', ['$scope', '$http', function ($scope, $http) {
    $scope.user = {
        userName: 'wei',
        password: '123'
    }
    $scope.save = function(){
        alert('hello ' + $scope.user.userName);
    }
}])
.controller('about_date', ['$scope', '$http', function ($scope, $http) {
    $scope.search_type = 'today';
    $('.background').click(function(){
        $('.wrapper').hide();
        $('.background').hide();
        $('body').css('overflow','');
    });
    
    $scope.getData = function(search_type){
        $scope.yestoday_class = false;
        $scope.search_type = 'history';
        var startDate, endDate;
        if(search_type=='today'){
            $scope.today = formatDate(new Date());
            startDate = $scope.today;
            endDate = $scope.today;
            $scope.startDate = $scope.today;
            $scope.search_type = 'today';
        }else if(search_type=='yestoday' && !$('.wrapper').attr('data-date1')){             
            //昨天
            var day1 = new Date();
            day1.setDate(day1.getDate()-1);
            startDate = formatDate(day1);
            endDate = formatDate(day1);
            $scope.startDate = startDate;
            $('.wrapper').attr('data-date1','');
            $('.wrapper').attr('data-date2','');
            $scope.yestoday_class = true;
        }else{
            startDate = $('.wrapper').attr('data-date1');
            endDate = $('.wrapper').attr('data-date2');
            $scope.startDate = startDate + '/' + endDate;
        }
        $scope.loading = true;

        $scope.data = {
            "status": "S",
            "message": "成功",
            "data": {
                "total_amount": 125101,
                "order_count": 108,
                "on_line_sales": 0,
                "channel_sales": [
                    {
                        "product_count": 252,
                        "channel_name": "线下销售",
                        "amount": 125101,
                        "order_count": 108,
                        "channel_code": "OMNI_NT_POS"
                    }
                ],
                "employee_sales": [
                    {
                        "amount": 92507,
                        "user_code": "OTHER",
                        "user_name": "其他",
                        "user_channel_sales": [
                            {
                                "product_count": 190,
                                "channel_name": "线下销售",
                                "amount": 92507,
                                "order_count": 75,
                                "channel_code": "OMNI_NT_POS"
                            }
                        ]
                    },
                    {
                        "amount": 25335,
                        "user_code": "DA00396425",
                        "user_name": "张艳丽",
                        "user_channel_sales": [
                            {
                                "product_count": 48,
                                "channel_name": "线下销售",
                                "amount": 25335,
                                "order_count": 25,
                                "channel_code": "OMNI_NT_POS"
                            }
                        ]
                    },
                    {
                        "amount": 7259,
                        "user_code": "DA00048715",
                        "user_name": "童西",
                        "user_channel_sales": [
                            {
                                "product_count": 14,
                                "channel_name": "线下销售",
                                "amount": 7259,
                                "order_count": 8,
                                "channel_code": "OMNI_NT_POS"
                            }
                        ]
                    }
                ],
                "product_count": 252,
                "offline_sales": 125101
            }
        }
    }
    $scope.getData('today');
    $scope.setEcharts = function(){
        var sale_on_off = echarts.init(document.getElementById('sale_on_off'));
        option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            color: ['#FF9900', '#FFB97B'],
            // legend: {
            //     orient: 'vertical',
            //     x: 'left',
            //     data:['直接访问','邮件营销']
            // },
            series: [
                {
                    name:'销售渠道',
                    type:'pie',
                    radius: ['45%', '70%'],
                    // avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            formatter: "{d}%"
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    lableLine: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:[
                        {value: $scope.data.on_line_sales, name:'线上销售额'},
                        {value: $scope.data.offline_sales, name:'线下销售额'}
                    ]
                }
            ]
        };
        sale_on_off.setOption(option);
    }
    
    $scope.setEcharts();
}])

// 指令名驼峰
// (1) 在controller写业务逻辑（我们明白业务逻辑大部分是放在服务中），
//     这里所说的业务逻辑乃是为呈现视图之前而准备的数据或者是与其他指令进行数据交互而暴露这个api。
// (2) 在link中主要操作DOM。
function customDirective() {
    var directive = {
        restrict: 'AEMC',// attribute:属性  element:元素  comment:注释  class:样式类
        // template: '<div>{{vm.test}}</div><div>{{test}}</div>',
        template: '<div>{{test}}</div>',
        //编译之前执行控制器（controller），编译之后执行链接（link）。
        link: directiveLink,
        controller: directiveController,//暴露些方法给外部使用
        // controllerAs: 'vm'
    };
    return directive;
}
function directiveController($scope){
    $scope.test = " from contrller cnblogs";
}

function directiveLink(scope,elem,attr) {
    scope.test = scope.test + ",and from link cnblogs";
}

// function directiveLink(scope,elem,attr) {
//     scope.test = "I'm from Link";
// }
// function directiveController($scope) {
//     // var vm = this;
//     // vm.test = "I'm from Controller";
//     $scope.test = "I'm from Controller";
// }

























