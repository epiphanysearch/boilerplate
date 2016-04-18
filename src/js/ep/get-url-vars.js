
define([], function(){
	
	return function() {
	    var vars = {};
	    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
	        vars[key] = value;
	    });
	    return vars;
	}

});