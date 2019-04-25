const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function getRndColor() {
    var r = 255*Math.random(),
        g = 255*Math.random(),
        b = 255*Math.random();
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

var ctx = canvas.getContext('2d');

var xRange = 1;
var yRange = 1;
var xStart = canvas.width / 2 - xRange / 2;
var yStart = canvas.height / 2 - yRange / 2;

var num = 1;
var radius = 0.1;

function loop() {
  radius += 0.001
  num++;
  xRange++;
  yRange++;
  xStart = canvas.width / 2 - xRange / 2;
  yStart = canvas.height / 2 - yRange / 2;
  for (let i = 0; i < num; i++) {
    const x = xStart + Math.random() * xRange;
    const y = yStart + Math.random() * yRange;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = getRndColor();
    ctx.stroke();
  }
  // execute loop function over and over
  requestAnimationFrame(loop);
}
loop();
