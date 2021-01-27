var find_customers = [], goods_for_consumers = [];
getData = function(url, type){
    $.getJSON(url,function(data){
    	switch (type){
    		case 'find_customers':
    			find_customers = data;
    			break;
    		case 'goods_for_consumers':
    			goods_for_consumers = data;
    			break;
    		default:
    			break;
    	}
    });
}
var find_customers_url = './assets/json/find_customers.json';
var goods_for_consumers_url = './assets/json/goods_for_consumers.json';

getData(find_customers_url, 'find_customers');
getData(goods_for_consumers_url, 'goods_for_consumers');
