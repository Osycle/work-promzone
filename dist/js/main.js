'use strict';

(function(){
$(function(){




	//vi init
	window.vi = $(".vi-btn-toggle").initVi({

		fontSize: 2,		 					// default 2
		bgColor: "black", 				// default white
		imgVisibility: "visible", 	// default hidden
		grayScale: true, 					// default true

		// Callback function
		callOn: function(){				
			$(".fa.fa-eye").addClass("fa-eye-slash")
		},			
		callOff: function(){
			$(".fa.fa-eye").removeClass("fa-eye-slash")
		},		
		callToggle: function(){}


	})

	// FANCYBOX
	if( $("[data-fancybox='gallery']").length != 0 )
		$("[data-fancybox='gallery']").fancybox({
			afterShow : function( instance, current ) {
			},
			animationEffect : "fade",
			transitionEffect: "zoom-in-out"
		});
	// FLICKITY
	var arrowStyle = { 
		  x0: 10,
		  x1: 60, y1: 50,
		  x2: 60, y2: 45,
		  x3: 15
		}
	var $carousel = $('.gallery-photo-content.carousel').flickity({
			autoPlay: 2000,
			arrowShape: arrowStyle,
			initialIndex: 2,
			//prevNextButtons: false,
			//rightToLeft: true,
			draggable: !(checkView(992)) ,
			//friction: 0.5,
			contain: true,
			cellAlign: 'center',

	  //imagesLoaded: true,
	  //percentPosition: false
	});
	//WOW
	new WOW({
		offset: 30
	}).init();

	//Owl.Carousel
	$(".index-carousel").owlCarousel({
	    animateOut: 'fadeOut',
	    animateIn: 'fadeIn',
	    //autoWidth: true,
	    //rewind: true,
	    mergeFit: true,
	    center: true,
	    loop: true,
	    items:1,
	    //margin:30,
	    //mouseDrag: false,
	    autoplay: true,
	    autoplayTimeout: 6000,
	    smartSpeed:450
	});

  // Flikity Carousel
  	var arrowStyle = { 
		  x0: 10,
		  x1: 60, y1: 50,
		  x2: 60, y2: 45,
		  x3: 15
		}
  // PARTNERS
	var carouselPartners = $('.index-carousel-advert').flickity({
		autoPlay: 2000,
		arrowShape: arrowStyle,
		//imagesLoaded: true,
		//prevNextButtons: false,
		//wrapAround: true,
		//selectedAttraction: 0.2,
		//friction: 0.2,
		//rightToLeft: true,
		pageDots: false,
		contain: true,
		percentPosition: true,
		cellAlign: 'center'
	});


var statusSearchView = true;
$(".btn-search").on("click", function(){
	$(this).find("i")
		.toggleClass("fa fa-search")
		.toggleClass("fa fa-close");

	if(statusSearchView){
		statusSearchView = !statusSearchView;
		$(".nav-search-content")
			.find(".btn-search-sub")
			.add(".nav-search-content input")
			.removeClass("hide").addClass("show");

		setTimeout(function(){ 
			$(".aSearch").addClass("in") 
			
		}, 0);

	}else{
		
		$(".aSearch").removeClass("in");

		setTimeout(function(){
			$(".nav-search-content")
			.find(".btn-search-sub")
			.add(".nav-search-content input")
			.addClass("hide").removeClass("show")
			statusSearchView = !statusSearchView;
		}, 0);
	}

} )

	





//RESIZE
$( window ).on("resize", function(e){});

//SCROLL
var header_status = false;
$( window ).on("scroll", function(e){
	if($(window).scrollTop() > 300 && header_status == false){
		header_status = true; 
	}else if($(window).scrollTop() < 300 && header_status == true){
		header_status = false;
	}
});


















	});
}) (jQuery);



