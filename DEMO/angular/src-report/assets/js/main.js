
$(document).on("change", '.input-checkbox input[type=radio],.input-checkbox input[type=checkbox]', function() {
        if($(this).prop('checked')){
            $(this).parents('.input-checkbox').addClass('checked');
        }else{
            $(this).parents('.input-checkbox').removeClass('checked');
        }

});
$(document).on("change", '.input-radio input[type=radio]', function() {
        var name = $(this).attr('name');
        $('.input-radio input[name='+name+']').not($(this)).parents('.input-radio').removeClass('checked');

        if($(this).prop('checked')){
            $(this).parents('.input-radio').addClass('checked');
        }else{
            $(this).parents('.input-radio').removeClass('checked');
        }

});

function showLoadingToast(){
    $('body').addClass('isLoading');
    if(!!js_bridge){
      return showLoading(true);
    }
}
function hideLoadingToast(){
    $('body').removeClass('isLoading');
    if(!!js_bridge){
        setTimeout(function(){
            return showLoading(false);
        },300);
    }
}

function is_show_footer(records,ele){
    ele = !!ele ? ele : '#mainFooter';
    if(records.length == 0){
      $(ele).hide();
    }else{
      $(ele).show();
    }
}

// var storage = window.localStorage;
function setConditionlocalstorage(form_index,data){
    switch(form_index){
        case 'form1':
            // 物品编码
            localStorage.form1_product_code = data.product_code;
            // 条形码
            localStorage.form1_code = data.code;
            // 汇总(展示方式)
            localStorage.form1_view_types = data.view_types;
            localStorage.form1_filter_reason = $('.filter_reason').text();
            // 店仓
            localStorage.form1_shop_ids = data.shop_ids;
            localStorage.form1_filter_store = $('.filter_store').text();
            // 范围
            localStorage.form1_count_range = data.count_range;
            localStorage.form1_filter_range = $('.filter_range').text();
            // 库存范围下限
            localStorage.form1_min_count = data.min_count;
            // 库存范围上限
            localStorage.form1_max_count = data.max_count;
            // 分类
            localStorage.form1_product_type = data.product_type;
            localStorage.form1_filter_category = $('.filter_category').text();
            break;
        case 'form2':
            //商品编码
            localStorage.form2_product_code = data.product_code;
            //汇总
            localStorage.form2_group_by = data.group_by;
            localStorage.form2_filter_reason = $('.filter_reason').text();
            //店仓
            localStorage.form2_shop_ids = data.shop_ids;
            localStorage.form2_filter_store = $('.filter_store').text();
            //开始日期
            localStorage.form2_start_date = data.start_date;
            localStorage.form2_startDate = $('.startDate').text();
            //结束日期
            localStorage.form2_end_date = data.end_date;
            localStorage.form2_endDate = $('.endDate').text();
            //top_qty(10,20,30)
            localStorage.form2_top_qty = data.top_qty;
            break;
        case 'form3':
            //商品编码
            localStorage.form3_product_code = data.product_code;
            //汇总
            localStorage.form3_group_by = data.group_by;
            localStorage.form3_filter_reason = $('.filter_reason').text();
            //店仓
            localStorage.form3_shop_ids = data.shop_ids;
            localStorage.form3_filter_store = $('.filter_store').text();
            //开始日期
            localStorage.form3_start_date = data.start_date;
            localStorage.form3_startDate = $('.startDate').text();
            //结束日期
            localStorage.form3_end_date = data.end_date;
            localStorage.form3_endDate = $('.endDate').text();
            //是否‘显示销售为零’1:是；
            localStorage.form3_show_zero_sale = data.show_zero_sale;
            break;
        case 'form4':
            //环比
            localStorage.form4_section = data.section;
            localStorage.form4_filter_circle = $('.filter_circle').text();
            //开始日期
            localStorage.form4_start_date = data.start_date;
            localStorage.form4_startDate = $('.startDate').text();
            //结束日期
            localStorage.form4_end_date = data.end_date;
            localStorage.form4_endDate = $('.endDate').text();
            break;
        case 'form5':
            //店仓
            localStorage.form5_shop_ids = data.shop_ids;
            localStorage.form5_filter_store = $('.filter_store').text();
            //统计方式
            localStorage.form5_group_by = data.group_by;
            localStorage.form5_filter_total = $('.filter_total').text();
            //开始日期
            localStorage.form5_start_date = data.start_date;
            localStorage.form5_startDate = $('.startDate').text();
            //结束日期
            localStorage.form5_end_date = data.end_date;
            localStorage.form5_endDate = $('.endDate').text();
            break;
        case 'form6':
            //店仓
            localStorage.form6_shop_ids = data.shop_ids;
            localStorage.form6_filter_store = $('.filter_store').text();
            //开始日期
            localStorage.form6_start_date = data.start_date;
            localStorage.form6_startDate = $('.startDate').text();
            //结束日期
            localStorage.form6_end_date = data.end_date;
            localStorage.form6_endDate = $('.endDate').text();
            break;
        case 'form7':
            //展示结果
            localStorage.form7_calc_type = data.show_as;
            localStorage.form7_filter_result = $('.filter_result').text();
            //统计方式
            localStorage.form7_group_by = data.calc_type;
            localStorage.form7_filter_total = $('.filter_total').text();
            //开始日期
            localStorage.form7_start_date = data.start_date;
            localStorage.form7_startDate = $('.startDate').text();
            //结束日期
            localStorage.form7_end_date = data.end_date;
            localStorage.form7_endDate = $('.endDate').text();
            break;
        case 'form8':
            //商品编码
            localStorage.form8_product_code = data.product_code;
            //汇总
            localStorage.form8_group_by = data.group_by;
            localStorage.form8_filter_reason = $('.filter_reason').text();
            // 分类
            localStorage.form8_receipt_type = data.receipt_type;
            localStorage.form8_filter_category = $('.filter_category').text();
            //开始日期
            localStorage.form8_start_date = data.start_date;
            localStorage.form8_startDate = $('.startDate').text();
            //结束日期
            localStorage.form8_end_date = data.end_date;
            localStorage.form8_endDate = $('.endDate').text();
            break;
        case 'form9':
            //商品编码
            localStorage.form9_product_code = data.product_code;
            //汇总
            localStorage.form9_group_by = data.group_by;
            localStorage.form9_filter_reason = $('.filter_reason').text();
            // 分类
            localStorage.form9_product_type = data.product_type;
            localStorage.form9_filter_category = $('.filter_category').text();
            //开始日期
            localStorage.form9_start_date = data.start_date;
            localStorage.form9_startDate = $('.startDate').text();
            //结束日期
            localStorage.form9_end_date = data.end_date;
            localStorage.form9_endDate = $('.endDate').text();
            //with_the_mount
            localStorage.form9_with_the_mount = data.with_the_mount;
            break;
        case 'form10':
            //店仓
            localStorage.form10_shop_id = data.shop_id;
            localStorage.form10_filter_store = $('.filter_store').text();
            //开始日期
            localStorage.form10_start_date = data.start_date;
            localStorage.form10_startDate = $('.startDate').text();
            //结束日期
            localStorage.form10_end_date = data.end_date;
            localStorage.form10_endDate = $('.endDate').text();
            break;
        case 'form11':
            //开始日期
            localStorage.form10_start_date = data.start_date;
            localStorage.form10_startDate = $('.startDate').text();
            //结束日期
            localStorage.form10_end_date = data.end_date;
            localStorage.form10_endDate = $('.endDate').text();
            break;
        case 'form12':
            //支付方式
            localStorage.form11_pay_type = data.pay_type;
            localStorage.form11_filter_pay = $('.filter_pay').text();
            //开始日期
            localStorage.form11_start_date = data.start_date;
            localStorage.form11_startDate = $('.startDate').text();
            //结束日期
            localStorage.form11_end_date = data.end_date;
            localStorage.form11_endDate = $('.endDate').text();
            break;
        case 'form13':
            //商品编码
            localStorage.form13_product_code = data.product_code;
            //汇总
            localStorage.form13_group_by = data.group_by;
            localStorage.form13_filter_reason = $('.filter_reason').text();
            //分类
            localStorage.form13_product_type = data.product_type;
            localStorage.form13_filter_category = $('.filter_category').text();
            //开始日期
            localStorage.form13_start_date = data.start_date;
            localStorage.form13_startDate = $('.startDate').text();
            //结束日期
            localStorage.form13_end_date = data.end_date;
            localStorage.form13_endDate = $('.endDate').text();
            break;
    }
}
getBLen = function(str) {  
    if (str == null) return 0;  
    if (typeof str != "string"){  
        str += "";  
    }  
    return str.replace(/[^\x00-\xff]/g,"01").length;  
}


