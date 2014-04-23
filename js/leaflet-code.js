var map = new L.Map('mapDiv', {center: new L.LatLng(39.825413,-105.056763), zoom: 10});
var osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

var styles = [
    {
      featureType: 'all',
      stylers: [{hue: '#ff0000'}]
    }
 ];

var ggl = new L.Google('ROADMAP', {
	mapOptions: {
		styles: styles
	}
});
map.addLayer(ggl);
map.addControl(new L.Control.Layers( {'OSM':osm, 'Google':ggl}, {}));

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

var zonesLayer = L.geoJson().addTo(map); //get the geojson from mapfish localhost:5000
$.get('http://localhost:5000/zones',
    {'limit': 1000},
    function(data){zonesLayer.addData(data);},
    'json');
map.addLayer(zonesLayer);
map.on('click', onMapClick);