var langs = ['en', 'cn'];

function get_lang(str){
	var obj = {};
	var arr = str.split('&');
	for(var i in arr){
		var tmp = arr[i].split('=');
		obj[tmp[0]] = tmp[1];
	}
	return obj;
}

var translate = function (jsdata)
{	
	console.log(jsdata);
	$("[tkey]").each (function (index)
	{
		var strTr = jsdata [$(this).attr ('tkey')];
	    $(this).html (strTr);
	});
	$("[placeholder-key]").each (function (index){
	  var strTr = jsdata [$(this).attr ('placeholder-key')];
	     $(this).attr ('placeholder',strTr);
	 });
}

langCode = navigator.language.substr (0, 2);
function change_lang(langCode){

	langCode = 'cn';//罗盘英文暂未对应
	if (langs.indexOf(langCode) != -1){
		$.getJSON('assets/lang/'+langCode+'.json', translate);
	}else{
		$.getJSON('assets/lang/cn.json', translate);
	}
}
var obj = get_lang(location.search.substr(1));

window.setTimeout(
	function(){
		change_lang(obj['lang']);
	}
, 0);



