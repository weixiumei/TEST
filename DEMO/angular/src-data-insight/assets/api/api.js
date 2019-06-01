
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
                // window.location.href = 'login.html';
        }
        switch(data.code){
            case 100002:
                storage.removeItem('NXPB_TOKEN');
                // window.location.href = 'login.html';
            break;
        }
        alert(data.message);
    }
}

var storage = window.localStorage;

if(getUrlParameter('token') != null && getUrlParameter('token') != '' 
    && getUrlParameter('token') != undefined && getUrlParameter('token') != 'undefined'){
    sessionStorage.setItem('token', getUrlParameter('token'));
}else{
    sessionStorage.setItem('token', sessionStorage.getItem('token'));
}
var TOKEN = sessionStorage.getItem('token');
var shop_id = getUrlParameter('shop_id') * 1;

var NtSF = angular.module('NtSF',[]);
NtSF.run(['$http','$rootScope', function($http,$rootScope) {
   
}]);

// ==> 2017-01-01
function getStringDate(date){
    if(!!date){
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        if(month < 10){
            month = '0' + month;
        }
        if(day < 10){
            day = '0' + day;
        }
        return year + '-' + month + '-' + day;
    }else{
        return '';
    }
}

//月初
function getMonthFirst(date){
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    if(month < 10){
        month = '0' + month;
    }
    if(day < 10){
        day = '0' + day;
    }
    return year + '-' + month + '-' + '01';
}

NtSF.controller('indexContrl', ['$scope', '$http', function ($scope, $http) {
    
    $scope.go_data_insight = function(){
        window.location.href = 'data_search.html';
    } 
}])

NtSF.controller('dataInsightListContrl', ['$scope', '$http', function ($scope, $http) {
    
    $scope.list_data = [
        [
            {
                code:1,
                name:'浅色中码夏装的购买人群分析',
                people_num:'69012',
                date:'2018/04/24',
                checked:false,
                disalbe_checked:false
            },{
                name:'花草图案上衣爱好者',
                people_num:'34120',
                date:'2018/04/25',
                checked:false,
                disalbe_checked:false
            },{
                name:'花草图案上衣爱好者',
                people_num:'34120',
                date:'2018/04/25',
                checked:false,
                disalbe_checked:false
            },{
                name:'花草图案上衣爱好者',
                people_num:'34120',
                date:'2018/04/25',
                checked:false,
                disalbe_checked:false
            },{
                name:'花草图案上衣爱好者',
                people_num:'34120',
                date:'2018/04/25',
                checked:false,
                disalbe_checked:false
            },{
                name:'花草图案上衣爱好者',
                people_num:'34120',
                date:'2018/04/25',
                checked:false,
                disalbe_checked:false
            }
        ],
        [
            {
                name:'浅色中码夏装的购买人群分析',
                people_num:'69012',
                date:'2018/04/24',
                checked:false,
                disalbe_checked:false
            },{
                name:'浅色中码夏装的购买人群分析',
                people_num:'69012',
                date:'2018/04/24',
                checked:false,
                disalbe_checked:false
            }
        ],
        [
            {
                name:'花草图案上衣爱好者',
                people_num:'34120',
                date:'2018/04/25',
                checked:false,
                disalbe_checked:false
            }
        ]
    ]

    $scope.check = function(item,index){
        console.log(item.checked);
        // 换类选中时，其他项CheckBox清楚
        if(item.checked){
            for(var i=0; i<$scope.list_data.length; i++){
                if(i!=index){
                    for(var j=0; j<$scope.list_data[i].length;j++){
                        $scope.list_data[i][j].checked = false;
                    }
                }
            }
        };

        // 同一项选中两个时显示对比条，当前项的其他CheckBox不可编辑
        var count = 0;
        // $scope.disalbe_checked = false;
        for(var i=0;i<$scope.list_data[index].length;i++){
            if($scope.list_data[index][i].checked){
                count++
            }
        }

        if(count==2){
            $('.compare').show();
            for(var i=0;i<$scope.list_data[index].length;i++){
                $scope.list_data[index][i].disalbe_checked = !$scope.list_data[index][i].checked;
            }
        }else{
            $('.compare').hide();
            for(var i=0; i<$scope.list_data.length; i++){
                for(var j=0; j<$scope.list_data[i].length;j++){
                    $scope.list_data[i][j].disalbe_checked = false;
                }
            }
        }
    };

    // 显示编辑和删除下拉
    $scope.suolue_click = function(content_div_class, index){
        $('.'+content_div_class+' .pop'+index).toggle();
        $('#bg1').toggle();
    }

    // 点击编辑
    $scope.edit = function(item){
        $('.drop-down').hide();
        $('.edit').show();
        $('#bg2').show();
        $scope.edit_name = item.name;
    }
    $scope.qr = function(){
        $('.edit').hide();
        $('#bg2').hide();
    }
    $scope.qx = function(){
        $('.edit').hide();
        $('#bg2').hide();
    }
    $('#bg1').click(function(){
        $('.drop-down').hide();
        $('#bg1').hide();
    })

    $('#bg2').click(function(){
        $('.edit').hide();
        $('#bg2').hide();
    })

    // 删除
    $scope.delete = function(i,index){
        $scope.list_data[i].splice(index,1);
        $('.drop-down').hide();
    }

    $scope.go_data_insight = function(){
        window.location.href = 'data_search.html';
    }

    $scope.go_data_echarts = function(){
        window.location.href='data_echarts.html'
    }

    $scope.go_data_echarts_compare = function(){
        window.location.href='data_echarts_compare.html'
    }
    
    $scope.cancel = function(){
        $('.compare').hide();
        for(var i=0; i<$scope.list_data.length; i++){
            for(var j=0; j<$scope.list_data[i].length;j++){
                $scope.list_data[i][j].disalbe_checked = false;
                $scope.list_data[i][j].checked = false;
            }
        }
    }

}])