function showError(str){
    $('.error').html(str);
}
function clearError(str){
    $('.error').html('');
}


// 报错提示
function _error_handle(data){
    if(!!!data){
        return;
    }
    if(!!data.code){
        if((data.code+"").substring(0,1) == 1){
            // storage.removeItem('NXSF_TOKEN');
            alert('长期未操作，登录已经超时，请重新登录');
            // window.location.href = 'login.html';
        }
        switch(data.code){
            case 100002:
                // storage.removeItem('NXSF_TOKEN');
                // window.location.href = 'login.html';
                alert(data.message);
            break;
        }
    }

    // $('.modal').modal('hide');
    // $('#errModal').modal('show');
    // $('#errModal .info').html(data.message);
}

//解析url
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
};

if(getUrlParameter('token') != null && getUrlParameter('token') != '' 
    && getUrlParameter('token') != undefined && getUrlParameter('token') != 'undefined'){
    sessionStorage.setItem('token', getUrlParameter('token'));
}else{
    sessionStorage.setItem('token', sessionStorage.getItem('token'));
}
var token = sessionStorage.getItem('token');
// var token = 'COMMCRED|a349e038-86b4-4c03-a150-df14d7b0e947';

    Date.prototype.Format = function(fmt)   
    { //author: meizz   
      var o = {   
        "M+" : this.getMonth()+1,                 //月份   
        "d+" : this.getDate(),                    //日   
        "h+" : this.getHours(),                   //小时   
        "m+" : this.getMinutes(),                 //分   
        "s+" : this.getSeconds(),                 //秒   
        "q+" : Math.floor((this.getMonth()+3)/3), //季度   
        "S"  : this.getMilliseconds()             //毫秒   
      };   
      if(/(y+)/.test(fmt))   
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
      for(var k in o)   
        if(new RegExp("("+ k +")").test(fmt))   
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
      return fmt;   
    }  

