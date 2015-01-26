var stats = new Stats();
var statsMode = 0;
stats.setMode(statsMode); // 0: fps, 1: ms
document.getElementById('content').appendChild(stats.domElement);

setInterval(function() {
  stats.setMode(statsMode = Number(!statsMode));
}, 5000);
