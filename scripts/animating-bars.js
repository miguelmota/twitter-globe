(function() {
  'use strict';

  var width = 400;
  var height = 200;

  var svg = d3.select('#animating-bars')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  var scaleX;
  var scaleY;
  var data = generateData();

  function render() {

   scaleX = d3.scale.linear()
    .domain(d3.extent(data, function(d) {
      return d.x;
    }))
    .range([0, width]);

   scaleY = d3.scale.linear()
    .domain(d3.extent(data, function(d) {
      return d.y;
    }))
    .range([0, height]);

    // enter
    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect');

      // update
      svg.selectAll('rect')
      .data(data)
      .transition()
      .duration(3000)
      .ease('linear')
      .attr('width', function(d) {
        return scaleX(d.x) + 'px';
      })
      .attr('height', function(d) {
        return (d.y) + 'px';
      })
      .attr('y', function(d, i) {
        return d.y + _.reduce(data, function(acc, dt, j) {
          if (j < i) {
            acc += dt.y + 5;
          }
          return acc;
        }, 0) + 5;
      })
      .attr('x', function(d) {
        return width - scaleX(d.x);
      })
      .attr('class', 'bar');

    // exit
    svg.selectAll('rect')
    .data(data)
    .exit()
    .transition()
    .duration(200)
    .attr('x', function(d) {
      return  d.x + 'px';
    })
    .remove();
  }

  data = _.map(_.range(0, 20), function() {
      return {
        y: _.random(2,10),
        x: _.random(20,60)
      };
    });

  function generateData() {
    return _.map(data, function(o, i) {
      o.x = _.random(20,60);
      return o;
    });
  }

  render();

  setInterval(function() {
    data = generateData();
    render();
  }, 3000);

})();
