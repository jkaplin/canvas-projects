const PI = Math.PI;
const G = 9.8;

const canvas = document.querySelector('canvas');

canvas.width = 800;
canvas.height = 400;

var ctx = canvas.getContext('2d');

class Ball {
  constructor(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.v0 = 0;
    this.vy = 0;
    this.dy = 0;
    this.color = color;
    this.t = 0;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
  update() {
    this.vy = G * this.t + this.v0;
    this.dy = this.vy * this.t;
    this.y += this.dy;
    if (this.y + this.r > canvas.height) {
      this.y = canvas.height - this.r;
      this.t = 0;
      this.v0 = -10;
    }
    this.t += 0.01;
  }
}

function loop(t) {
  requestAnimationFrame(loop);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  b1.draw();
  b1.update();
}
b1 = new Ball(100, 100, 10, 'blue');
loop();
