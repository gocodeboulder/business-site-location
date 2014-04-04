var mapLayers = { };

var sharedCartoCSS = 'marker-width: 10;' +
  'marker-allow-overlap: true;';// +
  //'marker-comp-op: multiply;' +
  //'marker-line-opacity: 0';

var mapSpecificStyles = {
  'layer1': '#liquor_licenses{' +
            'polygon-fill: #FF2900;' +
            'polygon-comp-op: multiply;' +
            'line-color: #FF5C00;' +
            'line-width: 10;' +
            'line-opacity: 0.003;}',

  'layer2': '#coloradocai_denver{' +
              'polygon-comp-op: multiply;' +
              'line-color: #d7faf4;' +
              'line-width: 0;' +
              'line-opacity: 0;}' +
            '#coloradocai_denver [ actualdown <= 9200] {polygon-fill: #B10026;}' +
            '#coloradocai_denver [ actualdown <= 19.12] {polygon-fill: #E31A1C;}' +
            '#coloradocai_denver [ actualdown <= 13.5] {polygon-fill: #FC4E2A;}' +
            '#coloradocai_denver [ actualdown <= 9.62] {polygon-fill: #FD8D3C;}' +
            '#coloradocai_denver [ actualdown <= 5.6] {polygon-fill: #FEB24C;}' +
            '#coloradocai_denver [ actualdown <= 4.641] {polygon-fill: #FED976;}' +
            '#coloradocai_denver [ actualdown <= 3.323] {polygon-fill: #FFFFB2;}',

  'layer3': '#signaldata{'+
              'polygon-opacity: 0.01;'+
              'polygon-comp-op: darken;'+
              'line-color: #FFCC00;'+
              'line-width: 0;'+
              'line-opacity: 0;}'+
            '#signaldata [ devicesignalstrength <= 0] {polygon-fill: #B10026;}'+
            '#signaldata [ devicesignalstrength <= -30.5714] {polygon-fill: #E31A1C;}'+
            '#signaldata [ devicesignalstrength <= -53.5556] {polygon-fill: #FC4E2A;}'+
            '#signaldata [ devicesignalstrength <= -63.5926] {polygon-fill: #FD8D3C;}'+
            '#signaldata [ devicesignalstrength <= -70.6471] {polygon-fill: #FEB24C;}'+
            '#signaldata [ devicesignalstrength <= -76.8889] {polygon-fill: #FED976;}'+
            '#signaldata [ devicesignalstrength <= -86.5] {polygon-fill: #FFFFB2;}'
};

$(document).ready(function() {
  // Sidebar controls
  $("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("active");
  });

  var sliderOptions = {
    min: 0,
    max: 1,
    step: 0.01,
    value: 0.5,
    formater: function(val) {
      return val.toFixed(2);
    }
  };

  $('.slider.common-slider').slider(sliderOptions);

  var costOptions = {
    min: 10,
    max: 100,
    step: 1,
    value: 25,
    formater: function(val) {
      return '$' + val.toFixed(2);
    }
  };

  $('.slider.cost-slider').slider(costOptions);
  

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


    $('.slider').on('slideStop', function (e) {
      //console.log('Changed ' + $(this).id + ' val ' + e.value);
      var sliderID = $( this ).attr('id');
      //console.log(sliderID);

      switch(sliderID)
      {
        case 'slider1':
          mapLayers.layer1.setCartoCSS(
            '#liquor_licenses { polygon-opacity: '+ e.value*0.1 +'; '+
            ' }' +
            mapSpecificStyles.layer1
          );
          console.log('CSS: ' + mapLayers.layer1.getCartoCSS() );
          //console.log('layer2 cartoCSS changed');
          break;
        case 'slider2':
          mapLayers.layer2.setCartoCSS(
            '#coloradocai_denver { polygon-opacity: '+ e.value*0.1 +'; '+
            ' }' +
            mapSpecificStyles.layer2
          );
          console.log('CSS: ' + mapLayers.layer2.getCartoCSS() );
          break;
        case 'slider3':
          mapLayers.layer3.setCartoCSS(
            '#signaldata { polygon-opacity: '+ e.value*0.02 +'; '+
            ' }' +
            mapSpecificStyles.layer3
          );
          console.log('CSS: ' + mapLayers.layer3.getCartoCSS() );
          break;
        default:
          break;
      }
    });
  });

});