.controller('dataSearch', ['$scope', '$http', '$rootScope', '$timeout', function ($scope, $http, $rootScope, $timeout) {
    $('html').css('background-color',"#fff");
    $('body').css('background-color',"#fff");
    $scope.search_flg = 'find_customer';

    // 展开
    $scope.show_img = function(goods_for_consumer){
        goods_for_consumer.show_flg = !goods_for_consumer.show_flg;
    }
    // detail展开
    $scope.show_detail_img = function(category_type){
        category_type.show_flg = !category_type.show_flg;
    }
    // 生成数据包
    $scope.generating_packets = function(){
        console.log($scope.find_customers);
        window.location.href = 'data_echarts.html';
    }
    // 选择展开
    $scope.count_checked = function(find_customer, category_type, category){
        category.checked=!category.checked;
        $scope.category_type_arr = category_type.category_type_arr;

        if(category.checked){
            find_customer.count++;
        }else{
            find_customer.count--;
            category_type.show_detail = false;
            category_type.show_flg = false;
        }
        
        var category_type_arr = category_type.category_type_arr;
        for(var i=0;i<category_type_arr.length;i++){
            // 有detail且checked：显示show_detail=true
            if(category_type_arr[i].checked && category_type_arr[i].detail){
                for(var j=0;j<category_type_arr[i].detail.length;j++){
                    $scope.detail_name = category_type_arr[i].detail[j].name;
                }
                
                category_type.show_detail = true;
                category_type.show_flg = true;
                break;
            }
        }
    }

    $scope.detail_checked = function(detail){
        detail.checked=!detail.checked;
    }

    $timeout(
        function(){
            $scope.find_customers = find_customers;
            $scope.goods_for_consumers = goods_for_consumers;
        }
    , 0);
}])