var lang = getUrlParameter('lang');
switch(lang){
    case 'en':

var _LANG = {
                "decimal":        "",
                "emptyTable":     "No Data",
                "info":           "Total <span>_TOTAL_</span>",
                "infoEmpty":      "",
                "infoFiltered":   "",
                "infoPostFix":    "",
                "thousands":      ",",
                "lengthMenu":     "_MENU_",
                "loadingRecords": "Loading...",
                "processing":     "Processing...",
                "search":         "Search:",
                "zeroRecords":    "No Data",
                "paginate": {
                    "first":      "",
                    "last":       "",
                    "next":       "<img src='assets/img/icon-rt.svg'>",
                    "previous":   "<img src='assets/img/icon-lt.svg'>"
                },
                "aria": {
                    "sortAscending":  ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                }
            };
    break;
    default:
var _LANG = {
                "decimal":        "",
                "emptyTable":     "没有数据",
                "info":           "共 <span>_TOTAL_</span> 条",
                "infoEmpty":      "",
                "infoFiltered":   "",
                "infoPostFix":    "",
                "thousands":      ",",
                "lengthMenu":     "_MENU_",
                "loadingRecords": "加载中...",
                "processing":     "处理中...",
                "search":         "搜索:",
                "zeroRecords":    "没有数据",
                "paginate": {
                    "first":      "",
                    "last":       "",
                    "next":       "<img src='assets/img/icon-rt.svg'>",
                    "previous":   "<img src='assets/img/icon-lt.svg'>"
                },
                "aria": {
                    "sortAscending":  ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                }
            };
    break;
}

