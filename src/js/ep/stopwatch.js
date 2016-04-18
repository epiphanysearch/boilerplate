
define(["jquery"], function($){
	
	// Old IE fix
	Date.now = Date.now || function() { return +new Date; };

	
	var offset,	
		interval,
		time = 0,
		isRunning = false,

		settings = {
			maxTime: 0,
			countdown: false
		},

	
	stopwatch = {

		init: function(el, opts){
			this.el = $(el);
			settings = $.extend(settings, opts);
		
			stopwatch.reset();
		},

		start: function(){
			offset 		= Date.now();
			isRunning 	= true;
			interval 	= setInterval(function(){
				if (settings.countdown) {
					time -= stopwatch.delta();
				} else {
					time += stopwatch.delta();
				}
				stopwatch.render();
			}, 1);
		},

		stop: function(){
			isRunning = false;
			if (interval) {
				clearInterval(interval);
			}
			return Math.round(time/1000);
		},

		reset: function(){
			this.stop();
			time = (settings.countdown) ? settings.maxTime : 0;
			this.render();
		},

		render: function(){
			var t = ((time/1000) < 10) ? (time/1000).toFixed(1) : Math.round(time/1000);
			if (t == 0.0) {
				t = 0;
			}
			stopwatch.el.text( t );

			if (t >= settings.maxTime || (settings.countdown && t <= 0)) {
				stopwatch.stop();
				$('body:first').trigger('maxTimeOut');
			}
		},

		delta: function(){
			var now = Date.now(),
		        d   = now - offset;
		    offset = now;
		    return d;
		},

		getTime: function(unit){
			return (unit == 'seconds') ? (time/1000) : time;
		},

		isRunning: function(){
			return (isRunning) ? true : false;
		}

	}

	return stopwatch;

});