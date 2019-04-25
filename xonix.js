var keyState = [];
var lastKey;

document.addEventListener("keydown", function() {
  keyState[event.key] = true;
});
document.addEventListener("keyup", function() {
  keyState[event.key] = false;
  if (!lastKey ||
      (lastKey === "ArrowLeft" && event.key !== "ArrowRight") ||
      (lastKey === "ArrowRight" && event.key !== "ArrowLeft") ||
      (lastKey === "ArrowUp" && event.key !== "ArrowDown") ||
      (lastKey === "ArrowDown" && event.key !== "ArrowUp"))
    lastKey = event.key;
});

const canvas = document.querySelector('canvas');

canvas.width = 800;
canvas.height = 400;

const ctx = canvas.getContext('2d');

const config = {
  player: {
    size: 20,
    speed: 5
  },
  ball: {
    radius: 10,
    speed: 10,
    color: 'blue',
    amount: 1
  }
}


const space = config.player.size;
const leftWall = 0 + space;
const rightWall = canvas.width - space;
const topWall = 0 + space;
const bottomWall = canvas.height - space;
const radius = config.ball.radius;

class Player {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.size = config.player.size;
    this.dx = 0;
    this.dy = 0;
  }
  draw() {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
  update() {
    if (this.x === 0 || this.x === rightWall || this.y === 0 || this.y === bottomWall) //change this to if the player is on the color green (this.x - 0.1) is on green and this.y - 0.1 is on green and this.x + this.size + 0,1 and this.y + this.size + 0,1 is on green
    {
      lastKey = false;
      this.dx = 0;
      this.dy = 0;
    }
    if (keyState["ArrowLeft"] && this.x !== 0) {
      if (lastKey === "ArrowRight" && this.x > 0 && this.x < rightWall && this.y > 0 && this.y < bottomWall)
        this.dx = 0;
      else
        this.dx = -config.player.speed;
      this.dy = 0;
    }
    if (keyState["ArrowRight"] && this.x !== rightWall) {
      if (lastKey === "ArrowLeft" && this.x > 0 && this.x < rightWall && this.y > 0 && this.y < bottomWall)
        this.dx = 0;
      else
        this.dx = config.player.speed;
      this.dy = 0;
    }
    if (keyState["ArrowUp"] && this.y !== 0) {
      this.dx = 0;
      if (lastKey === "ArrowDown" && this.x > 0 && this.x < rightWall && this.y > 0 && this.y < bottomWall)
        this.dy = 0;
      else
        this.dy = -config.player.speed;
    }
    if (keyState["ArrowDown"] && this.y !== bottomWall) {
      this.dx = 0;
      if (lastKey === "ArrowUp" && this.x > 0 && this.x < rightWall && this.y > 0 && this.y < bottomWall)
        this.dy = 0;
      else
        this.dy = config.player.speed;
    }
    this.x += this.dx;
    this.y += this.dy;
  }
}

class Ball {
  initDirection() {
    if (Math.random() > 0.5) {
      this.dx = config.ball.speed;
    } else {
      this.dx = -config.ball.speed;
    }
    if (Math.random() > 0.5) {
      this.dy = config.ball.speed;
    } else {
      this.dy = -config.ball.speed;
    }
  }

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = config.ball.radius;
    this.color = config.ball.color;
    this.initDirection();
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    if (this.x + this.radius >= rightWall || this.x - this.radius <= leftWall)
      this.dx *= -1;
    if (this.y + this.radius >= bottomWall || this.y - this.radius <= topWall)
      this.dy *= -1;
    this.x += this.dx;
    this.y += this.dy;
  }
}


function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  ctx.strokeStyle = 'red';
  ctx.strokeRect(space, space, canvas.width - 2 * space, canvas.height - 2 * space);

  player1.draw();
  player1.update();

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
  }
}

var player1 = new Player;

var balls = [];

for (let i = 0; i < config.ball.amount; i++) {
  const x = Math.random() * (rightWall - (space + radius) * 2) + space + radius;
  const y = Math.random() * (bottomWall - (space + radius) * 2) + space + radius;
  balls.push(new Ball(x, y));
}

animate();
