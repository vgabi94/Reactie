var t1 = null;
var t2 = null;
var pressed = false;

function computeTimeDiff() {
	if (pressed) {
		location.reload();
		return;
	}
	t2 = new Date();
	if (t1 == null) {
		$("#console").html("Oops! Ai apăsat prea devreme!");
		pressed = true;
		return;
	}
	var diff = t2 - t1;
	$("#console").html("Timp de reacție: " + diff + " ms");
	pressed = true;
}

function drawSquare(ctx, posX, posY, size, filled, color) {
	ctx.clearRect(posX, posY, size, size);

	if (color != null)
		ctx.fillStyle = color;
	
	if (filled == true) {
		ctx.fillRect(posX, posY, size, size);
	}
	else {
		ctx.strokeRect(posX, posY, size, size);	
	}
}

function getRandomBetween(a, b) {
	return Math.floor((Math.random() * b) + a);
}

function main() {
	var colors = ["red", "cyan", "blue", "magenta", "green", "orange", "orangered", "deeppink", "purple", "teal", "turquoise", "yellow", "gold", "royalblue", "navy", "lavender", "gray"];
	var canvas = document.getElementById("screen");
	var ctx = canvas.getContext("2d");

	/*x = canvas.width / 3;
	size = canvas.width / 3;
	y = canvas.height / 2 - size / 2;*/
	x = (canvas.width - canvas.height) / 2;
	y = 0;
	size = canvas.height;
	drawSquare(ctx, x, y, size, false, null);
	
	timeout = getRandomBetween(2000, 5001);
	color = colors[getRandomBetween(0, colors.length)];
	setTimeout(function(){ drawSquare(ctx, x, y, size, true, color); t1 = new Date(); }, timeout);
}

$(document).ready(main);