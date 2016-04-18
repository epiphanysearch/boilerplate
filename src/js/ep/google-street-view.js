define(["jquery"], function($) {

    /**
 * Create an instance of Google Street View
 * @param  {Object} opts  Set options for the street view instance.
 *
   * {
 * id: id of DOM element to hold the street view (required)

 *  lat: lattitude of street view position, (required)
 * lng: longitude of street view position, (required) 

 * heading: heading for POV of street view, 
 * pitch: pitch for POV of street view,
 * zoomControl: Boolean to show/hide zoomControl (default: true)
 * streetViewControl : Boolean to show/hide streetViewControl (default: true)
 * panControl: Boolean to show/hide the panControl (default: true)
 * scrollwheel: Boolean to enable/disable zoom with scroll wheel (default: true)
 * zoom: Default zoom level upon load (default: 0)
 *          ...
 *  add more here if needed
 *  ...
 * }
 *
 */
    return function(opts) {

        var obj = this;

        var settings = {
        	id: 'pano',
        	lat: 53.789359,
        	lng: -1.534083,
        	heading: 0,
        	pitch: 0,
            zoomControl: true,
            streetViewControl: true,
            panControl: true,
            scrollwheel: true,
            zoom: 1
        }
        $.extend(settings, opts);

        /**
         * Panaorama
         * @type {google.maps.StreetViewPanorama}
         */
        this.panorama;

        /**
         * DOM element that contains the StreetViewPanorama
         * @type {DOMElement}
         */
        this.el = $('#' + settings.id);

        /**
         * Array of markers on the map
         * @type {array}
         */
        this.markers = [];

        /**
         * Street View Map constructor
         * @param  {number} lat  Latitude is specified in degrees within the range [-90, 90].
         * @param  {number} lng  Longitude is specified in degrees within the range [-180, 180].
         * @return {undefined}
         */
        this.init = function() {

            // Create new street view map
            obj.panorama = new google.maps.StreetViewPanorama(document.getElementById(settings.id), {

                position: new google.maps.LatLng(settings.lat, settings.lng),
                pov: {
                    heading: Number(settings.heading),
                    pitch: Number(settings.pitch)
                },
                zoomControl: settings.zoomControl,
                streetViewControl: settings.streetViewControl,
                panControl: settings.panControl,
                scrollwheel: settings.scrollwheel,
                zoom: settings.zoom
            });

            // add listeners
            google.maps.event.addListener(obj.panorama, 'pano_changed', this.onPanoChanged);
            google.maps.event.addListener(obj.panorama, 'position_changed', this.onPositionChanged);
            google.maps.event.addListener(obj.panorama, 'pov_changed', this.onPovChanged);
            // google.maps.event.addListener(obj.panorama, 'links_changed', this.onLinksChanged);
        }

        /**
         * Fire a custom event whenever the id of the street view panorama changes
         * @type {event} e Event
         * @return {undefined}
         */
        this.onPanoChanged = function(e) {
            obj.el.trigger('panoChanged', obj.panorama);
        }

        /**
         * Fire a custom event whenever the lat lng of the street view panorama changes
         * @type {event} e Event
         * @return {undefined}
         */
        this.onPositionChanged = function(e) {
            obj.el.trigger('positionChanged', obj.panorama);
        }

        /**
         * Fire a custom event whenever the point of view of the street view panorama changes
         * @type {event} e Event
         * @return {undefined}
         */
        this.onPovChanged = function(e) {
            obj.el.trigger('povChanged', obj.panorama);
        }

        /**
         *  Adds a marker to this.map
         * @param {Object}  data      settings for this marker, properties include...
         *
         *  {
         *  data.name: String to be used as a name for this marker,
         *  data.lat: Lattitude to use for position of this marker
         *  data.lng: Longitude to use for position of this marker
         *  data.draggable: Boolean to make marker draggable
         *  data.icon: path to custom .png to use for icon
         *  }
         */
        this.addMarker = function(data) {

            var self = this,

                marker = new google.maps.Marker({
                    map: obj.panorama,
                    title: data.name,
                    position: new google.maps.LatLng(data.lat, data.lng),
                    draggable: data.draggable,
                    icon: data.icon
                });

            obj.markers.push(marker);

            google.maps.event.addListener(marker, 'click', function(e) {
                $(document.body).trigger('markerClicked', marker);
            });

            google.maps.event.addListener(marker, "dragend", function(e) {
                $(document.body).trigger('markerDragEnd', [e, marker, data]);
            });
        }

        /**
         * Remove all existing markers from this map
         * @return {undefined}
         */
        this.removeMarkers = function() {
            for (var i = 0; i < obj.markers.length; i++) {
                obj.markers[i].setMap(null);
            }
        }

        /**
         * Get the street view panorama for this map
         * @return {google.maps.StreetViewPanorama}  Google street view panaroma
         */
        this.getPano = function() {
            return this.panorama;
        }

        this.init();

        // onLinksChanged: function(){
        //  var linksTable = document.getElementById('links_table');
        //  while(linksTable.hasChildNodes()) {
        //  linksTable.removeChild(linksTable.lastChild);
        //  };
        //  var links =  obj.panorama.getLinks();
        //  for (var i in links) {
        //  var row = document.createElement('tr');
        //  linksTable.appendChild(row);
        //  var labelCell = document.createElement('td');
        //  labelCell.innerHTML = '<b>Link: ' + i + '</b>';
        //  var valueCell = document.createElement('td');
        //  valueCell.innerHTML = links[i].description;
        //  linksTable.appendChild(labelCell);
        //  linksTable.appendChild(valueCell);
        //  }
        // }
        // 
    };

});