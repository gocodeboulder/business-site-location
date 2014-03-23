var mapLayers = { };

var sharedCartoCSS = 'marker-width: 10;' +
  'marker-allow-overlap: true;' +
  'marker-comp-op: multiply;' +
  'marker-line-opacity: 0';

var mapSpecificStyles = {
  'layer3': '#signaldata [ devicesignalstrength <= 0] {marker-fill: #B10026;}' +
            '#signaldata [ devicesignalstrength <= -34.1196] {marker-fill: #E31A1C;}' +
            '#signaldata [ devicesignalstrength <= -53.5556] {marker-fill: #FC4E2A;}' +
            '#signaldata [ devicesignalstrength <= -63.5926] {marker-fill: #FD8D3C;}' +
            '#signaldata [ devicesignalstrength <= -70.6471] {marker-fill: #FEB24C;}' +
            '#signaldata [ devicesignalstrength <= -76.8889] {marker-fill: #FED976;}' +
            '#signaldata [ devicesignalstrength <= -85.4] {marker-fill: #FFFFB2;}'
};

$(document).ready(function() {
  // Sidebar controls
  $("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("active");
  });

  $('.slider').slider({'min': 0, 'max': 1, step: '0.1'});
  

  var url = 'http://sebrenner.cartodb.com/api/v2/viz/0ea1f37e-b21e-11e3-bf2d-0edbca4b5057/viz.json';
  var me = this;

  console.log('ready');

  cartodb.createVis('map', url, {center: [39, -105.5], zoom: 7})
  .done(function(vis, layers) {
    console.log('layers: ');
    console.dir(layers[1].getSubLayer(0));
    mapLayers.layer1 = layers[1].getSubLayer(0);
    mapLayers.layer2 = layers[1].getSubLayer(1);
    mapLayers.layer3 = layers[1].getSubLayer(2);
    //mapLayers.layer4 = layers[1].getSubLayer(3);

    console.log(mapLayers.layer1.getSQL());
    console.log(mapLayers.layer2.getSQL());
    console.log(mapLayers.layer3.getSQL());
    //console.log(mapLayers.layer4.getSQL());


    $('.slider').on('slide', function (e) {
      //console.log('Changed ' + $(this).id + ' val ' + e.value);
      var sliderID = $( this ).attr('id');
      //console.log(sliderID);

      switch(sliderID)
      {
        case 'slider1':
          mapLayers.layer1.setCartoCSS(
            '#liquor_licenses { marker-opacity: '+ e.value +'; '+
            sharedCartoCSS + ' }'
          );
          //console.log('CSS: ' + mapLayers.layer1.getCartoCSS() );
          //console.log('layer2 cartoCSS changed');
          break;
        case 'slider2':
          mapLayers.layer2.setCartoCSS(
            '#coloradocai_denver { marker-opacity: '+ e.value +'; '+
            sharedCartoCSS + ' }'
          );
          break;
        case 'slider3':
          mapLayers.layer3.setCartoCSS(
            '#signaldata { marker-opacity: '+ e.value +'; '+
            sharedCartoCSS + ' }' +
            mapSpecificStyles.layer3
          );
          break;
        default:
          break;
      }
    });
  });
});
