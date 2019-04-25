const canvas = document.querySelector('canvas');

canvas.width = 800;
canvas.height = 400;

var ctx = canvas.getContext('2d');

function getRndColor() {
    var r = 255*Math.random(),
        g = 255*Math.random(),
        b = 255*Math.random();
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

class Circle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = 'black';
    this.dx = 2;
    this.dy = 2;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.strokeStyle = 'white';
    ctx.fill();
    ctx.stroke();
  }
  update() {
    const rand = Math.random();
    this.x += this.dx;
    this.y += this.dy;
    if (this.x >= canvas.width || this.x <= 0) {
      this.dx *= -1;
    }
    if (this.y >= canvas.height || this.y <= 0) {
      this.dy *= -1;
    }
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      this.color = getRndColor();
      if (this.radius < 50) {
        this.radius += 1;
        this.dx += this.dx * 0.2 * Math.random();
        this.dy += this.dx * 0.2 * Math.random();
      }
    }
    else {
      this.dx /= 1.005;
      this.dy /= 1.005;
      this.color = 'black';
      this.radius = radius;
    }
  }
}


function loop() {
  requestAnimationFrame(loop);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < circles.length; i++) {
    circles[i].draw();
    circles[i].update();
  }
  // execute loop function over and over
}

var mouse = {
  x: undefined,
  y: undefined
}

window.addEventListener('mousemove', function(e) {
  mouse.x = e.x;
  mouse.y = e.y;
  console.log(mouse);
});

var num = 1000;
var radius = 5;
var xRange = 800;
var yRange = 400;
var xStart = 0;
var yStart = 0;

var circles = [];
for (let i = 0; i < num; i++) {
  const x = xStart + Math.random() * xRange;
  const y = yStart + Math.random() * yRange;
  circles.push(new Circle(x, y, radius));
}
loop();
