
define(["jquery"], function($) {

	return {
	    toTop: function(el, speed, ease){
	        var to = $(el).position().top,
	            speed = speed || 500,
	            ease = ease || 'linear';
	        $('html, body').stop().animate({ 'scrollTop': to}, speed, ease);
	    }
	};

});