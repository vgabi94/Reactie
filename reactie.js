/* Copyright 2015 Gabriel Eugen Vaduva

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var t1;
var t2;
var pressed;
var colors = ["red", "cyan", "blue", "magenta", "green", "orange", "orangered", "deeppink", "purple", "teal", "turquoise", "yellow", "gold", "royalblue", "navy", "gray"];
var times = [];
var canvas = document.getElementById("screen");
var ctx = canvas.getContext("2d");
var x = 0;
var y = 0;
var sizeX = canvas.width;
var sizeY = canvas.height;
var task = null;
var minTime = 100000;
var maxTime = 0;

function computeAverage() {
	var sum = 0.0;
	for (var i = 0; i < times.length; i++) {
		sum += times[i];
	}
	return sum / times.length;
}

function computeTimeDiff() {
	if (pressed) {
		init();
		return;
	}
	t2 = new Date();
	if (t1 == null) {
		$("#console").html("Oops! Ai apăsat prea devreme!");
		pressed = true;
		clearTimeout(task);
		return;
	}
	var diff = t2 - t1;
	$("#console").html("Timp de reacție: " + diff + " ms");
	$("#history").append("<li>" + diff + "</li>");
	times.push(diff);
	if (diff < minTime) minTime = diff;
	if (diff > maxTime) maxTime = diff;
	var avg = computeAverage();
	$("#medie").html("Medie " + avg.toFixed(2) + " ms");
	$("#best").html("Cel mai bun timp: " + minTime + " ms");
	$("#worst").html("Cel mai prost timp: " + maxTime + " ms"); 
	pressed = true;
}

function drawSquare(ctx, posX, posY, sizeX, sizeY, filled, color) {
	ctx.clearRect(posX, posY, sizeX, sizeY);

	if (color != null)
		ctx.fillStyle = color;
	
	if (filled == true) {
		ctx.fillRect(posX, posY, sizeX, sizeY);
	}
	else {
		ctx.strokeRect(posX, posY, sizeX, sizeY);	
	}
}

function getRandomBetween(a, b) {
	return Math.floor((Math.random() * b) + a);
}

function init() {
	$("#console").empty();
	t1 = null;
	t2 = null;
	pressed = false;
	makeDraw = true;
	drawSquare(ctx, x, y, sizeX, sizeY, false, null);
	timeout = getRandomBetween(2000, 3001);
	color = colors[getRandomBetween(0, colors.length)];
	task = setTimeout(function(){ 
		drawSquare(ctx, x, y, sizeX, sizeY, true, color); 
		t1 = new Date();
	}, timeout);
}

$(document).ready(init);