// 通过url获取shop_id
function getShopId(str){
  var url = location.href;
  var index = url.indexOf(str) + 8,//等于号后面一个字符开始检测
      fixed_index = url.indexOf(str) + 8,
      reg = /\d/,
      i = 0, //标记shop_id后面有几个数字, 这一串完整的数字是id
      id = 0;
  function getNums(index) {
      if(reg.test(url.substr(index, 1))){
          i++;
          getNums(++index);
      }
  }
  getNums(index);
  id = url.substr(fixed_index, i);
  return parseInt(id);
}

jQuery(document).ready(function($){
    // 筛选
    var flag = true; 
    $('.menuRight').click(function(){
        if(flag){
            $('.filter').removeClass('hidden');
            $('#container > .condition').addClass('hidden');
            $('.data').removeClass('hidden');
            flag = false;
        }else{
            $('.filter').addClass('hidden');
            $('#container > .condition').removeClass('hidden');
            $('.data').addClass('hidden');
            flag = true;
        }
    })

    // 点击查询
    $('#getList').click(function(){
        $('.filter').removeClass('hidden');
        $('#container > .condition').addClass('hidden');
    })

    // panel的逻辑从这里开始修改
    // 关闭右侧的panel
    $('.panel header .back').on("click",function(){
        $('#bg').hide();
    })
    $('.panel header .confirm').on("click",function(){
        $('#bg').hide();
    })
    // 自定义
    $(document).on("click", "#panel-range .close-panel.confirm_3", function() {
        var s = '';
        if($(this).parents('.panel').find('input[type=checkbox]').size() == $(this).parents('.panel').find('input[type=checkbox]:checked').size()){
            s = '范围';
        }else{
            $(this).parents('.panel').find('span .checked').each(function(){
                if(s != ''){
                    s += ',';
                }
              // s +=  $(this).attr('data-label');
              s += $(this).parents('.checkbox').prev('span').html();
            });
            if($('input[name=customize]')[0].checked){
                s = '自定义';
            }
        }
        $('input[data-value="storage3"]').val(s);
        sessionStorage.setItem('range1',s);
        $('.filter_range').html(s);
    });

    // 分类（checkbox） 单选、全选
    $('#panel-category').on("change", "p.all input", function() {
        var t = $(this).prop('checked');
        if(t){
            $('#panel-category ul .input-checkbox').addClass('checked');
        }else{
            $('#panel-category ul .input-checkbox').removeClass('checked');
        }
        $('#panel-category ul input[type=checkbox]').prop('checked',t);
    })
    $('#panel-category').on("change", "ul input", function() {
        if($(this).parents('.panel').find('ul input[type=checkbox]:not(:checked)').size() == 0){
            $('#panel-category p.all .input-checkbox').addClass('checked');
            $('#panel-category p.all input[type=checkbox]').prop('checked',true);
        }else{
            $('#panel-category p.all .input-checkbox').removeClass('checked');
            $('#panel-category p.all input[type=checkbox]').prop('checked',false);
        }
    })

    // 店仓（checkbox） 单选、全选
    $('#panel-store').on("change", "p.all input", function() {
        var t = $(this).prop('checked');
        if(t){
            $('#panel-store ul .input-checkbox').addClass('checked');
        }else{
            $('#panel-store ul .input-checkbox').removeClass('checked');
        }
        $('#panel-store ul input[type=checkbox]').prop('checked',t);
    })
    $('#panel-store').on("change", "ul input", function() {
        if($(this).parents('.panel').find('ul input[type=checkbox]:not(:checked)').size() == 0){
            $('#panel-store p.all .input-checkbox').addClass('checked');
            $('#panel-store p.all input[type=checkbox]').prop('checked',true);
        }else{
            $('#panel-store p.all .input-checkbox').removeClass('checked');
            $('#panel-store p.all input[type=checkbox]').prop('checked',false);
        }
    })

    // select选择器
    $('.item-search-box .item-select select').change(function(){
      selectValue = $(this).children('option:selected').val();
      var value = $('.item-input1').val();
      sessionStorage.setItem(selectValue,value);
    })

    // date
    // $('input[name=start_at]').val(new Date().Format("yyyy-MM-dd"));
    // $('input[name=end_at]').val(new Date().Format("yyyy-MM-dd"));
    // $('input[name=start_at]').change(function(){
    //   var start_at = $('input[name=start_at]').val();
    //   var end_at = $('input[name=end_at]').val();
    //   if(start_at > end_at ){
    //     $('input[name=start_at]').val($('input[name=end_at]').val())
    //   }
    // })
    // $('input[name=end_at]').change(function(){
    //   var start_at = $('input[name=start_at]').val();
    //   var end_at = $('input[name=end_at]').val();
    //   if(start_at > end_at ){
    //     $('input[name=end_at]').val($('input[name=start_at]').val())
    //   }
    // })

  $('input[name=start_at]').change(function(){
    var start_at = $('input[name=start_at]').val();
    var end_at = $('input[name=end_at]').val();
    if(start_at > end_at ){
      $('input[name=start_at]').val($('input[name=end_at]').val())
    }
    $('.startDate').text($('input[name=start_at]').val()); 
    $('.endDate').text($('input[name=end_at]').val());
  })
  $('input[name=end_at]').change(function(){
    var start_at = $('input[name=start_at]').val();
    var end_at = $('input[name=end_at]').val();
    if(start_at > end_at ){
      $('input[name=end_at]').val($('input[name=start_at]').val())
    }
    $('.startDate').text($('input[name=start_at]').val()); 
    $('.endDate').text($('input[name=end_at]').val());
  })

    // range
    $('input[name=customize]').change(function(checked){
      if($('input[name=customize]')[0].checked){
        $('.input-checkbox input[name=range]').parents('.input-checkbox').removeClass('checked');
        $('.input-checkbox input[name=range]').removeAttr('checked')
        $('.input-checkbox input[name=range]').parents('.input-checkbox').find('input').attr('disabled','disabled')
        $('input[name=min_count]').removeAttr('disabled');
        $('input[name=max_count]').removeAttr('disabled');
      }else{
        $('.input-checkbox input[name=range]').parents('.input-checkbox').addClass('checked');
        $('.input-checkbox input[name=range]').parents('.input-checkbox').find('input').removeAttr('disabled','disabled')
        $('.input-checkbox input[name=range]').prop('checked',true);
        $('input[name=min_count]').attr('disabled','disabled');
        $('input[name=max_count]').attr('disabled','disabled');
      }
    })

    // ranking
    $('.lbl-step').click(function(){
        $('.lbl-step').removeClass('active');
        $(this).addClass('active');
    })
});

jQuery(document).on('click','.btn-panel', function(){
    console.log(1);
    var id = $(this).attr('data-rel');
    $.openPanel("#"+id);
    $('#bg').show();
    _count = "#"+id;
    $('.panel.panel-right.panel-cover'+_count+' ').show();
})

jQuery(document).on('click','#bg', function(){
    $.closePanel(_count);
    $(this).hide();
})

// 点击背景可以直接回填值
$(document).on("close", ".panel", function(e, pageId, $page) {
    $(this).find('.close-panel').click();
    $(this).find('.close-panel').click();
});





