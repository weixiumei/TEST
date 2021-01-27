// var API_URL_PREFIX = 'http://192.168.11.127:4000';
var API_URL_PREFIX = 'http://crmdemo.nexttao.com:4000';

var API_GET = '/get';
var API_POST = '/post';

var API_URL = [];
API_URL['PIWIK'] = 'piwik.json';//PIWIK参数查询

// -------------------------会员RFM模型分析----------------------------
API_URL['REPORT_MEMBER_RFM'] = '/api/v6/crm/report/member_rfm/get';
// 会员RFM模型分析
// http://doc.d.nexttao.com/index.php?s=/18&page_id=1083

API_URL['SHOP_LIST']='/api/v6/shop/report/shop_list/get';
//门店列表（http://doc.d.nexttao.com/showdoc/index.php?s=/17&page_id=683）


// -------------------------营销----------------------------
API_URL['ACTIVITY_STATISTICS']='/api/v6/crm/report/activity_statistics/get';
//营销统计分析（http://doc.d.nexttao.com/index.php?s=/18&page_id=1087）

API_URL['MEMBER_ACTIVITY_TOP']='/api/v6/crm/report/member_activity_top/get';
//优惠券营销分析（http://doc.d.nexttao.com/index.php?s=/18&page_id=1086）


// -------------------------会员复购率分析----------------------------
API_URL['REPEAT_SHOPPING_RATE']='/api/v6/crm/report/repeat_shopping_rate/get';
//会员复购率（http://doc.d.nexttao.com/index.php?s=/18&page_id=1118）

API_URL['REPEAT_TIME_CULCULATE']='/api/v6/crm/report/repeat_time_calculate/get';
//获取时间（http://doc.d.nexttao.com/index.php?s=/18&page_id=1117）

API_URL['CRM_MEMBER_SHOPPING_MONEY']='/api/v6/crm/report/crm_member_shopping_money/get';
//获取时间（http://doc.d.nexttao.com/index.php?s=/18&page_id=1139）




// -------------------------新增会员分析----------------------------
API_URL['NEW_MEMBER_REGISTER_YEAR']='/api/v6/crm/report/new_member_register_year/get';
//会员注册时间年份获取（http://doc.d.nexttao.com/index.php?s=/18&page_id=1134）

API_URL['NEW_MEMBER_CALCULATE']='/api/v6/crm/report/new_member_calculate/get';
//新增会员（http://doc.d.nexttao.com/index.php?s=/18&page_id=1135）

API_URL['NEW_MEMBER_CALCULATE_PARCENT']='/api/v6/crm/report/new_member_calculate_percent/get';
//新增会员渠道占比（http://doc.d.nexttao.com/index.php?s=/18&page_id=1136）

API_URL['SHOPPING_NEW_MEMBER_CALCULATE']='/api/v6/crm/report/shopping_new_member_calculate/get';
//消费新会员查询接口（http://doc.d.nexttao.com/index.php?s=/18&page_id=1137）


