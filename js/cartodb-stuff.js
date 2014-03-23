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
    console.log(mapLayers.layer0.getSQL());

    // Sidebar controls
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("active");
    });

    $('.slider').slider()
      .on('slide', function (e) {
        //console.log('Changed ' + $(this).id + ' val ' + e.value);

      });
  });
});