// 单个
.controller('dataEchartsContrl',['$scope', '$http', '$timeout', function ($scope, $http, $timeout){
    // $('#echarts2').height($('#echarts2').width()*3/5);
    // $('#echarts3').height($('#echarts3').width()*3/5-2);
    // $('#echarts4').height($('#echarts4').width()*3/5);
    // $('.label_div').height($('#echarts2').width()*3/5);
    // $('#area_echarts').height($('#echarts2').width()*6/5);
    // $('.area_echarts_height').height($('.echarts_height').height()*2+1);

    $('.back').click(function(){
        window.location.href = 'data_insight_list.html';
    })

    // json data
    // 渠道
    $scope.channel_data = {
        // 预估人数
        estimate: 69021,
        channel:[
            {
                name:'实体店会员',
                rate:'10',
                people_num:6902
            },
            {
                name:'微信会员',
                rate:'15',
                people_num:9700
            },
            {
                name:'淘宝会员',
                rate:'25',
                people_num:12500
            },
            {
                name:'京东会员',
                rate:'50',
                people_num:34500
            }
        ]
    };
    // 地区分布
    $scope.area_data = {
        name : ['上海','北京','南京','成都','巴西','印尼','美国','浙江','江苏','山东'],
        distribution_num : [100, 200, 380, 400, 500, 560, 650,700,800,900]
    };

    // 会员标签
    $scope.label_data = [
        ['时尚', '忠实用户', '娱乐休闲', '服饰鞋帽', '偏爱休闲', '高收入', '搭配达人', '白领'],
        ['日韩控', '敏感', '可爱']
    ]

    // 会员状态
    $scope.state_data = {
        name : ['最近升级', '活跃会员', '新会员', '沉睡会员'],
        value : [58, 24, 43, 18]
    }

    // 客单价分布
    $scope.unit_price_data = {
        indicator:[
            {text: '400-600元', max: 100},
            {text: '200-400元', max: 100},
            {text: '50-200元', max: 100},
            {text: '800元以上', max: 100},
            {text: '600-800元', max: 100}
        ],
        value:[60,73,85,40,50]
    }

    // 消费频次
    $scope.frequency_data = {
        age_range : ['1-5','6-10','11-15','16-20','21-25','26-30','30以上'],
        value : [100, 200, 380, 400, 500, 560, 650]
    }

    // 渠道
    var dataStyle = {
        normal: {
            label: {
                show: false
            },
            labelLine: {
                show: false
            },
            // shadowBlur: 40,
            shadowColor: 'rgba(40, 40, 40, 0.5)',
        }
    };
    var placeHolderStyle = {
        normal: {
            color: '#D3DBF5', // 未完成的圆环的颜色
            label: {
                show: false
            },
            labelLine: {
                show: false
            }
        },
        emphasis: {
            color: 'rgba(44,59,70,1)' // 未完成的圆环的颜色
        }
    };

    var channel = $scope.channel_data.channel[0];
    var pies1 = echarts.init(document.getElementById('pies1'));
    var option_pies1 = {
        tooltip: {
            show: false,
        },
        toolbox: {
            show: false,
        },
        backgroundColor: '#fff',
        series: [{
            name: channel.name,
            type: 'pie',
            clockWise: false,
            radius: [35, 40],
            itemStyle: dataStyle,
            hoverAnimation: false,
            center: ['50%', '50%'],
            data: [{
                value: channel.rate,
                label: {
                    normal: {
                        formatter: '{a}',
                        position: 'center',
                        show: true,
                        textStyle: {
                            fontSize: '12',
                            fontWeight: 'normal',
                            color: '#34495E'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#409EFF',
                        shadowColor: '#409EFF',
                        shadowBlur: 10,
                        barBorderRadius: 7,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#74CDFF'},
                                {offset: 1, color: '#409EFF'}

                            ]
                        )
                    }
                }
            }, {
                value: 100 - channel.rate,
                name: 'invisible',
                itemStyle: placeHolderStyle,
            }]
        }]
    }
    pies1.setOption(option_pies1);

    var channel = $scope.channel_data.channel[1];
    var pies2 = echarts.init(document.getElementById('pies2'));
    var option_pies2 = {
        tooltip: {
            show: false,
        },
        toolbox: {
            show: false,
        },
        backgroundColor: '#fff',
        series: [{
            name: channel.name,
            type: 'pie',
            clockWise: false,
            radius: [35, 40],
            itemStyle: dataStyle,
            hoverAnimation: false,
            center: ['50%', '50%'],
            data: [{
                value: channel.rate,
                label: {
                    normal: {
                        formatter: '{a}',
                        position: 'center',
                        show: true,
                        textStyle: {
                            fontSize: '12',
                            fontWeight: 'normal',
                            color: '#34495E'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#409EFF',
                        shadowColor: '#409EFF',
                        shadowBlur: 10,
                        barBorderRadius: 7,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#74CDFF'},
                                {offset: 1, color: '#409EFF'}

                            ]
                        )
                    }
                }
            }, {
                value: 100 - channel.rate,
                name: 'invisible',
                itemStyle: placeHolderStyle,
            }]
        }]
    }
    pies2.setOption(option_pies2);

    var channel = $scope.channel_data.channel[2];
    var pies3 = echarts.init(document.getElementById('pies3'));
    var option_pies3 = {
        tooltip: {
            show: false,
        },
        toolbox: {
            show: false,
        },
        backgroundColor: '#fff',
        series: [{
            name: channel.name,
            type: 'pie',
            clockWise: false,
            radius: [35, 40],
            itemStyle: dataStyle,
            hoverAnimation: false,
            center: ['50%', '50%'],
            data: [{
                value: channel.rate,
                label: {
                    normal: {
                        formatter: '{a}',
                        position: 'center',
                        show: true,
                        textStyle: {
                            fontSize: '12',
                            fontWeight: 'normal',
                            color: '#34495E'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#409EFF',
                        shadowColor: '#409EFF',
                        shadowBlur: 10,
                        barBorderRadius: 7,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#74CDFF'},
                                {offset: 1, color: '#409EFF'}

                            ]
                        )
                    }
                }
            }, {
                value: 100 - channel.rate,
                name: 'invisible',
                itemStyle: placeHolderStyle,
            }]
        }]
    }
    pies3.setOption(option_pies3);

    var channel = $scope.channel_data.channel[3];
    var pies4 = echarts.init(document.getElementById('pies4'));
    var option_pies4 = {
        tooltip: {
            show: false,
        },
        toolbox: {
            show: false,
        },
        backgroundColor: '#fff',
        series: [{
            name: channel.name,
            type: 'pie',
            clockWise: false,
            radius: [35, 40],
            itemStyle: dataStyle,
            hoverAnimation: false,
            center: ['50%', '50%'],
            data: [{
                value: channel.rate,
                label: {
                    normal: {
                        formatter: '{a}',
                        position: 'center',
                        show: true,
                        textStyle: {
                            fontSize: '12',
                            fontWeight: 'normal',
                            color: '#34495E'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#409EFF',
                        shadowColor: '#409EFF',
                        shadowBlur: 10,
                        barBorderRadius: 7,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#74CDFF'},
                                {offset: 1, color: '#409EFF'}

                            ]
                        )
                    }
                }
            }, {
                value: 100 - channel.rate,
                name: 'invisible',
                itemStyle: placeHolderStyle,
            }]
        }]
    }
    pies4.setOption(option_pies4);
    
    // 地区分布
    var area_echarts = echarts.init(document.getElementById('area_echarts'));
    var option1 = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        title: {
            text: 'top10 区域',
            padding: 0,
            textStyle:{
                color: '#34495E',
                fontSize: '14'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '8%',
            top: '8%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            show:false,
            axisLabel:{
                show:false
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: 'category',
            data: $scope.area_data.name,
            splitLine: {show: false},
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            offset: 10,
            nameTextStyle: {
                fontSize: 15
            }
        },
        series: [
            {
                name: '地区分布',
                type: 'bar',
                data: $scope.area_data.distribution_num,
                barWidth: 10,
                barGap: 10,
                smooth: true,
                label: {
                    normal: {
                        show: false,
                        position: 'right',
                        offset: [5, -2],
                        textStyle: {
                            color: '#F68300',
                            fontSize: 13
                        }
                    }
                },
                itemStyle: {
                    emphasis: {
                        barBorderRadius: 7
                    },
                    normal: {
                        barBorderRadius: 7,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 1, 0,
                            [
                                {offset: 0, color: '#409EFF'},
                                {offset: 1, color: '#74CDFF'}

                            ]
                        )
                    }
                }
            }
        ]
    };
    area_echarts.setOption(option1);
    
    // 会员状态
    var echarts2 = echarts.init(document.getElementById('echarts2'));
    var option2 = {
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
                data : $scope.state_data.name,
                yxisTick: {
                    alignWithLabel: false
                },
                yxisLabel:{
                    show:false
                },
                yxisLine:{
                    show:false
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLine: true,
                axisLabel:{
                    show:true
                },
                show: false,
                // axisTick:{
                //     lineStyle:{
                //         type:'solid'
                //     }
                // }
            }
        ],
        series : [
            {
                name:'会员状态',
                type:'bar',
                barWidth: '35%',
                label: {
                    normal: {
                        show: false,
                        position: 'top',
                        formatter:'{c}%',
                        fontFamily:'PingFangSC-Regular',
                        fontSize:14,
                        color:'#748292'
                    }
                },
                itemStyle: {
                    emphasis: {
                        barBorderRadius: 7
                    },
                    normal: {
                        barBorderRadius: 5,
                        color: new echarts.graphic.LinearGradient(
                            0, 1, 0, 0,
                            [
                                {offset: 0, color: '#409EFF'},
                                {offset: 1, color: '#74CDFF'}

                            ]
                        )
                    }
                },
                data:$scope.state_data.value
            }
        ]
    }
    echarts2.setOption(option2);

    // 客单价分布
    var echarts3 = echarts.init(document.getElementById('echarts3'));
    option3 = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            x: 'center',
            // data: ['某软件','某主食手机','某水果手机','降水量','蒸发量']
        },
        radar: [
            {
                indicator: $scope.unit_price_data.indicator,
                center: ['50%','50%'],
                radius: 70
            }
        ],
        series: [
            {
                type: 'radar',
                 tooltip: {
                    trigger: 'item'
                },
                itemStyle: {
                    normal: {
                        areaStyle: {
                            type: 'default',
                            color:'#409EFF',
                            borderColor:'#fff'
                            
                        },
                        color:'#2185C5'
                        
                    }
                },
                lineStyle:{
                    normal:{
                        color:'#2185C5'
                    }
                    
                },
                data: [
                    {
                        value: $scope.unit_price_data.value,
                        name: '客单价分布'
                    }
                ]
            }
        ]
    };
    echarts3.setOption(option3);

    // 消费频次
    var echarts4 = echarts.init(document.getElementById('echarts4'));
    var option4 = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            top: '2%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            show:false,
            axisLabel:{
                show:false
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: 'category',
            data: $scope.frequency_data.age_range,
            splitLine: {show: false},
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            offset: 10,
            nameTextStyle: {
                fontSize: 15
            }
        },
        series: [
            {
                name: '消费频次',
                type: 'bar',
                data: $scope.frequency_data.value,
                barWidth: 8,
                barGap: 5,
                smooth: true,
                label: {
                    normal: {
                        show: false,
                        position: 'right',
                        offset: [5, -2],
                        textStyle: {
                            color: '#F68300',
                            fontSize: 13
                        }
                    }
                },
                itemStyle: {
                    emphasis: {
                        barBorderRadius: 7
                    },
                    normal: {
                        barBorderRadius: 7,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 1, 0,
                            [
                                {offset: 0, color: '#409EFF'},
                                {offset: 1, color: '#74CDFF'}

                            ]
                        )
                    }
                }
            }
        ]
    };
    echarts4.setOption(option4);

    window.onresize = function () {
        // $('#echarts2').height($('#echarts2').width()*3/5);
        // $('#echarts3').height($('#echarts3').width()*3/5-2);
        // $('#echarts4').height($('#echarts4').width()*3/5);
        // $('.label_div').height($('#echarts2').width()*3/5);
        // $('#area_echarts').height($('#echarts2').width()*6/5);
        // $('.area_echarts_height').height($('.echarts_height').height()*2+1);
        pies1.resize();
        pies2.resize();
        pies3.resize();
        pies4.resize();
        area_echarts.resize();
        echarts2.resize();
        echarts3.resize();
        echarts4.resize();
        // $('.content .label_div ul li').css('font-size', $('.label_div').height()/10*0.1);
    }
}])

