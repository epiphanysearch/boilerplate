
define([], function(){
	
	var rad = function(x) {
		return x * Math.PI / 180;
	};

	/**
	 * Calculates and returns the distance between 2 google latlng objects
	 * @param {google.maps.LatLng} 		p1 		google LatLng position
	 * @param {google.maps.LatLng} 		p2 		google LatLng position
	 * @return {number}			
	 */
	return function(p1, p2, metric){
		var R = 6378137, 	// Earth’s mean radius in meter
			dLat = rad(p2.lat() - p1.lat()),
			dLong = rad(p2.lng() - p1.lng()),
			a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) * Math.sin(dLong / 2) * Math.sin(dLong / 2),
			c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)),
			d = R * c;		// d = the distance in meter

			if (metric == 'miles') {		// convert to miles?
				d = d * 0.000621371192;
			}
		
		return d; 			
	}

});