function Vi( btnEvent, options ){

	/**
	*	
	*	
	*/

	var jsonOptions = localStorage["viDataOptions"] || false
	if( jsonOptions )
		jsonOptions = JSON.parse( jsonOptions );

	// public

	this.btnEvent 		= btnEvent;
	this.inputRange 	= inputRange;
	this.on						= on,
	this.off					= off,
	this.toggle				= toggle,
	this.bgColorSet 	= bgColorSet;

	!jsonOptions ? 

	this.dataOptions 	= {
		status:         options.status,
		fontSize: 			options.fontSize,
		bgColor: 				options.bgColor,
		grayScale: 			options.grayScale,
		imgVisibility: 	options.imgVisibility

	}

	:this.dataOptions = jsonOptions;





	var template = '<div class="vi deactive">'+
									'<div class="vi-container">'+
										'<div class="vi-content vi-table-center">'+

											'<div class="vi-font-size vi-table-center">'+

												'<h5>Размер шрифта:</h5>'+
												'<input id="fs-range" type="range" min="1" max="5" value="0">'+
												'<div class="vi-font-size-list">'+
													'<ul>'+
														'<li class="vi-font-size-1" value="1">a</li>'+
														'<li class="vi-font-size-2" value="2">a</li>'+
														'<li class="vi-font-size-3" value="3">a</li>'+
														'<li class="vi-font-size-4" value="4">a</li>'+
														'<li class="vi-font-size-5" value="5">a</li>'+
													'</ul>'+
												'</div>'+

											'</div>'+


											'<div class="vi-bg-color vi-table-center">'+

												'<h5>Цвет:</h5>'+
												'<div class="vi-bg-color-list">'+
													'<ul>'+
														'<li class="vi-bg-color-1" value="black" ><span></span></li>'+
														'<li class="vi-bg-color-2" value="white" ><span></span></li>'+
													'</ul>'+
												'</div>'+

											'</div>'+

											'<div class="vi-img-visibility vi-table-center">'+

												'<h5>Изображение:</h5>'+
												'<div class="vi-img-visibility-list">'+
													'<ul>'+
														'<li class="vi-img-visibility-1" value="visible"><span></span></li>'+
														'<li class="vi-img-visibility-2"	value="hidden"><span></span></li>'+
													'</ul>'+
												'</div>'+

											'</div>'+

											'<div class="vi-reset">'+
												'<button type="button">Обычный режим</button>'+
											'</div>'+

										'</div>'+
									'</div>'+
								'</div>';
		

	$("body").prepend( template );
	
	var
			_body = 						$( $("body") ),
			_viEl = 						$( $(".vi") ),
			_self =             this,

			_listToggle,
			_bodyToggleClass,
			_statusToggle,
			_onChange,

	    fsInputRange = 						$( $("#fs-range") ),
	    fsList = 									$( $(".vi-font-size-list") ),
	    fsClass =									options.fontSizeClass,
	    fsPreVal = 								_self.dataOptions.fontSize,
	    
	    bgColorList = 						$( $(".vi-bg-color-list") ),
	    bgColorClass =						options.bgColorClass,
			bgPreVal = 								_self.dataOptions.bgColor,

			imgVisibilityList =				$( $(".vi-img-visibility-list") ),
			imgVisibilityClass =			options.imgVisibilityClass,
			imgPreVal = 							_self.dataOptions.imgVisibility,

			btnReset =          				$( $(".vi-reset") );





	_statusToggle = function (){
		return _self.dataOptions.status = !_self.dataOptions.status;
	}

	_onChange = function( options ){

		if ( typeof options  !== "undefined"){

	  	_self.dataOptions.fontSize = 			 options.fontSize || _self.dataOptions.fontSize;
	  	_self.dataOptions.bgColor = 			 options.bgColor || _self.dataOptions.bgColor;
	  	_self.dataOptions.imgVisibility =  options.imgVisibility || _self.dataOptions.imgVisibility;

		}
	  localStorage["viDataOptions"] = JSON.stringify( _self.dataOptions );

		return _self.dataOptions;

	}

	_listToggle = function( el, val, fsPreVal ){

		el
			.find( "[value="+fsPreVal+"]" )
			.removeClass("active");
		el
			.find( "[value="+val+"]" )
			.addClass( "active" );

	}

	_bodyToggleClass = function( elClass, val, preVal ){

		$( _body )
			.removeClass	( elClass+"-"+preVal )
			.addClass			( elClass+"-"+val );

	}








	/*
		-fontSize-
	*/
	function inputRange( fsParam ){

		typeof fsParam !== "number" ? console.error("Должно быть number")
			: void(0);

		if ( typeof fsParam == "undefined" && !fsInputRange.length ) 
			return false;

		fsInputRange[ fsInputRange.length-1 ].valueAsNumber = fsParam*1;

		return fsInputRange;

	}

	$(fsInputRange).on( "input", function(e, fsVal){

		var val = fsVal || this.valueAsNumber;

		$(this).attr("value", val);

		_listToggle					( fsList, 	val, fsPreVal );
		_bodyToggleClass		( fsClass, 	val, fsPreVal );

		inputRange( val );

		_onChange({
			fontSize: val // // CHANGE OPTION
		});

		fsPreVal = val;

	}); 


	$( fsList ).find( "li, [vi-fs]" ).on( "click", function(e){

		var val = this.value;
		fsInputRange.trigger("input", [val]);

	})
	



	/*
		-bgColor-
	*/
	function bgColorSet( bgColorParam ){

		typeof bgColorParam !== "string" ? console.error("Должно быть string") 
		: void(0);

		if ( typeof bgColorParam == "undefined") 
			return false;

		_listToggle				( bgColorList, 	bgColorParam, bgPreVal);
		_bodyToggleClass	( bgColorClass, bgColorParam, bgPreVal);

		_onChange({
			bgColor: bgColorParam // CHANGE OPTION
		});

		bgPreVal = bgColorParam;
	}

	$(bgColorList).find('li, [vi-fs]').on( "click", function(e){

		var val = $(this).attr("value");
		bgColorSet( val );

	} )



	/*
		-imgVisibility-
	*/
	function imgVisibilitySet( imgVisibilityParam ){

		
		typeof imgVisibilityParam !== "string" ? console.error("Должно быть string") 
		: void(0);

		if ( typeof imgVisibilityParam == "undefined") 
			return false;

		_listToggle				( imgVisibilityList, 	imgVisibilityParam, imgPreVal);
		_bodyToggleClass	( imgVisibilityClass, imgVisibilityParam, imgPreVal);


		_onChange({

			imgVisibility: imgVisibilityParam // CHANGE OPTION

		});

		imgPreVal = imgVisibilityParam;

	}



	$(imgVisibilityList).find('li, [vi-fs]').on( "click", function(e){

		var val = $(this).attr("value");
		imgVisibilitySet( val );

	} )


	

	/*
		btnEvent
	*/
	function on(){
		_viEl.removeClass("deactive");
		$("html").addClass("vi-active");

		typeof options.callOn === "function" ? 
			options.callOn() : void(0);
			
		_onChange();

	}
	 function off(){
		_viEl.addClass("deactive");
		$("html").removeClass("vi-active");
		
		typeof options.callOff === "function" ?
			options.callOff() : void(0)

		_onChange()
	}
	function toggle(){

		_statusToggle() ? 
			_self.on() 
		:
			_self.off();

	}

	$(btnEvent).on("click", function(){

		_self.toggle();

		typeof options.callToggle === "function" ?
			options.callToggle() 
		: 
			void(0);

	})


	$(btnReset).on("click", function(){
		$(btnEvent).trigger("click");
	})


	function startInit(){
		
		var fontSize = 				_self.dataOptions.fontSize;
		var bgColor = 				_self.dataOptions.bgColor;
		var imgVisibility = 	_self.dataOptions.imgVisibility;
		var grayScale = 			_self.dataOptions.grayScale;
		
		fsInputRange.trigger				( "input", [ fontSize ] ); 				// fontSize
		bgColorSet									( bgColor );						 					// bgColor
		imgVisibilitySet						( imgVisibility );								// imgVisibility
		grayScale ? _body.addClass	( "vi-grayscale" )								// grayScale
		: void(0);  				

	}
	startInit();

	if ( _self.dataOptions.status )
		_self.on();



}




window.$.fn.initVi = function(option){

	var options = $.extend({

		fontSizeClass: 						"vi-font-size",
		bgColorClass: 						"vi-bg-color",
		imgVisibilityClass: 			"vi-img-visibility",

		//dafault options
		fontSize: 						2, 
		bgColor: 							"white",
		imgVisibility: 				"hidden",
		status: 							false,
		grayScale: 						true,
		callOn: 							Function,
		callOff: 							Function,
		callToggle: 					Function

	}, option );

	var vi = new Vi(this, options);

	return vi;

}










// COMMON FUNCTION



function checkView( width ){
	return ($( document ).width() > width);
}


function scrolledDiv(el) {
	try{
	  var docViewTop = $(window).scrollTop(),
		docViewBottom = docViewTop + $(window).height(),
		elTop = $(el).offset().top,
		elBottom = elTop + $(el).height()/1.8;
	}catch(err){console.error();}

  	return ((elBottom <= docViewBottom) && (elTop >= docViewTop));
}