
define(["jquery"], function($) {

	return function(el){
		var fold = $(window).height() + $(window).scrollTop();
    	return fold <= $(el).offset().top;
	}

});