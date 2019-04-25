const LeftArrow = 37, RightArrow = 39, UpArrow = 38,  DownArrow = 40;

const config = {
	canvas: {
		width: 800,
		height: 400
	},
	paddle: {
		length: 100,
		width: 5,
		wallDistance: 10,
		speed: 1
	},
	ball: {
		radius: 2,
		color: 'white',
		speed: 1
	}
}

var canvas, ctx, keyState, originX;

var player1, player2, player3, player4, ball;

function onPaddle(x, y, player) {
	if ((x >= player.x) && (x <= player.x + player.width) && (y >= player.y) && (y <= player.y + player.height))
		return true;
	else
		return false;
}

function onAnyPaddle(x, y) {
	if (onPaddle(x, y, player1) || onPaddle(x, y, player2) || onPaddle(x, y, player3) || onPaddle(x, y, player4))
		return true;
	else
		return false;
}

class Paddle {
	constructor(x, y, width, height, direction, speed, color) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.direction = direction;
		this.speed = speed;
		this.color = color;
	}

	draw() {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

class Player extends Paddle {
	update() {
		if (keyState[LeftArrow])
			this.x -= this.speed;
		if (keyState[RightArrow])
			this.x += this.speed;
		if (keyState[UpArrow])
			this.y -= this.speed;
		if (keyState[DownArrow])
			this.y += this.speed;
	}
}

class AI extends Paddle {
	update() {
		if (this.direction === 'x')
			this.x = ball.x - (this.width / 2);
		else
			this.y = ball.y - (this.height / 2);
	}
}

class Ball {
	constructor(x, y, radius, speed, color) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.speed = speed;
		this.color = color;
		this.moveX = 1;
		this.moveY = 1;
	}

	draw() {
		ctx.fillStyle = this.color;
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fill();
	}

	update() {
		if (this.y <= 0 || this.y >= canvas.height || onPaddle(this.x, this.y, player1) || onPaddle(this.x, this.y, player2))
		{
			this.moveY *= -1;
		}
		if (this.x <= originX || this.x >= originX + canvas.height || onPaddle(this.x, this.y, player3) || onPaddle(this.x, this.y, player4))
		{
			this.moveX *= -1;
		}
		this.x += this.moveX * this.speed;
		this.y += this.moveY * this.speed;
	}
}

function middle(start, total, size)
{
	return (start + (total - size) / 2);
}

function totalCenter(total, size) {
	return middle(0, total, size);
}


function main() {
	canvas = document.createElement("canvas");
	canvas.width = config.canvas.width;
	canvas.height = config.canvas.height;
	ctx = canvas.getContext("2d");
	document.body.appendChild(canvas);

	keyState = {};
	document.addEventListener("keydown", function(event) {
		keyState[event.keyCode] = true;
	});
	document.addEventListener("keyup", function(event) {
		delete keyState[event.keyCode];
	});

	init();

	var loop = function() {
		update();
		draw();

		window.requestAnimationFrame(loop, canvas);
	};
	window.requestAnimationFrame(loop, canvas);
}

function init(playerNum) {
	originX = totalCenter(canvas.width, canvas.height);

	player1 = new Player(
		totalCenter(canvas.width, config.paddle.length),
		canvas.height - config.paddle.wallDistance - config.paddle.width,
		config.paddle.length,
		config.paddle.width,
		'x',
		config.paddle.speed,
		'green'
	);
	player2 = new AI(
		totalCenter(canvas.width, config.paddle.length),
		config.paddle.wallDistance,
		config.paddle.length,
		config.paddle.width,
		'x',
		config.paddle.speed,
		'red'
	);
	player3 = new AI(
		originX + config.paddle.wallDistance,
		totalCenter(canvas.height, config.paddle.length),
		config.paddle.width,
		config.paddle.length,
		'y',
		config.paddle.speed,
		'blue'
	);
	player4 = new AI(
		canvas.width - originX - config.paddle.wallDistance - config.paddle.width,
		totalCenter(canvas.height, config.paddle.length),
		config.paddle.width,
		config.paddle.length,
		'y',
		config.paddle.speed,
		'yellow'
	);

	ball = new Ball(
		totalCenter(canvas.width, config.ball.radius),
		totalCenter(canvas.height, config.ball.radius),
		config.ball.radius,
		config.ball.speed,
		config.ball.color
	);
}

function draw() {
	ctx.fillStyle = "black";
	ctx.fillRect(originX, 0, canvas.height, canvas.height);

	ctx.save();

	player1.draw();
	player2.draw();
	player3.draw();
	player4.draw();
	ball.draw();

	ctx.restore();
}

function update() {
	player1.update();
	player2.update();
	player3.update();
	player4.update();
	ball.update();
}
