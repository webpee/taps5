// JavaScript Document
$(document).ready(function(e) {
	
	$('.serial-num-edit').off('click').on('click',function(){
		$(this).parent('.edit-serail-part').find('.serail-edit-btn-space').stop(true,true).slideToggle();
	});
		
	$('.menubox .btn_space').click(function(){
		var ex1= $(this).attr('rel');
		if(!$(this).hasClass('act'))
		{
			$('.menubox .btn_space').removeClass('act');
			$('.contain_space .contain_part').hide();
			$('.contain_space #'+ex1).show();
			$(this).addClass('act');
		}
	});
	
	$('.sales-control-right .sales-btn').click(function(){
		var ex1= $(this).attr('rel');
		if(!$(this).hasClass('act'))
		{
			$('.sales-control-right .sales-btn').removeClass('act');
			$('.sales-report-space .sales-report-inner').hide();
			$('.sales-report-space #'+ex1).show();
			$(this).addClass('act');
		}
	});
	
	$('.page_inner .page-deact').click(function(){
		var ex1= $(this).attr('rel');
		if(!$(this).hasClass('act'))
		{
			$('.page_inner .page-deact').removeClass('act');
			$('.layout_outter .content_inner').hide();
			$('.layout_outter #'+ex1).show();
			$(this).addClass('act');
		}
	});
	
	$('#selectpart-frst').off("click").on("click",function(){
		var ele= $(this);
		if(ele.hasClass('open')){
			ele.parent('.selectcar-first').find('.selectpart-box').hide();
			ele.removeClass('open');
		}else{
			ele.parent('.selectcar-first').find('.selectpart-box').show();
			ele.addClass('open');
		}
	});
	
	$('#selectpart-sec').off("click").on("click",function(){
		var ele= $(this);
		if(ele.hasClass('open')){
			ele.parent('.selectcar-first').find('.selectpart-box').hide();
			ele.removeClass('open');
		}else{
			ele.parent('.selectcar-first').find('.selectpart-box').show();
			ele.addClass('open');
		}
	});
	
	$('.add-btn-part #add-btn').off('click').on('click',function(){
		var ele= $(this);
		if(ele.hasClass('open'))
		{
			ele.parent('.add-btn-part').find('.rec-newpart').stop(true,true).slideUp(200,function(){ele.removeClass('open');});
		}else{
			ele.addClass('open');
			ele.parent('.add-btn-part').find('.rec-newpart').stop(true,true).slideDown(200);
		}
	});
	
	$('.add-btn-part #add-btn1').off('click').on('click',function(){
		var ele= $(this);
		if(ele.hasClass('open'))
		{
			ele.parent('.add-btn-part').find('.rec-newpart').stop(true,true).slideUp(200,function(){ele.removeClass('open');});
		}else{
			ele.addClass('open');
			ele.parent('.add-btn-part').find('.rec-newpart').stop(true,true).slideDown(200);
		}
	});
	
	$('.add-btn-part #add-btn2').off('click').on('click',function(){
		var ele= $(this);
		if(ele.hasClass('open'))
		{
			ele.parent('.add-btn-part').find('.rec-newpart').stop(true,true).slideUp(200,function(){ele.removeClass('open');});
		}else{
			ele.addClass('open');
			ele.parent('.add-btn-part').find('.rec-newpart').stop(true,true).slideDown(200);
		}
	});
	
	////SLIDER
	//var slider = $('.royalSlider').royalSlider({
	//	controlNavigation: 'thumbnails',
	//	controlNavigationSpacing: 0,
	//	arrowsNavAutoHide: true,
	//	arrowsNavHideOnTouch: true,
	//	keyboardNavEnabled: true,
	//	imageScaleMode: 'fill',
	//	fullscreen: false,
	//	loop: true,
	//	thumbs: {
	//	  spacing: 1,
	//	  firstMargin: false,
	//	  paddingBottom: 0
	//	},
	//	autoScaleSlider: false, 
	//	spacing: 0,
	//	navigateByClick: true,
	//	fadeinLoadedSlide: true,
	//	arrowsNav:false

	//}).data('royalSlider');
	
	////SLIDER
	//var slider1 = $('.royalSlider').royalSlider({
	//	controlNavigation: 'thumbnails',
	//	controlNavigationSpacing: 0,
	//	arrowsNavAutoHide: true,
	//	arrowsNavHideOnTouch: true,
	//	keyboardNavEnabled: true,
	//	imageScaleMode: 'fill',
	//	fullscreen: false,
	//	loop: true,
	//	thumbs: {
	//	  spacing: 1,
	//	  firstMargin: false,
	//	  paddingBottom: 0
	//	},
	//	autoScaleSlider: false, 
	//	spacing: 0,
	//	navigateByClick: true,
	//	fadeinLoadedSlide: true,
	//	arrowsNav:false

	//}).data('royalSlider');
	
	//////SLIDER
	//var slider2 = $('.royalSlider').royalSlider({
	//	controlNavigation: 'thumbnails',
	//	controlNavigationSpacing: 0,
	//	arrowsNavAutoHide: true,
	//	arrowsNavHideOnTouch: true,
	//	keyboardNavEnabled: true,
	//	imageScaleMode: 'fill',
	//	fullscreen: false,
	//	loop: true,
	//	thumbs: {
	//	  spacing: 1,
	//	  firstMargin: false,
	//	  paddingBottom: 0
	//	},
	//	autoScaleSlider: false, 
	//	spacing: 0,
	//	navigateByClick: true,
	//	fadeinLoadedSlide: true,
	//	arrowsNav:false

	//}).data('royalSlider');
	
	
});


