var API_URL = [];
//选择门店接口（http://doc.d.nexttao.com/showdoc/index.php?s=/17&page_id=985）
API_URL['user_shop_list']='/api/v6/shop/report/user_shop_list/get';
//门店库存（http://doc.d.nexttao.com/showdoc/index.php?s=/17&page_id=604）
API_URL['shop_inventory']='/api/v6/shop/report/shop_inventory/get';
//门店库存（条件）（http://doc.d.nexttao.com/showdoc/index.php?s=/17&page_id=964）
API_URL['shop_inventory_view_list']='/api/v6/shop/report/shop_inventory_view_list/get';
//门店列表（http://doc.d.nexttao.com/showdoc/index.php?s=/17&page_id=683）
API_URL['shop_list']='/api/v6/shop/report/shop_list/get';
//获取商品类型（条件）（http://doc.d.nexttao.com/showdoc/index.php?s=/17&page_id=965）
API_URL['product_types']='/api/v6/shop/report/product_types/get';
//商品排行（http://doc.d.nexttao.com/showdoc/index.php?s=/17&page_id=728）
API_URL['product_sale_rank']='/api/v6/shop/report/product_sale_rank/get';
//商品排行（条件1）（http://doc.d.nexttao.com/showdoc/index.php?s=/17&page_id=605）
API_URL['sale_rank_group_level']='/api/v6/shop/report/sale_rank_group_level/get';
//销售库存（http://doc.d.nexttao.com/showdoc/index.php?s=/17&page_id=606）
API_URL['sale_inventory']='/api/v6/shop/report/sale_inventory/get';
//销售环比（条件1）（http://doc.d.nexttao.com/showdoc/index.php?s=/17&page_id=607）
API_URL['sale_chain_rate_section']='/api/v6/shop/report/sale_chain_rate_section/get';
//销售环比（http://doc.d.nexttao.com/showdoc/index.php?s=/17&page_id=729）
API_URL['sale_chain_rate']='/api/v6/shop/report/sale_chain_rate/get';
//销售统计（http://doc.d.nexttao.com/showdoc/index.php?s=/17&page_id=730）
API_URL['sale_statistics']='/api/v6/shop/report/sale_statistics/get';
//销售统计（条件1）（http://doc.d.nexttao.com/showdoc/index.php?s=/17&page_id=608）
API_URL['sale_statistics_group_type']='/api/v6/shop/report/sale_statistics_group_type/get';
//销售日报（http://doc.d.nexttao.com/showdoc/index.php?s=/17&page_id=609）
API_URL['sale']='/api/v6/shop/report/sale/get';
//员工销售分析（http://doc.d.nexttao.com/showdoc/index.php?s=/17&page_id=732）
API_URL['employee_sale_status']='/api/v6/shop/report/employee_sale_status/get';
//员工销售分析（条件2）（http://doc.d.nexttao.com/showdoc/index.php?s=/17&page_id=731）
API_URL['employee_sale_show_as']='/api/v6/shop/report/employee_sale_show_as/get';
//员工销售分析（条件1）（http://doc.d.nexttao.com/showdoc/index.php?s=/17&page_id=610）
API_URL['employee_sale_calc_type']='/api/v6/shop/report/employee_sale_calc_type/get';
//1.业务单据（http://doc.d.nexttao.com/showdoc/index.php?s=/17&page_id=734）
API_URL['operation_receipts']='/api/v6/shop/report/operation_receipts/get';
//业务单据（条件2）（http://doc.d.nexttao.com/showdoc/index.php?s=/17&page_id=733）
API_URL['operation_receipts_group_level']='/api/v6/shop/report/operation_receipts_group_level/get';
//业务单据（条件1）（http://doc.d.nexttao.com/showdoc/index.php?s=/17&page_id=611）
API_URL['receipt_type']='/api/v6/shop/report/receipt_type/get';
//2.店面进销存（http://doc.d.nexttao.com/showdoc/index.php?s=/17&page_id=612）
API_URL['delivery_inventory']='/api/v6/shop/report/delivery_inventory/get';
//1.商场折扣统计（http://doc.d.nexttao.com/showdoc/index.php?s=/17&page_id=614）
API_URL['cut_payment']='/api/v6/shop/report/cut_payment/get';
//2.付款方式查销售（http://doc.d.nexttao.com/showdoc/index.php?s=/17&page_id=615）
API_URL['payment_type']='/api/v6/shop/report/payment_type/get';
//3.在线支付（http://doc.d.nexttao.com/showdoc/index.php?s=/17&page_id=616）
API_URL['payment_records']='/api/v6/shop/report/payment_records/get';
//获取支付方式（条件）（http://doc.d.nexttao.com/showdoc/index.php?s=/17&page_id=966）
API_URL['payment_records_type']='/api/v6/shop/report/payment_records_type/get';
//3.商品明细查询（http://doc.d.nexttao.com/showdoc/index.php?s=/17&page_id=613）
API_URL['product_move']='/api/v6/shop/report/product_move/get';

// 促销查询
// 促销列表 （http://doc.d.nexttao.com/index.php?s=/17&page_id=1092）
API_URL['list']='/api/v6/shop/report/promotion/list/get';
// 促销详情（http://doc.d.nexttao.com/index.php?s=/17&page_id=1093）
API_URL['info'] = '/api/v6/shop/report/promotion/info/get';
// 获取促销商品范围（http://doc.d.nexttao.com/index.php?s=/17&page_id=1095）
API_URL['scope'] = '/api/v6/shop/report/promotion/product/scope/get';
// 获取促销商品列表 (http://doc.d.nexttao.com/index.php?s=/17&page_id=1096)
API_URL['productList'] = '/api/v6/shop/report/promotion/product/list/get';
// 获取促销赠品范围 (http://doc.d.nexttao.com/index.php?s=/17&page_id=1097)
API_URL['productScope'] = '/api/v6/shop/report/promotion/gift/product/scope/get';
// 获取促销赠品列表 (http://doc.d.nexttao.com/index.php?s=/17&page_id=1098)
API_URL['productLists'] = '/api/v6/shop/report/promotion/gift/product/list/get';




