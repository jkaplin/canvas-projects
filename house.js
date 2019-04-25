const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

let centerX = canvas.width / 2;
let centerY = canvas.height / 2;
let houseH = 100;
let houseW = 100;

ctx.fillRect(centerX - houseW / 2, centerY - houseH / 2, houseW, houseH);
ctx.beginPath();
ctx.moveTo(centerX - houseW / 2, centerY - houseH / 2);
ctx.lineTo(centerX + houseW / 2, centerY - houseH / 2);
ctx.lineTo(centerX, centerY - houseH);
ctx.fill();
ctx.fillStyle = 'rgba(255, 0, 0)';
ctx.fillRect(centerX - houseW / 8, centerY, houseW / 4, houseH / 2);
ctx.fillRect(centerX + houseW / 4, centerY - houseH / 4, houseW / 8, houseH / 8);