// 对比
.controller('dataEchartsCompareContrl',['$scope', '$http', '$timeout', function ($scope, $http, $timeout){

    $('.back').click(function(){
        window.location.href = 'data_insight_list.html';
    })

    // 渠道
    $scope.channel_data = [
        {
            // 预估人数
            estimate1: 69021,
            channel:[
                {
                    name:'实体店会员',
                    rate:'5',
                    people_num:3000
                },
                {
                    name:'微信会员',
                    rate:'20',
                    people_num:11021
                },
                {
                    name:'淘宝会员',
                    rate:'25',
                    people_num:12500
                },
                {
                    name:'京东会员',
                    rate:'50',
                    people_num:34500
                }
            ]
        },{
            // 预估人数
            estimate2: 69021,
            channel:[
                {
                    name:'实体店会员',
                    rate:'10',
                    people_num:6902
                },
                {
                    name:'微信会员',
                    rate:'15',
                    people_num:9700
                },
                {
                    name:'淘宝会员',
                    rate:'25',
                    people_num:12500
                },
                {
                    name:'京东会员',
                    rate:'50',
                    people_num:34500
                }
            ]
        }
    ];

    // 地区分布
    $scope.area_data = [
        {
            name : [' 上海','北京','南京','深圳','海南','山东','黑龙江','浙江','江苏','河北'],
            distribution_num : [100, 200, 380, 400, 500, 560, 650,700,800,900]
        },
        {
            name : [' 上海','北京','南京','成都','四川','湖南','湖北','浙江','江苏','山东'],
            distribution_num : [50, 100, 180, 200, 400, 440, 550,600,620,700]
        }
    ];

    // 会员标签
    $scope.label_data = [
        ['时尚', '忠实用户', '娱乐休闲', '服饰鞋帽', '偏爱休闲', '高收入', '搭配达人', '白领'],
        ['日韩控', '敏感', '可爱', '偏爱休闲', '高收入', '非主流', '年轻人', '新潮']
    ];
    $scope.same_data = [];
    for(var i=0; i<$scope.label_data[0].length;i++){
        for(var j=0;j<$scope.label_data[1].length;j++){
            if($scope.label_data[0][i] == $scope.label_data[1][j]){
                $scope.same_data.push($scope.label_data[0][i]);
            }
        }
    }
    $scope.IsInArray = function(arr,val){ 
    　　var testStr = ',' + arr.join( "," ) + ",";
    　　return testStr.indexOf( "," + val + ",") != -1; 
    }

    // 会员状态
    $scope.state_data = {
        name : ['最近升级', '活跃会员', '新会员', '沉睡会员'],
        value1 : [58, 24, 43, 18],
        value2 : [28, 14, 23, 58]
    }

    // 客单价分布
    $scope.unit_price_data = {
        indicator:[
            {text: '400-600元', max: 100},
            {text: '200-400元', max: 100},
            {text: '50-200元', max: 100},
            {text: '800元以上', max: 100},
            {text: '600-800', max: 100}
        ],
        value1:[60,73,85,40,50],
        value2:[30,43,55,60,80]
    }

    // 消费频次
    $scope.frequency_data = {
        age_range : ['1-5','6-10','11-15','16-20','21-25','26-30','30以上'],
        value1 : [100, 200, 380, 400, 500, 360, 650],
        value2 : [50, 100, 280, 300, 400, 260, 450]
    }

    // $('#echarts2').height($('#echarts2').width()*3/5);
    // $('#echarts3').height($('#echarts3').width()*3/5-2);
    // $('#echarts4').height($('#echarts4').width()*3/5);
    // $('.label_div').height($('#echarts2').width()*3/5);
    // $('#area_echarts1').height($('#echarts2').width()*6/5);
    // $('#area_echarts2').height($('#echarts2').width()*6/5);
    // $('.area_echarts_height').height($('.echarts_height').height()*2+1);

    // 渠道
    var dataStyle = {
        normal: {
            label: {
                show: false
            },
            labelLine: {
                show: false
            },
            // shadowBlur: 40,
            shadowColor: 'rgba(40, 40, 40, 0.5)',
        }
    };
    var placeHolderStyle = {
        normal: {
            color: '#D3DBF5', // 未完成的圆环的颜色
            label: {
                show: false
            },
            labelLine: {
                show: false
            }
        },
        emphasis: {
            color: 'rgba(44,59,70,1)' // 未完成的圆环的颜色
        }
    };
    var pies1 = echarts.init(document.getElementById('pies1'));
    var option_pies1 = {
        
        tooltip: {
            show: false,
        },
        toolbox: {
            show: false,
        },
        backgroundColor: '#fff',
        series: [{
            name: $scope.channel_data[0].channel[0].name,
            type: 'pie',
            clockWise: false,
            radius: [35, 40],
            itemStyle: dataStyle,
            hoverAnimation: false,
            center: ['50%', '50%'],
            data: [{
                value: $scope.channel_data[0].channel[0].rate,
                label: {
                    normal: {
                        formatter: '{a}',
                        position: 'center',
                        show: true,
                        textStyle: {
                            fontSize: '12',
                            fontWeight: 'normal',
                            color: '#34495E'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#409EFF',
                        shadowColor: '#409EFF',
                        shadowBlur: 10,
                        barBorderRadius: 7,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#74CDFF'},
                                {offset: 1, color: '#409EFF'}

                            ]
                        )
                    }
                }
            }, {
                value: 100 - $scope.channel_data[0].channel[0].rate,
                name: 'invisible',
                itemStyle: placeHolderStyle,
            }]
        },
        {
            // name: '实体店会员',
            type: 'pie',
            clockWise: false,
            radius: [45, 50],
            itemStyle: dataStyle,
            hoverAnimation: false,
            center: ['50%', '50%'],
            data: [{
                value: $scope.channel_data[1].channel[0].rate,
                label: {
                    normal: {
                        formatter: '{a}',
                        position: 'center',
                        show: true,
                        textStyle: {
                            fontSize: '12',
                            fontWeight: 'normal',
                            color: '#34495E'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#0033C6',
                        shadowColor: '#0033C6',
                        shadowBlur: 10,
                        barBorderRadius: 7,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#0062E5'},
                                {offset: 1, color: '#0033C6'}

                            ]
                        )
                    }
                }
            }, {
                value: 100 - $scope.channel_data[1].channel[0].rate,
                name: 'invisible',
                itemStyle: placeHolderStyle,
            }]
        }]
    }
    pies1.setOption(option_pies1);

    var pies2 = echarts.init(document.getElementById('pies2'));
    var option_pies2 = {
        
        tooltip: {
            show: false,
        },
        toolbox: {
            show: false,
        },
        backgroundColor: '#fff',
        series: [{
            name: $scope.channel_data[0].channel[1].name,
            type: 'pie',
            clockWise: false,
            radius: [35, 40],
            itemStyle: dataStyle,
            hoverAnimation: false,
            center: ['50%', '50%'],
            data: [{
                value: $scope.channel_data[0].channel[1].rate,
                label: {
                    normal: {
                        formatter: '{a}',
                        position: 'center',
                        show: true,
                        textStyle: {
                            fontSize: '12',
                            fontWeight: 'normal',
                            color: '#34495E'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#409EFF',
                        shadowColor: '#409EFF',
                        shadowBlur: 10,
                        barBorderRadius: 7,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#74CDFF'},
                                {offset: 1, color: '#409EFF'}

                            ]
                        )
                    }
                }
            }, {
                value: 100 - $scope.channel_data[0].channel[1].rate,
                name: 'invisible',
                itemStyle: placeHolderStyle,
            }]
        },
        {
            // name: '实体店会员',
            type: 'pie',
            clockWise: false,
            radius: [45, 50],
            itemStyle: dataStyle,
            hoverAnimation: false,
            center: ['50%', '50%'],
            data: [{
                value: $scope.channel_data[1].channel[1].rate,
                label: {
                    normal: {
                        formatter: '{a}',
                        position: 'center',
                        show: true,
                        textStyle: {
                            fontSize: '12',
                            fontWeight: 'normal',
                            color: '#34495E'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#0033C6',
                        shadowColor: '#0033C6',
                        shadowBlur: 10,
                        barBorderRadius: 7,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#0062E5'},
                                {offset: 1, color: '#0033C6'}

                            ]
                        )
                    }
                }
            }, {
                value: 100 - $scope.channel_data[1].channel[1].rate,
                name: 'invisible',
                itemStyle: placeHolderStyle,
            }]
        }]
    }
    pies2.setOption(option_pies2);

    var pies3 = echarts.init(document.getElementById('pies3'));
    var option_pies3 = {
        
        tooltip: {
            show: false,
        },
        toolbox: {
            show: false,
        },
        backgroundColor: '#fff',
        series: [{
            name: $scope.channel_data[0].channel[2].name,
            type: 'pie',
            clockWise: false,
            radius: [35, 40],
            itemStyle: dataStyle,
            hoverAnimation: false,
            center: ['50%', '50%'],
            data: [{
                value: $scope.channel_data[0].channel[2].rate,
                label: {
                    normal: {
                        formatter: '{a}',
                        position: 'center',
                        show: true,
                        textStyle: {
                            fontSize: '12',
                            fontWeight: 'normal',
                            color: '#34495E'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#409EFF',
                        shadowColor: '#409EFF',
                        shadowBlur: 10,
                        barBorderRadius: 7,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#74CDFF'},
                                {offset: 1, color: '#409EFF'}

                            ]
                        )
                    }
                }
            }, {
                value: 100 - $scope.channel_data[0].channel[2].rate,
                name: 'invisible',
                itemStyle: placeHolderStyle,
            }]
        },
        {
            // name: '实体店会员',
            type: 'pie',
            clockWise: false,
            radius: [45, 50],
            itemStyle: dataStyle,
            hoverAnimation: false,
            center: ['50%', '50%'],
            data: [{
                value: $scope.channel_data[1].channel[2].rate,
                label: {
                    normal: {
                        formatter: '{a}',
                        position: 'center',
                        show: true,
                        textStyle: {
                            fontSize: '12',
                            fontWeight: 'normal',
                            color: '#34495E'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#0033C6',
                        shadowColor: '#0033C6',
                        shadowBlur: 10,
                        barBorderRadius: 7,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#0062E5'},
                                {offset: 1, color: '#0033C6'}

                            ]
                        )
                    }
                }
            }, {
                value: 100 - $scope.channel_data[1].channel[2].rate,
                name: 'invisible',
                itemStyle: placeHolderStyle,
            }]
        }]
    }
    pies3.setOption(option_pies3);

    var pies4 = echarts.init(document.getElementById('pies4'));
    var option_pies4 = {
        
        tooltip: {
            show: false,
        },
        toolbox: {
            show: false,
        },
        backgroundColor: '#fff',
        series: [{
            name: $scope.channel_data[0].channel[3].name,
            type: 'pie',
            clockWise: false,
            radius: [35, 40],
            itemStyle: dataStyle,
            hoverAnimation: false,
            center: ['50%', '50%'],
            data: [{
                value: $scope.channel_data[0].channel[3].rate,
                label: {
                    normal: {
                        formatter: '{a}',
                        position: 'center',
                        show: true,
                        textStyle: {
                            fontSize: '12',
                            fontWeight: 'normal',
                            color: '#34495E'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#409EFF',
                        shadowColor: '#409EFF',
                        shadowBlur: 10,
                        barBorderRadius: 7,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#74CDFF'},
                                {offset: 1, color: '#409EFF'}

                            ]
                        )
                    }
                }
            }, {
                value: 100 - $scope.channel_data[0].channel[3].rate,
                name: 'invisible',
                itemStyle: placeHolderStyle,
            }]
        },
        {
            // name: '实体店会员',
            type: 'pie',
            clockWise: false,
            radius: [45, 50],
            itemStyle: dataStyle,
            hoverAnimation: false,
            center: ['50%', '50%'],
            data: [{
                value: $scope.channel_data[1].channel[3].rate,
                label: {
                    normal: {
                        formatter: '{a}',
                        position: 'center',
                        show: true,
                        textStyle: {
                            fontSize: '12',
                            fontWeight: 'normal',
                            color: '#34495E'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#0033C6',
                        shadowColor: '#0033C6',
                        shadowBlur: 10,
                        barBorderRadius: 7,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#0062E5'},
                                {offset: 1, color: '#0033C6'}

                            ]
                        )
                    }
                }
            }, {
                value: 100 - $scope.channel_data[1].channel[3].rate,
                name: 'invisible',
                itemStyle: placeHolderStyle,
            }]
        }]
    }
    pies4.setOption(option_pies4);
    // 地区分布
    var area_echarts1 = echarts.init(document.getElementById('area_echarts1'));
    var option1_1 = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        title: {
            text: 'top10 区域',
            padding: 0,
            textStyle:{
                color: '#34495E',
                fontSize: '14'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '8%',
            top: '8%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            show:false,
            axisLabel:{
                show:false
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: 'category',
            data: $scope.area_data[0].name,
            splitLine: {show: false},
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            offset: 10,
            nameTextStyle: {
                fontSize: 15
            }
        },
        series: [
            {
                name: '地区分布',
                type: 'bar',
                data: $scope.area_data[0].distribution_num,
                barWidth: 10,
                barGap: 10,
                smooth: true,
                label: {
                    normal: {
                        show: false,
                        position: 'right',
                        offset: [5, -2],
                        textStyle: {
                            color: '#F68300',
                            fontSize: 13
                        }
                    }
                },
                itemStyle: {
                    emphasis: {
                        barBorderRadius: 7
                    },
                    normal: {
                        barBorderRadius: 7,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 1, 0,
                            [
                                {offset: 0, color: '#409EFF'},
                                {offset: 1, color: '#74CDFF'}

                            ]
                        )
                    }
                }
            }
        ]
    };
    area_echarts1.setOption(option1_1);

    var area_echarts2 = echarts.init(document.getElementById('area_echarts2'));
    var option1_2 = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        title: {
            // text: 'top10 区域',
            padding: 0,
            textStyle:{
                color: '#34495E',
                fontSize: '14'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '8%',
            top: '8%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            show:false,
            axisLabel:{
                show:false
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: 'category',
            data: $scope.area_data[1].name,
            splitLine: {show: false},
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            offset: 10,
            nameTextStyle: {
                fontSize: 15
            }
        },
        series: [
            {
                name: '地区分布',
                type: 'bar',
                data: $scope.area_data[1].distribution_num,
                barWidth: 10,
                barGap: 10,
                smooth: true,
                label: {
                    normal: {
                        show: false,
                        position: 'right',
                        offset: [5, -2],
                        textStyle: {
                            color: '#F68300',
                            fontSize: 13
                        }
                    }
                },
                itemStyle: {
                    emphasis: {
                        barBorderRadius: 7
                    },
                    normal: {
                        barBorderRadius: 7,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 1, 0,
                            [
                                {offset: 0, color: '#0033C6'},
                                {offset: 1, color: '#0062E5'}

                            ]
                        )
                    }
                }
            }
        ]
    };
    area_echarts2.setOption(option1_2);
    
    // 会员状态
    var echarts2 = echarts.init(document.getElementById('echarts2'));
    var option2 = {
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
                data : $scope.state_data.name,
                yxisTick: {
                    alignWithLabel: false
                },
                yxisLabel:{
                    show:false
                },
                yxisLine:{
                    show:false
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLine: true,
                axisLabel:{
                    show:true
                },
                show: false,
                // axisTick:{
                //     lineStyle:{
                //         type:'solid'
                //     }
                // }
            }
        ],
        series : [
            {
                name:'会员状态',
                type:'bar',
                barWidth: '25%',
                label: {
                    normal: {
                        show: false,
                        position: 'top',
                        formatter:'{c}%',
                        fontFamily:'PingFangSC-Regular',
                        fontSize:14,
                        color:'#748292'
                    }
                },
                itemStyle: {
                    emphasis: {
                        barBorderRadius: 7
                    },
                    normal: {
                        barBorderRadius: 5,
                        color: new echarts.graphic.LinearGradient(
                            0, 1, 0, 0,
                            [
                                {offset: 0, color: '#409EFF'},
                                {offset: 1, color: '#74CDFF'}

                            ]
                        )
                    }
                },
                data:$scope.state_data.value1
            },{
                // name:'会员状态',
                type:'bar',
                barWidth: '25%',
                label: {
                    normal: {
                        show: false,
                        position: 'top',
                        formatter:'{c}%',
                        fontFamily:'PingFangSC-Regular',
                        fontSize:14,
                        color:'#748292'
                    }
                },
                itemStyle: {
                    emphasis: {
                        barBorderRadius: 7
                    },
                    normal: {
                        barBorderRadius: 5,
                        color: new echarts.graphic.LinearGradient(
                            0, 1, 0, 0,
                            [
                                {offset: 0, color: '#0033C6'},
                                {offset: 1, color: '#0062E5'}
                            ]
                        )
                    }
                },
                data:$scope.state_data.value2
            }
        ]
    }
    echarts2.setOption(option2);

    // 客单价分布
    var echarts3 = echarts.init(document.getElementById('echarts3'));
    option3 = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            x: 'center',
            // data:['某软件','某主食手机','某水果手机','降水量','蒸发量']
        },
        radar: [
            {
                indicator: $scope.unit_price_data.indicator,
                center: ['50%','50%'],
                radius: 70
            }
        ],
        series: [
            {
                type: 'radar',
                 tooltip: {
                    trigger: 'item'
                },
                itemStyle: {
                    normal: {
                        areaStyle: {
                            type: 'default',
                            color:'#409EFF',
                            borderColor:'#fff'
                            
                        },
                        color:'#2185C5'
                        
                    }
                },
                lineStyle:{
                    normal:{
                        color:'#2185C5'
                    }
                    
                },
                data: [
                    {
                        value: $scope.unit_price_data.value1,
                        name: '客单价分布'
                    }
                ]
            },{
                type: 'radar',
                 tooltip: {
                    trigger: 'item'
                },
                itemStyle: {
                    normal: {
                        areaStyle: {
                            type: 'default',
                            color:'#0033C6',
                            borderColor:'#fff',
                            opacity:'0.12'
                            
                        },
                        color:'#0033C6'
                        
                    }
                },
                lineStyle:{
                    normal:{
                        color:'#0033C6'
                    }
                    
                },
                data: [
                    {
                        value: $scope.unit_price_data.value2,
                        name: '客单价分布'
                    }
                ]
            }
        ]
    };
    echarts3.setOption(option3);

    // 消费频次
    var echarts4 = echarts.init(document.getElementById('echarts4'));
    var option4 = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            top: '2%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            show:false,
            axisLabel:{
                show:false
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: 'category',
            data: $scope.frequency_data.age_range,
            splitLine: {show: false},
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            offset: 10,
            nameTextStyle: {
                fontSize: 15
            }
        },
        series: [
            {
                name: '消费频次',
                type: 'bar',
                data: $scope.frequency_data.value1,
                barWidth: 5,
                barGap: 1,
                smooth: true,
                label: {
                    normal: {
                        show: false,
                        position: 'right',
                        offset: [5, -2],
                        textStyle: {
                            color: '#F68300',
                            fontSize: 13
                        }
                    }
                },
                itemStyle: {
                    emphasis: {
                        barBorderRadius: 7
                    },
                    normal: {
                        barBorderRadius: 7,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 1, 0,
                            [
                                {offset: 0, color: '#409EFF'},
                                {offset: 1, color: '#74CDFF'}

                            ]
                        )
                    }
                }
            }
            ,{
                // name: '消费频次',
                type: 'bar',
                data: $scope.frequency_data.value2,
                barWidth: 5,
                barGap: 1,
                smooth: true,
                label: {
                    normal: {
                        show: false,
                        position: 'right',
                        offset: [5, -2],
                        textStyle: {
                            color: '#F68300',
                            fontSize: 13
                        }
                    }
                },
                itemStyle: {
                    emphasis: {
                        barBorderRadius: 7
                    },
                    normal: {
                        barBorderRadius: 7,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 1, 0,
                            [
                                {offset: 0, color: '#0033C6'},
                                {offset: 1, color: '#0062E5'}

                            ]
                        )
                    }
                }
            }
        ]
    };
    echarts4.setOption(option4);

    window.onresize = function () {
        // $('#echarts2').height($('#echarts2').width()*3/5);
        // $('#echarts3').height($('#echarts3').width()*3/5-2);
        // $('#echarts4').height($('#echarts4').width()*3/5);
        // $('.label_div').height($('#echarts2').width()*3/5);
        // $('#area_echarts').height($('#echarts2').width()*6/5);
        // $('.area_echarts_height').height($('.echarts_height').height()*2+1);
        pies1.resize();
        pies2.resize();
        pies3.resize();
        pies4.resize();
        area_echarts1.resize();
        area_echarts2.resize();
        echarts2.resize();
        echarts3.resize();
        echarts4.resize();
        // $('.content .label_div ul li').css('font-size', $('.label_div').height()/10*0.1);
    }
}])
.controller('dataInsightList',['$scope', '$http', function ($scope, $http){
    $scope.go_data_compare = function(){
        window.location.href = 'data_echarts_compare.html';
    }
    $scope.go_data_echarts = function(){
        window.location.href = 'data_echarts.html';
    }
}])

