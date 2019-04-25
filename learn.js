const PI = Math.PI;

const canvas = document.querySelector('canvas');

canvas.width = 800;
canvas.height = 400;

var ctx = canvas.getContext('2d');

window.addEventListener('mousemove', function() {
  mouse.x = event.x;
  mouse.y = event.y;
  console.log(mouse);
});

class Ball {
  constructor(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.dx = 0;
    this.dy = 0;
  }
  collidedWithBall(ball) {
    if (getDistance(this, ball) <= this.r + ball.r) {
      reutrn (true);
    }
    else {
      return (false);
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
  update() {
    this.x += this.dx;
    this.y += this.dy;
  }
}

class Player extends Ball {
  update() {
    this.x = mouse.x;
    this.y = mouse.y;
  }
}

function getDistance(obj1, obj2) {
  const xDistance = obj1.x - obj2.x;
  const yDistance = obj1.y - obj2.y;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function ballsCollided(b1, b2)
{
}

function loop(t) {
  requestAnimationFrame(loop);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  b1.draw();
  b1.update();
  b2.draw();
  b2.update();
  if (getDistance(b1, b2) <= b1.r + b2.r) {
    console.log("COLLIDE");
  }
}

var mouse = {
  x: undefined,
  y: undefined
}
b1 = new Ball(100, 100, 100, 'blue');
b2 = new Player(100, 100, 10, 'blue');
loop();
