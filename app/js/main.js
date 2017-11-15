'use strict';

(function(){
$(function(){





	// FANCYBOX
	if( $("[data-fancybox='product']").length != 0 )
		$("[data-fancybox='product']").fancybox({
			afterShow : function( instance, current ) {
			},
			animationEffect : "fade",
			transitionEffect: "zoom-in-out"
		});
	if( $("[data-fancybox='gallery']").length != 0 )
		$("[data-fancybox='gallery']").fancybox({
			afterShow : function( instance, current ) {
			},
			animationEffect : "fade",
			transitionEffect: "zoom-in-out"
		});

	//WOW
	new WOW({
		offset: 30
	}).init();


	// AOS
	AOS.init({

	  offset: 0,
	  once: true,
	  duration: 1000,
	  delay: 100

	});

	setTimeout(function(){
		AOS.refresh()
	}, 300);


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
	    autoplayTimeout: 3000,
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
			.add("input")
			.removeClass("hide").addClass("show");

		setTimeout(function(){ 
			$(".aSearch").addClass("in") 
		}, 1);

	}else{
		statusSearchView = !statusSearchView;
		$(".aSearch").removeClass("in");

		setTimeout(function(){
			$(".nav-search-content")
			.find(".btn-search-sub")
			.add("input")
			.addClass("hide").removeClass("show")
		}, 1);
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







	//vi init
	window.vi = $(".vi-btn-toggle").initVi({
		fontSize: 4,
		bgColor: "black" // default white
	})











	});//$
}) (jQuery);


var ix;

function Vi( btnEvent, options ){

	/**
	*	
	*	
	*/




	//protected
	var _listToggle,
			_bodyToggleClass,
			_onChange;

	// public
	this.btnEvent 		= btnEvent;
	this.dataOptions = {
		fontSize: options.fontSize,
		bgColor: options.bgColor,
		imgVisibility: options.imgVisibility
	}

	this.inputRange 	= inputRange;
	this.bgColorSet 	= bgColorSet;





	var _body = 						$( $("body") ),
			_viEl = 						$( $(".vi") ),
			_self =             this,

	    fsInputRange = 			$( $("#fs-range") ),
	    fsList = 						$( $(".vi-font-size-list") ),
	    fsClass =						options.fontSizeClass,
	    fsPreVal = 					_self.dataOptions.fontSize,
	    
	    bgColorList = 			$( $(".vi-bg-color-list") ),
	    bgColorClass =			options.bgColorClass,
			bgPreVal = 					_self.dataOptions.bgColor,

			imgVisibilityList =			$( $(".vi-img-visibility-list") ),
			imgVisibilityClass =		options.imgVisibilityClass,
			imgPreVal = 					_self.dataOptions.imgVisibility



	function _onChange( options ){
		
	  _self.dataOptions.fontSize = options.fontSize || _self.dataOptions.fontSize;
	  _self.dataOptions.bgColor = options.bgColor || _self.dataOptions.bgColor;
	  _self.dataOptions.imgVisibility = options.imgVisibility || _self.dataOptions.imgVisibility;

		  console.log( _self.dataOptions );
		 	return _self.dataOptions
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
			.removeClass( elClass+"-"+preVal )
			.addClass( elClass+"-"+val );
	}








	/*
		-fontSize-
	*/

	function inputRange( fsParam ){
		var type = "number";
		if ( typeof fsParam !== type ) return console.error("Должно быть "+type);
		if ( typeof fsParam == "undefined" && !fsInputRange.length) return false;

		//input range value

		fsInputRange[ fsInputRange.length-1 ].valueAsNumber = fsParam*1;
		return fsInputRange;
	}

	/*
		EVENT fsInputRange oninput
	*/
	$(fsInputRange).on( "input", function(e, fsVal){

		var val = fsVal || this.valueAsNumber;

		$(this).attr("value", val);

		_listToggle					( fsList, val, fsPreVal );
		_bodyToggleClass		( fsClass, val, fsPreVal );

		inputRange( val );

		_onChange({
			fontSize: val // // CHANGE OPTION
		});

		fsPreVal = val;
	}); 

	/*
		EVENT fsList onclick
	*/
	$( fsList ).find( "li, [vi-fs]" ).on( "click", function(e){
		var val = this.value;
		fsInputRange.trigger("input", [val]);
	})
	







	/*
		-bgColor-
	*/
	function bgColorSet( bgColorParam ){

		if ( typeof bgColorParam !== "string" ) return console.error("Должно быть string");
		if ( typeof bgColorParam == "undefined") return false;

		_listToggle				( bgColorList, bgColorParam, bgPreVal);
		_bodyToggleClass	( bgColorClass, bgColorParam, bgPreVal);

		bgPreVal = bgColorParam;

		_onChange({
			bgColor: bgColorParam // CHANGE OPTION
		});
	}

	$(bgColorList).find('li, [vi-fs]').on( "click", function(e){
		var val = $(this).attr("value");
		bgColorSet( val );
	} )




	/*
		-imgVisibility-
	*/
	function imgVisibilitySet( imgVisibilityParam ){

		
		if ( typeof imgVisibilityParam !== "string" ) return console.error("Должно быть string");
		if ( typeof imgVisibilityParam == "undefined") return false;

		_listToggle				( imgVisibilityList, imgVisibilityParam, imgPreVal);
		_bodyToggleClass	( imgVisibilityClass, imgVisibilityParam, imgPreVal);

		imgPreVal = imgVisibilityParam;

		_onChange({
			imgVisibility: imgVisibilityParam // CHANGE OPTION
		});
	}

	$(imgVisibilityList).find('li, [vi-fs]').on( "click", function(e){
		var val = $(this).attr("value");
		console.log(val, imgPreVal)
		imgVisibilitySet( val );
	} )








	function startInit(){
		
		var fontSize = 				_self.dataOptions.fontSize;
		var bgColor = 				_self.dataOptions.bgColor;
		var imgVisibility = 	_self.dataOptions.imgVisibility;

		fsInputRange.trigger	("input", [ fontSize ]);
		bgColorSet						( bgColor );
		imgVisibilitySet			( imgVisibility );

	}
	startInit();

}



window.$.fn.initVi = function(option){

	var options = $.extend({

		fontSizeClass: "vi-font-size",
		bgColorClass: "vi-bg-color",

		//dafault options
		fontSize: 2, 
		bgColor: "white",
		imgVisibility: "hidden"

	}, option );
	var vi = new Vi(this, options);

	return vi;

}





//COMMON FUNTIONS

function sendForm(th){

	this.onsubmit = function(e){ e.preventDefault();}
	var require = $(th).serialize();
	send(require+"&to="+to);

	$(th).find("input").val("");
}

function ajPost(u, d, s, c){
	$.ajax({
		type: 		"POST",
		url: 			u,
		data: 		d,
		success: 	s,
		statusCode: {
			404: function(){alert("Страница не найдена");}
		},
		complete: c
	});
}

function checkView( width ){
	return ($( document ).width() > width);
}


function modalShadow( el ){

	if( $(modal_shadow).length == 0 && el.jquery) 
		return;

	if( modal_shadow.fadeToggleBool() ){
		modal_shadow.on("click", function(){
			if(el.length != 0)
				el.trigger("click");
			});
	}else
		modal_shadow.off("click");
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