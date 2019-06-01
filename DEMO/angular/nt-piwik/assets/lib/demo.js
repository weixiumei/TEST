
$(function()
{	
	// 获取url 的信息
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
	if (!window['console'])
	{
		window.console = {};
		window.console.log = function(){};
	}
		
	/*
	define a new language named "custom"
	*/
	var date = new Date();
  var Year = date.getFullYear();
  var Month = date.getMonth() + 1;
  var Day = date.getDate();

  var week_start_date,week_end_date;

  if(String(Month).length == 1){
      Month = '0' + Month;
  }if(String(Day).length == 1){
      Day = '0' + Day;
  }
  var year_month_day = Year + '-' + Month + '-' + Day ;

	$('.startDate').text(year_month_day);


	$.dateRangePickerLanguages['custom'] = 
	{
		'selected': 'Choosed:',
		'days': 'Days',
		'apply': 'Close',
		'week-1' : 'Mon',
		'week-2' : 'Tue',
		'week-3' : 'Wed',
		'week-4' : 'Thu',
		'week-5' : 'Fri',
		'week-6' : 'Sat',
		'week-7' : 'Sun',
		'month-name': ['January','February','March','April','May','June','July','August','September','October','November','December'],
		'shortcuts' : 'Shortcuts',
		'past': 'Past',
		'7days' : '7days',
		'14days' : '14days',
		'30days' : '30days',
		'previous' : 'Previous',
		'prev-week' : 'Week',
		'prev-month' : 'Month',
		'prev-quarter' : 'Quarter',
		'prev-year' : 'Year',
		'less-than' : 'Date range should longer than %d days',
		'more-than' : 'Date range should less than %d days',
		'default-more' : 'Please select a date range longer than %d days',
		'default-less' : 'Please select a date range less than %d days',
		'default-range' : 'Please select a date range between %d and %d days',
		'default-default': 'This is costom language'
	};
	
	$('input[name=mode]').change(function(e){
		var ele_id = $('.wrapper').attr('data-id');
		var o = $('#datepicker').data('dateRangePicker');
		if(typeof o == 'object'){
			o.destroy();
		}

		if($(this).val() == 'day'){
			$(e.target).parent().addClass('active').parents().siblings().find('label').removeClass('active')
			$('.shopForce').show();
		}else if($(this).val() == 'week'){
			$(e.target).parent().addClass('active').parents().siblings().find('label').removeClass('active')
			$('.shopForce').show();
		}else if($(this).val() == 'month'){
			$(e.target).parent().addClass('active').parents().siblings().find('label').removeClass('active')
			$('.shopForce').show();
		}else if($(this).val() == 'customize'){
			$(e.target).parent().addClass('active').parents().siblings().find('label').removeClass('active')
			$('.shopForce').hide();
		}
		var date1 = $('#'+ele_id).attr('data-date1');
		var date2 = $('#'+ele_id).attr('data-date2');
		var langCodes = '';
		if(getUrlParameter('lang') == '' || getUrlParameter('lang') == 'undefined'){
			langCodes = 'cn'
		}else{
			langCodes = getUrlParameter('lang')
		}
		switch($(this).val()){
			case 'month':
				$('#datepicker').dateRangePicker(
				{
					startOfWeek: 'monday',
					batchMode: 'month',
					singleMonth: true,
					language:langCodes,
					showShortcuts: false,
					inline:true,
					container: '#pickerContainer',
					alwaysOpen:true
				}).unbind('datepicker-change').bind('datepicker-change',function(event,obj){
					var date1 = obj.date1;
					var year = obj.date1.getFullYear();
					var month = obj.date1.getMonth()+1;
					var day = obj.date1.getDate();
					month = ('0'+month).substr(-2);
					day = ('0'+day).substr(-2);
					var date2 = obj.date2;
					var year2 = obj.date2.getFullYear();
					var month2 = obj.date2.getMonth()+1;
					var day2 = obj.date2.getDate();
					month2 = ('0'+month2).substr(-2);
					day2 = ('0'+day2).substr(-2);
					var month_start = year + '-' + month + '-' + day;
					var month_end = year2 + '-' + month2 + '-' + day2;

					$('.wrapper').attr('data-date1',month_start);
					$('.wrapper').attr('data-date2',month_end);
					$('#'+ele_id).attr('data-date1',month_start);
					$('#'+ele_id).attr('data-date2',month_end);
					$('#'+ele_id).attr('data-mode','month');
					$('.wrapper').attr('data-mode','month');
				})
			break;
			case 'week':
				$('#datepicker').dateRangePicker(
				{
				startOfWeek: 'monday',
				batchMode: 'week',
				singleMonth: true,
				language:langCodes,
				showShortcuts: false,
				inline:true,
				container: '#pickerContainer', 
				alwaysOpen:true 
				}).unbind('datepicker-change').bind('datepicker-change',function(event,obj){
					var date1 = obj.date1;
					var year = obj.date1.getFullYear();
					var month = obj.date1.getMonth()+1;
					var day = obj.date1.getDate();
					month = ('0'+month).substr(-2);
					day = ('0'+day).substr(-2);
					var date2 = obj.date2;
					var year2 = obj.date2.getFullYear();
					var month2 = obj.date2.getMonth()+1;
					var day2 = obj.date2.getDate();
					month2 = ('0'+month2).substr(-2);
					day2 = ('0'+day2).substr(-2);
					var week_start = year + '-' + month + '-' + day;
					var week_end = year2 + '-' + month2 + '-' + day2;
					$('.wrapper').attr('data-date1',week_start);
					$('.wrapper').attr('data-date2',week_end);
					$('#'+ele_id).attr('data-date1',week_start);
					$('#'+ele_id).attr('data-date2',week_end);
					$('#'+ele_id).attr('data-mode','week');
					$('.wrapper').attr('data-mode','week');
				})
			break;
			case 'day':
				$('#datepicker').dateRangePicker(
				{
				startOfWeek: 'monday',
				singleDate:true,
				singleMonth:true,
				language:langCodes,
				showShortcuts: false,
				inline:true,
				container: '#pickerContainer', 
				alwaysOpen:true
				}).unbind('datepicker-change')
				.bind('datepicker-change',function(event,obj){
					var date1 = obj.date1;
					var year = obj.date1.getFullYear();
					var month = obj.date1.getMonth()+1;
					var day = obj.date1.getDate();
					month = ('0'+month).substr(-2);
					day = ('0'+day).substr(-2);
					var day_date = year + '-' + month + '-' + day;

					//如果日期变动，才变化
					if($('.wrapper').attr('data-date1') == day_date){
						return;
					}


					$('.wrapper').attr('data-date1',day_date);
					$('.wrapper').attr('data-date2',day_date);
					$('.wrapper').attr('data-mode','day');
					$('#'+ele_id).attr('data-date1',day_date);
					$('#'+ele_id).attr('data-date2',day_date);
					$('#'+ele_id).attr('data-mode','day');
				$('.picker .sure').click();
				})
			break;
			case 'customize':
				$('#datepicker').dateRangePicker(
				{
				startOfWeek: 'monday',
				language:langCodes,
				showShortcuts: false,
				inline:true,
				container: '#pickerContainer', 
				alwaysOpen:true 
				}).unbind('datepicker-change').bind('datepicker-change',function(event,obj){
					var date1 = obj.date1;
					var year = obj.date1.getFullYear();
					var month = obj.date1.getMonth()+1;
					var day = obj.date1.getDate();
					month = ('0'+month).substr(-2);
					day = ('0'+day).substr(-2);
					var date2 = obj.date2;
					var year2 = obj.date2.getFullYear();
					var month2 = obj.date2.getMonth()+1;
					var day2 = obj.date2.getDate();
					month2 = ('0'+month2).substr(-2);
					day2 = ('0'+day2).substr(-2);
					var range_start = year + '-' + month + '-' + day;
					var range_end = year2 + '-' + month2 + '-' + day2;

					$('.wrapper').attr('data-date1',range_start);
					$('.wrapper').attr('data-date2',range_end);
					$('.wrapper').attr('data-mode','customize');
					$('#'+ele_id).attr('data-date1',range_start);
					$('#'+ele_id).attr('data-date2',range_end);
					$('#'+ele_id).attr('data-mode','customize');
				})
			break;
		}

	});
	$(document).on('click','#datepicker',function(){
    $('.wrapper').attr('data-id',$(this).attr('id'));

		var val = $(this).attr('data-mode');

		if($(this).attr('id') == 'datepicker4'){
			if(!!!val){
				val = 'month';
				$('#dp-week').hide();
				$('#dp-day').hide();
				$('#dp-range').hide();
			}else{
				$('#dp-week').hide();
				$('#dp-day').hide();
				$('#dp-range').hide();
			}
		}else{
			if(!!!val){
					val = 'day';
					$('#dp-week').show();
					$('#dp-day').show();
					$('#dp-range').show();
			}else{
				$('#dp-week').show();
				$('#dp-day').show();
				$('#dp-range').show();
			}
		}
		
		$('input[name=mode][value='+val+']').prop('checked',true);
		$('input[name=mode][value='+val+']').change();

		var date1 = $(this).attr('data-date1');
		var date2 = $(this).attr('data-date2');
		if(!!date1 && !!date2){
		$(this).data('dateRangePicker').setDateRange(date1,date2);	
		}
		$('.bg').show();
    $('.wrapper').show();
    $('body').css('overflow','hidden');
	})

	$('.picker .close').click(function(){
		$('.wrapper').hide();
		$('.bg').hide();
	});

	$('.picker .sure').click(function(e){
		var type = $('.wrapper').attr('data-mode');
    if(type == 'day'){
    	var date1 = $(e.target).parents('.wrapper').attr('data-date1');
    	$('.startDate').text(date1);
    }else{
    	var date1 = $(e.target).parents('.wrapper').attr('data-date1');
    	var date2 = $(e.target).parents('.wrapper').attr('data-date2');
    	$('.startDate').text(date1);
    } 
		$('.wrapper').hide();
		$('.bg').hide();
	})

	$('.bg').click(function(){
		$('.wrapper').hide();
		$('.bg').hide();
	})

});
