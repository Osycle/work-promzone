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
		}, 300);
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
		"bgStyle": "black" // default white
	})











	});//$
}) (jQuery);


var ix;

function Vi( btnEvent, options ){

	/**
	*	
	*	
	*/



	var _body = 						$( $("body") ),
			_viEl = 						$( $(".vi") ),
			_self =             this,

	    fsInputRange = 			$( $("#fs-range") ),
	    fsList = 						$( $(".vi-font-size-list") ),
	    fsClass =						options.fontSizeClass,
	    fsPreVal = 					0
	

	this.btnEvent 		= btnEvent;
	this.bgStyle 			= options.bgStyle;
	this.inputRange 	= _inputRange
	this._onChange 		= _onChange;
	this.dataOptions = {
		fontSize: 1
	}



	function _onChange( options ){
		
		  _self.dataOptions.fontSize = options.fontSize || _self.dataOptions.fontSize;
		 	//console.log( _self.dataOptions.fontSize )
	}

	function _inputRange( fsParam ){

		if ( typeof fsParam !== "number" )  
			return console.error("Должно быть number");

		if ( typeof fsParam == "undefined" && !fsInputRange.length)  
			return false;
		
		//input range value
		fsInputRange[0].valueAsNumber = fsParam*1;
		fsInputRange.trigger("input");

		return fsInputRange;

	}
	$(fsInputRange).on( "input", _self.dataOptions,function(e){
		console.log( e.data );
		var val = this.valueAsNumber

		$(this).attr("value", val);

		$(_body)
						.removeClass( fsClass+"-"+fsPreVal )
						.addClass( fsClass+"-"+val );


		fsList.find( "[value="+fsPreVal+"]" ).removeClass("active");
		fsList.find( "[value="+val+"]" ).addClass("active");
		
		_onChange({
			fontSize: val // value fontSize
		});

		fsPreVal = val; // prev value fontSize 

	}); 

	$(fsList).find("li, [vi-fs]").on("click", function(e){
		fsInputRange.trigger("input", _self.dataOptions.fontSize = 1);
	})





	//console.log( btnEvent, options, this.bgStyle );


}



window.$.fn.initVi = function(option){

	var options = $.extend({

		bgStyle: "white",
		fontSizeClass: "vi-font-size"

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