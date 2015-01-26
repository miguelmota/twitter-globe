  var proxyUrl = 'http://data.webglearth.com/cgi-bin/corsproxy.fcgi?url=';

  var options = {
    sky: true,
    atmosphere: true,
    dragging: true,
    tilting: true,
    zooming: true,
    center: [32.252841, -110.881343],
    scrollWheelZoom: true,
    zoom: 10,
    proxyHost: proxyUrl
  };

  var earth = new WebGLEarth('earth', options);

  var USBounds = [[25.049424, -126.580527], [47.886422, -66.191506]];

  earth.fitBounds(USBounds);
  earth.panInsideBounds(USBounds, {heading: 0, tilt: 25, duration: 1});

  var natural = WE.tileLayer('http://data.webglearth.com/natural-earth-color/{z}/{x}/{y}.jpg', {
      tileSize: 256,
      bounds: [[-85, -180], [85, 180]],
      minZoom: 0,
      maxZoom: 16,
      attribution: 'WebGLEarth example',
      tms: true
    });
    //natural.addTo(earth);

    var toner = WE.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {
      attribution: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.',
      opacity: 0.4
    });
    //toner.addTo(earth);

    var markers = [];

    function plotPoint(opts) {
      opts = opts || {};
      var coords = [opts.lat, opts.lon];
      console.log('here', coords);
      var marker = WE.marker(coords).addTo(earth);
      marker.bindPopup(opts.text, {maxWidth: 150, closeButton: true});//.openPopup();
      markers.push(marker);
      earth.panTo(coords, 1);
    }

    var before = null;
    requestAnimationFrame(function animate(now) {
      stats.update();
      var c = earth.getPosition();
      var elapsed = before? now - before: 0;
      before = now;
      //earth.setCenter([c[0], c[1] + 0.1*(elapsed/30)]);
      requestAnimationFrame(animate);
    });
