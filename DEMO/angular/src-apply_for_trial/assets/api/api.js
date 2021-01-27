
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
NtSF.run(['$http', function($http) {
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
// //月末
// function getMonthLast(date){
//     date.setMonth(date.getMonth()+1);
//     var last = new Date(date.getFullYear() + '-' + (date.getMonth()+1) + '-' + '01');
//     last.setDate(last.getDate()-1);
//     var year = last.getFullYear();
//     var month = last.getMonth()+1;
//     var day = last.getDate();
//     if(month < 10){
//         month = '0' + month;
//     }
//     if(day < 10){
//         day = '0' + day;
//     }
//     return year + '-' + month + '-' + day;
// }

// NtSF.controller('Login', ['$scope', '$http', function ($scope, $http) {
//     //get user info
//     $scope.data = {
//         username:'',
//         password:'',
//         database: "peacebird",
//         data:{

//           }
//     }
//     $scope.login = function(){
//         if(!!!$scope.data.username){
//             $('input[name=username]').focus();
//             return;
//         }
//         if(!!!$scope.data.password){
//             $('input[name=password]').focus();
//             return;
//         }

//         var url = API_URL_PREFIX + API_URL['LOGIN'];
//         var config = {};
//         // config.headers = {'Token' : TOKEN};
//         $scope.loading = true;

//         var data = $scope.data;

//         $http.post(url,data,config).
//         success(function(data) {
//             if(data.code != 0){
//                 _error_handle(data);
//                 return;
//             }
//             if(!!!data.data.token){
//                 return _error_handle(data);
//             }
//             window.location.href = 'index.html';
//         }).error(function(data,status,headers,config){
//             _error_handle(data);
//         }).finally(function(){
//             $scope.loading = false;
//         })

//     }
// }])
NtSF.controller('getTable', ['$scope', '$http', function ($scope, $http) {
    
    
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
    $scope.button_disable_class = 'button_disable';
    $scope.search = function(){

        if($scope.end_date==null){
            alert('日期不能为空');
            return;
        }
        if($scope.search_data.shop_code=="other" && $scope.shop_code_input==""){
            alert('指定店仓(编号)不能为空');
            return;
        }
        $scope.button_disable_class = 'button_disable';

        $scope.data = {
            "end_date": $scope.getDate($scope.end_date),
            "shop_code": $scope.search_data.shop_code!="other" ? "all" : $scope.shop_code_input,
            "days": $scope.search_data.days,
            "value_type": $scope.search_data.value_type
        }

        var url = API_URL_PREFIX + API_URL['REPORT_MEMBER_RFM'];
        var config = {};
        config.headers = {'Token' : TOKEN};
        $scope.loading = true;
        $http.post(url,$scope.data,config).
            success(function(data) {
                if(data.code != 0){
                    _error_handle(data);
                    return;
                }
                
                $scope.list = data.data;
                $scope.max_arr = [];//列最大值
                for(var i=0;i<$scope.list.body[0].value.length-1;i++){
                    var max = 0;
                    for(var j=0;j<$scope.list.body.length-1;j++){
                        if($scope.list.body[j].value[i] > max){
                            max = $scope.list.body[j].value[i];
                        }
                    }
                    $scope.max_arr.push(max);
                }
                for(var i=0;i<$scope.list.body.length;i++){
                    var values = [], max;
                    for(var j=0;j<$scope.list.body[i].value.length;j++){
                        var num = $scope.list.body[i].value[j];
                        var rate;
                        if($scope.list.total_qty==0){
                            rate = 0
                        }else{
                            rate = (num / $scope.list.total_qty * 100) % 1 != 0 ? (num / $scope.list.total_qty * 100).toFixed(2) : num / $scope.list.total_qty * 100;
                        }
                        
                        if(i != $scope.list.body.length - 1){
                            max = $scope.max_arr[j];
                        }else{
                            max = 0;
                        }
                        values.push({num : num, rate : rate, max: max});
                    }
                    $scope.list.body[i].value = values;
                }
            }).error(function(data,status,headers,config){
                _error_handle(data);
            }).finally(function(){
                $scope.loading = false;
                $scope.button_disable_class = '';
            })
    }
    $scope.div_class_height={
        // 'height':$('.div_class').width()*3/4 + 'px'
    }

    $scope.search();
    // $scope.list = {
    //     'header':{
    //         'name': 'RFM模型',
    //         'value': ['F=1', 'F=2', 'F=3', 'F=4', 'F≥5', '行合计']
    //     },
    //     'body': [
    //         {
    //             'name': 'R≤30',
    //             'value': [0, 0, 0, 0, 0, 0]
    //         },
    //         {
    //             'name': '30＜R≤90',
    //             'value': [0, 0, 0, 0, 0, 0]
    //         },
    //         {
    //             'name': '90＜R≤180',
    //             'value': [0, 0, 0, 0, 0, 0]
    //         },
    //         {
    //             'name': '180＜R≤365',
    //             'value': [2, 0, 0, 1, 0, 3]
    //         },
    //         {
    //             'name': 'R＞365',
    //             'value': [0, 0, 0, 0, 0, 0]
    //         },
    //         {   
    //             'name': '列合计',
    //             'value': [2, 0, 0, 1, 0, 3]
    //         }
    //     ],
    //     'uom_name': '人',
    //     'total_qty': 3
    // }
}])

.controller('marketing', ['$scope', '$http', function ($scope, $http) {
    //radio 营销
    $scope.activity_list = [
                        {activity_code:'all',activity_name:'全部营销'},
                        {activity_code:'other', activity_name:''}
                        ];
    $scope.search_data = {
        activity_code: $scope.activity_list[0].activity_code
    }
    $scope.activity_code_input = '';
    $scope.button_disable_class = 'button_disable';
    $scope.search = function(){
        if($scope.activity_code_input == '' && $scope.search_data.activity_code == 'other'){
            alert('指定营销(编码)不能为空!');
            return;
        }

        $scope.button_disable_class = 'button_disable';
        $scope.data = {
            activity_code:''
        }
        if($scope.activity_code_input != '' && $scope.search_data.activity_code == 'other'){
            $scope.data.activity_code = $scope.activity_code_input;
        }else{
            $scope.data.activity_code = $scope.search_data.activity_code;
        }
        var url = API_URL_PREFIX + API_URL['ACTIVITY_STATISTICS'];
        var config = {};
        config.headers = {'Token' : TOKEN};
        $scope.loading = true;
        $http.post(url,$scope.data,config).
            success(function(data) {
                if(data.code != 0){
                    _error_handle(data);
                    return;
                }
                $scope.activity_data = data.data;
                $scope.setBar($scope.activity_data);
            }).error(function(data,status,headers,config){
                _error_handle(data);
            }).finally(function(){
                $scope.button_disable_class = '';
                $scope.loading = false;
            })
    }
    $scope.search();

    $scope.setBar = function(data){
        var marketing_bar = echarts.init(document.getElementById('marketing_bar'));
        option = {
            title: {
               text: "",
            },
            //animationDuration: 5000,
            grid: {
                top: 'center',
                left: '1%',
                right: '1%',
                height: '100%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                max: data.send_coupon_qty,
                axisLabel: {
                    show: true,
                },
                splitLine: {
                    show: false
                },
            },
            yAxis: [{
                show:false,
                type: 'category',
                data: ['发放人数','打开人数','下单人数']
            }, {
                type: 'category',
                // position: 'left',
                // margin:2,
                // offset:12,
                // axisLabel: {
                //     show: true,
                // },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                data: [],
                // data: ['发放人数','打开人数','下单人数'],
            }],
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
                data: [data.sale_order_total_qty,data.check_coupon_qty,data.send_coupon_qty],
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
                data: [data.send_coupon_qty,data.send_coupon_qty,data.send_coupon_qty],
            }]
        };
        marketing_bar.setOption(option);
    }
    
    // 营销活动
    // 结束时间: end_time、
    // 活动参与人数: activity_member、
    // 发券/领券人数: coupon_member、
    // 实际下单人数：order_member、
    // 成单金额：order_money，不传默认按结束时间排序
    $scope.order_list = [
            // {order_id : 'end_time',order_name : '结束时间'},
            {order_id : 'activity_member',order_name : '分组人数'},
            {order_id : 'coupon_member',order_name : '发放数'},
            {order_id : 'order_member',order_name : '下单数'},
            {order_id : 'order_money',order_name : '销售额'},
            {order_id : 'coupon_discount_amount',order_name : '优惠券抵扣金额'},
            {order_id : 'coupon_order_per',order_name : '下单转化率'}
        ];
    $scope.order_search_select = {
        order_id : $scope.order_list[3].order_id
    };
    // sort
    $scope.sort_type_list = [
        {sort_type:'desc',sort_type_name:'降序'},
        {sort_type:'asc',sort_type_name:'升序'}
    ]
    $scope.search_sort = {
        sort_type:$scope.sort_type_list[0].sort_type
    } 
    $scope.order_search = function(){
        $scope.data = {
            "sequence_type": $scope.order_search_select.order_id,
            "sort_type": $scope.search_sort.sort_type,
            "top_num": 5
        }
        var url = API_URL_PREFIX + API_URL['MEMBER_ACTIVITY_TOP'];
        var config = {};
        config.headers = {'Token' : TOKEN};
        $scope.loading = true;
        $http.post(url,$scope.data,config).
            success(function(data) {
                if(data.code != 0){
                    _error_handle(data);
                    return;
                }
                $scope.campaign_list = data.data.campaign_list;
            }).error(function(data,status,headers,config){
                _error_handle(data);
            }).finally(function(){
                $scope.loading = false;
            })
    }
    $scope.order_search();
}])

//会员复购率分析
.controller('rePurchasingRate', ['$scope', '$http', function ($scope, $http) {
    
    //门店
    $scope.shop_list = 
            [
                {shop_code:'all',shop_name:'所有店仓'},
                {shop_code:'other', shop_name:''}
            ];

    //条件
    $scope.search_condition = {
        'calculate_type':'',
        'time_code': '',
        'shop_code': $scope.shop_list[0].shop_code
    }
    $scope.shop_code_input = '';
    $scope.button_disable_class = 'button_disable';
    var url = API_URL_PREFIX + API_URL['REPEAT_TIME_CULCULATE'];
    var config = {};
    config.headers = {'Token' : TOKEN};
    $scope.loading = true;
    $http.post(url,$scope.search_condition,config).
        success(function(data) {
            if(data.code != 0){
                _error_handle(data);
                return;
            }
            // 年select
            $scope.year_list = [{'id':'all','value':'全部'}];

            $scope.year_list = $scope.year_list.concat(data.data.time_data);
            $scope.search_condition.time_code = $scope.year_list[0].id;
            $scope.getRepeatShoppingRate('by_member');
        }).error(function(data,status,headers,config){
            _error_handle(data);
        }).finally(function(){
            $scope.loading = false;
        })

    $scope.getRepeatShoppingRate = function(rateFlg){
        if(rateFlg != '' && rateFlg != null && rateFlg != undefined){
            $scope.search_condition.calculate_type = rateFlg;
        }
        if($scope.search_condition.shop_code=="other" && $scope.shop_code_input==""){
            alert('指定店仓(编号)不能为空');
            return;
        }

        $scope.button_disable_class = 'button_disable';
        $scope.data = angular.copy($scope.search_condition);

        $scope.data.shop_code = $scope.data.shop_code != "other" ? "all" : $scope.shop_code_input

        var url = API_URL_PREFIX + API_URL['REPEAT_SHOPPING_RATE'];
        var config = {};
        config.headers = {'Token' : TOKEN};
        $scope.loading = true;
        $http.post(url,$scope.data,config).
            success(function(data) {
                if(data.code != 0){
                    _error_handle(data);
                    return;
                }
                $scope.charts_data = data.data;
                $scope.set_charts_re_purchasing_rate($scope.charts_data);
            }).error(function(data,status,headers,config){
                _error_handle(data);
            }).finally(function(){
                $scope.button_disable_class = '';
                $scope.loading = false;
            })
        
    };

    // 会员销售额分析
    $scope.button_disable_class2 = 'button_disable';
    var start_date = new Date()
    $scope.sale_data = {
        'start_date':new Date(getMonthFirst(new Date())),
        'end_date':new Date(new Date())
    };
    $scope.search2 = function(){
        if($scope.sale_data.start_date==null||$scope.sale_data.end_date==null){
            alert('请输入日期条件！');
            return;
        }

        $scope.sale_in_data = {
            'start_date':getStringDate($scope.sale_data.start_date),
            'end_date':getStringDate($scope.sale_data.end_date)
        };
        $scope.button_disable_class2 = 'button_disable';
        var url = API_URL_PREFIX + API_URL['CRM_MEMBER_SHOPPING_MONEY'];
        var config = {};
        config.headers = {'Token' : TOKEN};
        $scope.loading = true;
        $http.post(url, $scope.sale_in_data, config).
            success(function(data) {
                if(data.code != 0){
                    _error_handle(data);
                    return;
                }
                $scope.sale_out_data = data.data;
            }).error(function(data,status,headers,config){
                _error_handle(data);
            }).finally(function(){
                $scope.button_disable_class2 = '';
                $scope.loading = false;
            })
    }
    $scope.search2();

    $scope.charts_height={
        'height':$('#charts_re_purchasing_rate').width()*2/4
    }
    $scope.set_charts_re_purchasing_rate = function(charts_data){
        var charts_re_purchasing_rate = echarts.init(document.getElementById('charts_re_purchasing_rate'));
        
        var total_amount_list = charts_data.body.total_amount.value;
        var max_num = 0;
        for(var i=0;i<total_amount_list.length;i++){
            if(total_amount_list[i] > max_num){
                max_num = total_amount_list[i];
            }
        }
        max_num = (max_num == 0) ? 50 : ((max_num%50 != 0) ? Math.ceil(max_num/50)*50 : max_num);

        var rate_list = [];
        $.each(charts_data.body.rate.value,function(index,value){
            rate_list.push((value*100).toFixed(2)*1);
        });

        var option = {
            color: ['#BFEBFF','#2185C5','#FF8497'],
            tooltip : {
                trigger: 'axis',
                // formatter: "{a} <br/>{b}: {c}"
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter:  '{b}'+'<br/>'
                            +'{a0}: {c0}'+'<br/>'
                            +'{a1}: {c1}'+'<br/>'
                            +'{a2}: {c2}%'
            },
            legend: {
                // data:['订单总数','2单及以上订单数','复购率'],
                left:'right',
                top: 22,
                // right: 10,
                // align: 'right',
                // itemWidth:14,
                padding:[0,65,0,0],
                orient:'horizontal',
                data: [{
                        // name: '订单总数',
                        name: charts_data.body.total_amount.name,
                        // 强制设置图形为圆。
                        icon: 'circle',
                        color:'#2185C5'
                    },{
                        // name: '2单及以上订单数',
                        name: charts_data.body.above_limit.name,
                        // 强制设置图形为圆。
                        icon: 'circle',
                        color:'#2185C5'
                    },{
                        // name: '复购率',
                        name: charts_data.body.rate.name,
                        // 强制设置图形为圆。
                        icon: 'circle'
                    }
                ]
            },
            grid: {
                left: '3%',
                right: '42',
                top: '80',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : charts_data.time_body.value,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                        {
                            min: 0,
                            max: max_num,
                            type: 'value',
                            name: $scope.search_condition.calculate_type=='by_member'?'人':'单',
                            position: 'left'
                        },
                        {
                            type: 'value',
                            name: '%',
                            min: 0 ,
                            // formatter:'%',
                            max: 100,
                            tickInterval: 100,
                            // data : ['20%','40%','60%','80%','100%'],
                            position: 'right',
                            // boundaryGap:['20%','20%','20%','60%', '20%']
                            // nameTextStyle:{
                            //     padding:[0,90,0,0]
                            // },
                        },
                    ],
            series: [
                        {
                            // name:'订单总数',
                            name: charts_data.body.total_amount.name,
                            type: 'bar',
                            silent: true,
                            barWidth: '60%',
                            barGap: '-100%', // Make series be overlap
                            data:charts_data.body.total_amount.value
                            // data:[20, 152, 500, 434, 590, 430, 320, 250, 420, 320, 220, 380]
                        }, {
                            // name:'2单及以上订单数',
                            name: charts_data.body.above_limit.name,
                            type: 'bar',
                            barWidth: '60%',
                            z: 10,
                            data:charts_data.body.above_limit.value
                            // data:[10, 52, 200, 334, 390, 330, 120, 230, 160, 220, 200, 220]
                        },
                        {
                            // name:'复购率',
                            name: charts_data.body.rate.name,
                            type:'line',
                            z: 11,
                            yAxisIndex: 1,
                            barWidth: '60%',
                            data:rate_list
                            // data:[10, 52, 200, 334, 390, 330, 120, 230, 160, 220, 200, 220]
                        }
                    ]
        };
        charts_re_purchasing_rate.setOption(option);
    }
    
}])

//新增会员分析
.controller('newMemberAnalysis', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
    
    // $scope.year_list = [
    //     {'id':'2015','value':'2015年'},
    //     {'id':'2016','value':'2016年'},
    //     {'id':'2017','value':'2017年'},
    // ];
    $scope.month_list = [
        {'id':'1','value':'1月'},
        {'id':'2','value':'2月'},
        {'id':'3','value':'3月'},
        {'id':'4','value':'4月'},
        {'id':'5','value':'5月'},
        {'id':'6','value':'6月'},
        {'id':'7','value':'7月'},
        {'id':'8','value':'8月'},
        {'id':'9','value':'9月'},
        {'id':'10','value':'10月'},
        {'id':'11','value':'11月'},
        {'id':'12','value':'12月'},
    ];

    var url = API_URL_PREFIX + API_URL['NEW_MEMBER_REGISTER_YEAR'];
    var config = {};
    config.headers = {'Token' : TOKEN};
    $scope.loading = true;
    $http.post(url,$scope.search_condition,config).
        success(function(data) {
            if(data.code != 0){
                _error_handle(data);
                return;
            }
            // 年select
            $scope.year_list = data.data.time_data;
            //条件
            // (new Date()).getMonth()
            $scope.search_condition = {
                'year_code': $scope.year_list[0].id,
                'month_code': (new Date()).getMonth() + ''
            }
            $scope.getNewMemberAnalysis1();

        }).error(function(data,status,headers,config){
            _error_handle(data);
        }).finally(function(){
            $scope.loading = false;
        })
    $scope.loading1 = true;
    $scope.loading2 = true;
    $scope.loading3 = true;
    $scope.button_disable_class = 'button_disable';
    // 折线图
    $scope.getNewMemberAnalysis1 = function(){

        $scope.loading1 = true;
        $scope.loading2 = true;
        $scope.loading3 = true;
        $scope.month_code2 = $scope.search_condition.month_code;
        $scope.button_disable_class = 'button_disable';
        var url = API_URL_PREFIX + API_URL['NEW_MEMBER_CALCULATE'];
        var config = {};
        config.headers = {'Token' : TOKEN};
        $scope.loading1 = true;
        $http.post(url,$scope.search_condition,config).
            success(function(data) {
                if(data.code != 0){
                    _error_handle(data);
                    return;
                }
                $scope.charts_data1 = data.data;
                $scope.set_charts_new_member_analysis1($scope.charts_data1);
                $scope.getNewMemberAnalysis2();
                var timeout = $timeout( function(){ 
                    $scope.setTimeout1();
                }, 0);
                
            }).error(function(data,status,headers,config){
                _error_handle(data);
            }).finally(function(){
                $scope.loading1 = false;
            })
    };
    // 饼图
    $scope.getNewMemberAnalysis2 = function(){
        var url = API_URL_PREFIX + API_URL['NEW_MEMBER_CALCULATE_PARCENT'];
        var config = {};
        config.headers = {'Token' : TOKEN};
        $scope.loading2 = true;
        $http.post(url,$scope.search_condition,config).
            success(function(data) {
                if(data.code != 0){
                    _error_handle(data);
                    return;
                }
                $scope.charts_data2 = data.data;
                $scope.set_charts_new_member_analysis2($scope.charts_data2);
                $scope.getNewMemberAnalysis3();
                var timeout = $timeout( function(){ 
                    $scope.setTimeout2();
                }, 0);
            }).error(function(data,status,headers,config){
                _error_handle(data);
            }).finally(function(){
                $scope.loading2 = false;
            })
    };
    // 雷达图
    $scope.getNewMemberAnalysis3 = function(){
        var url = API_URL_PREFIX + API_URL['SHOPPING_NEW_MEMBER_CALCULATE'];
        var config = {};
        config.headers = {'Token' : TOKEN};
        $scope.loading3 = true;
        $http.post(url,$scope.search_condition,config).
            success(function(data) {
                if(data.code != 0){
                    _error_handle(data);
                    return;
                }
                $scope.charts_data3 = data.data;
                $scope.set_charts_new_member_analysis3($scope.charts_data3);
                var timeout = $timeout( function(){ 
                    $scope.setTimeout3();
                }, 0);
                
            }).error(function(data,status,headers,config){
                _error_handle(data);
            }).finally(function(){
                $scope.button_disable_class = '';
                $scope.loading3 = false;
            })
    };
    // $scope.getNewMemberAnalysis1();
    // $scope.charts_data = {
    //     'body': {
    //         'ALIPAY': [
    //             0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    //         ],
    //         'day_list': [
    //             '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'
    //         ],
    //         'member_count': 5,
    //         'OMNI_NT_POS': [
    //             5, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    //         ],
    //         'WECHAT': [
    //             0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    //         ],
    //         'avg_member_count': 0
    //     },
    //     'header': [
    //         {
    //             'channel_name': '微信',
    //             'channel_code': 'WECHAT'
    //         },
    //         {
    //             'channel_name': '实体店',
    //             'channel_code': 'OMNI_NT_POS'
    //         },
    //         {
    //             'channel_name': '支付宝',
    //             'channel_code': 'ALIPAY'
    //         }
    //     ]
    // }
    $scope.legend_data = [];
    $scope.color = ['#FFC0A7','#2185C5','#59C0B6'];
    $scope.set_charts_new_member_analysis1 = function(charts_data1){
        var series_data1 = [];
        for(var i=0;i<charts_data1.header.length;i++){
            var legend = {
                            name: charts_data1.header[i].channel_name,
                            // 强制设置图形为圆。
                            icon: 'circle',
                        };
            $scope.legend_data.push(legend);

            var series = {
                    name:legend.name,
                    smooth: true,
                    type:'line',
                    areaStyle: {normal: {
                        opacity:0.2
                    }},
                    data:charts_data1.body[charts_data1.header[i].channel_code]
                };
            series_data1.push(series);
        };
        option1 = {
            color: $scope.color,
            title: {
                text: '当月每日会员新增',
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
                left:'right',
                top:'40',
                orient:'horizontal',
                data: $scope.legend_data
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
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
                    data : charts_data1.body.day_list
                }
            ],
            yAxis : [
                {
                    // max:100,
                    type : 'value'
                }
            ],
            series : series_data1
        };
    }
    $scope.set_charts_new_member_analysis2 = function(charts_data2){
        option2 = {
            color:$scope.color,
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
                data: $scope.legend_data
            },
            series: [
                {
                    name:'',
                    type:'pie',
                    radius: ['30%', '50%'],
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
                    data:charts_data2.body
                }
            ]
        };
    }
    $scope.set_charts_new_member_analysis3 = function(charts_data3){
        option3 = {
            color:['#2185C5'],
            title: {
                text: '新增会员消费占比',
                textStyle:{
                    color:'#748292'
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                x: 'center'
            },
            radar: [
                {
                    indicator: [
                        {text: '50-200元', max: charts_data3.member_count},
                        {text: '200-400元', max: charts_data3.member_count},
                        {text: '400-600元', max: charts_data3.member_count},
                        {text: '600-800元', max: charts_data3.member_count},
                        {text: '800元以上', max: charts_data3.member_count}
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
                            value: charts_data3.body_value,
                            name: '消费区间人数',
                            areaStyle: {
                                normal: {
                                    opacity:0.2
                                }
                            },
                        }
                    ]
                }
            ]
        };
    }
    $scope.height_style_mem1={
        'height':$('#new_member_for_month1').width()/3 + 'px'
    }
    $scope.height_style_mem2={
        'height':$('#new_member_for_month2').width() + 'px'
    }
    $scope.height_style_mem3={
        'height':$('#new_member_for_month3').width() + 'px'
    }
    $scope.setTimeout1= function(){
        var charts_new_member_analysis = echarts.init(document.getElementById('new_member_for_month1'));
        charts_new_member_analysis.setOption(option1);
    }
    $scope.setTimeout2= function(){
        var charts_new_member_analysis2 = echarts.init(document.getElementById('new_member_for_month2'));
        charts_new_member_analysis2.setOption(option2);
    }
    $scope.setTimeout3= function(){
        var charts_new_member_analysis3 = echarts.init(document.getElementById('new_member_for_month3'));
        charts_new_member_analysis3.setOption(option3);
    }

}])










