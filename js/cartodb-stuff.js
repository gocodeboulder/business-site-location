var mapLayers = { };

$(document).ready(function() {
  var url = 'http://sebrenner.cartodb.com/api/v2/viz/0ea1f37e-b21e-11e3-bf2d-0edbca4b5057/viz.json';
  var me = this;

  console.log('ready');

  cartodb.createVis('map', url, {center: [39, -105.5], zoom: 7})
  .done(function(vis, layers) {
    console.log('layers: ');
    console.dir(layers[1].getSubLayer(0));
    mapLayers.layer0 = layers[1].getSubLayer(0);
    mapLayers.layer1 = layers[1].getSubLayer(1);
    console.log(mapLayers.layer0.getSQL());

    // Sidebar controls
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("active");
    });

    $('.slider').slider({'min': 0, 'max': 1, step: '0.1'})
      .on('slide', function (e) {
        //console.log('Changed ' + $(this).id + ' val ' + e.value);
        var sliderID = $( this ).attr('id');
        //console.log(sliderID);
        switch(sliderID)
        {
          case 'slider1':
            mapLayers.layer0.setCartoCSS(
              '#the_geom_webmercator { opacity: '+ e.value +'; }'
            );
            console.log('layer0 cartoCSS changed');
            break;
          case 'slider2':

            mapLayers.layer1.setCartoCSS(
              '#the_geom_webmercator { opacity: '+ e.value +'; }'
            );
            console.log('CSS: ' + mapLayers.layer1.getCartoCSS() );
            console.log('layer1 cartoCSS changed');
            break;
          default:
            break;
        }
      });
  });
});
