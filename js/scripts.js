var baseURL = 'http://{s}.tile.cloudmade.com/{API}/{map_style}/256/{z}/{x}/{y}.png';

var base = L.tileLayer(baseURL, { 
	API: '9315dcdc627b4feab430d377cd7cb978', 
	map_style: '1714' 
	});

var denverLatLon = [39.7392, -104.9847];

var map = L.map('map', {layers: [base]}).setView(denverLatLon, 12);

L.control.scale().addTo(map);


//custom size for this example, and autoresize because map style has a percentage width
var heatmap = new L.TileLayer.WebGLHeatMap({size: 1000, alphaRange: 0.5, opacity: 0.7}); 


//var scale = 0.1;
//var numberOfPoints = 1000;


function generateDataSet(scale, valueRange, numberOfPoints) {
	var data = [];

	for (var i = 0; i < numberOfPoints; ++i) {
		var latVariance = (Math.random()-0.5)*scale;
		var Lat = denverLatLon[0] + latVariance;
		var Lon = denverLatLon[1] + (Math.random()-0.5)*scale;
		var value = valueRange*Math.random();
		//var value = valueRange*latVariance*1000;
		data.push([Lat, Lon, value]);
	}
	return data;
}

var dataSets = [generateDataSet(0.1, 50, 500), 
				generateDataSet(0.1, 100, 250),
				generateDataSet(0.1, 200, 50)];

var dataSetMultipliers = [1, 10, 1];

//var data = [];
//data.concat.apply(data, dataSets);

heatmap.clearData();

function updateHeatMap(multiplier1, multiplier2 ) {
	heatmap.setData([]);
	for (var i=0, numberOfDataSets = dataSets.length; i<numberOfDataSets; i++) {
		for (var j = 0, setLength = dataSets[i].length; j < setLength; j++) {
			heatmap.addDataPoint(dataSets[i][j][0], dataSets[i][j][1], 
				dataSets[i][j][2] * arguments[i] * dataSetMultipliers[i]);
		}
	}
	heatmap.update();
}



var cellular, broadband;

$( document ).ready(function () {

	// Sidebar controls
	$("#menu-toggle").click(function(e) {
		e.preventDefault();
		$("#wrapper").toggleClass("active");
	});

	var initialSliderValue = 0.5;

	var sliderOptions = {
		min: 0,
		max: 1,
		step: 0.01,
		value: 0.5,
		formater: function(val) {
			return val.toFixed(2);
		}
	};
	$('.slider').slider(sliderOptions);

	var slider1Val = initialSliderValue, 
		slider2Val = initialSliderValue, 
		slider3Val = initialSliderValue;

	//$('.slider').on('slideStop', function (e) {
	$('.slider').on('slide', function (e) {
		//console.log($(this).hasClass('heatmap'));
		if ($(this).hasClass('heatmap')) {
			switch( $(this).attr('id') ) {
					case 'slider1':
						slider1Val = e.value;
						break;
					case 'slider2':
						slider2Val = e.value;
						break;
					case 'slider3':
						slider3Val = e.value;
						break;
				}
				var sliderScale = 1/(slider1Val + slider2Val + slider3Val);
				updateHeatMap(slider1Val - slider2Val*slider3Val*sliderScale, 
								(slider2Val- slider1Val*slider3Val*sliderScale), 
								slider3Val - slider1Val*slider2Val*sliderScale);
		}
		else if( $(this).hasClass('opacity') ) {

		}
	});

	/* 
	*  alternatively, if you have intensities set for each point, 
	*  as in above, you can skip the for loop and add the whole dataset 
	*  with heatmap.setData(dataPoints) 
	*/

	map.addLayer(heatmap);
	updateHeatMap(0.3,0.3,0.3);

	function formatData( data, propertyName) {
		var formattedData = [], point, lat, lon, value;
		for (var i = 0, len = data.length; i < len; i++ ) {
			lat = data[i].geometry.coordinates[1];
			lon = data[i].geometry.coordinates[0];
			value = data[i].properties[propertyName];
			formattedData.push([lat, lon, value]);
		}
		return formattedData;
	}

	//bbox=xmin,ymin,xmax,ymax
	//$.getJSON( '/broadband_speeds?attrs=actualdown&bbox=-105.0847,39.6392,-104.8847,39.8392')
	$.getJSON( 'data/broadband-subset.json')
		.done(function( data ) {
			//broadband = data;
			broadband = formatData(data.features, 'actualdown');
			dataSets[1] = broadband;
		})
		.fail(function( jqxhr, textStatus, error ) {
			var err = textStatus + ", " + error;
			console.log( "Request Failed: " + err );
		});

	$.getJSON( 'data/cellular-subset.json')
		.done(function( data ) {
			cellular = data;
		})
		.fail(function( jqxhr, textStatus, error ) {
			var err = textStatus + ", " + error;
			console.log( "Request Failed: " + err );
		});
});
