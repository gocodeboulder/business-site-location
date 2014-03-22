function main() {
  var map = new L.Map('map', {
    zoomControl: false,
    center: [39, -105.5],
    zoom: 7
  });

  L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {
    attribution: 'Stamen'
  }).addTo(map);

  cartodb.createLayer(map, 'http://douglas.cartodb.com/api/v2/viz/510c38ec-b1e6-11e3-b882-0e73339ffa50/viz.json')
   .addTo(map)
   .on('done', function(layer) {

    layer.setInteraction(true);

    layer.on('featureOver', function(e, pos, latlng, data) {
      cartodb.log.log(e, pos, latlng, data);
    });

    layer.on('error', function(err) {
      cartodb.log.log('error: ' + err);
    });
  }).on('error', function() {
    cartodb.log.log("some error occurred");
  });


  // Sidebar controls
  $("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("active");
  });
  
  $('.slider').slider();
}

// you could use $(window).load(main);
window.onload = main;