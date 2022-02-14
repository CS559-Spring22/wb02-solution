/**
 * CS559 Spring 2021 Example Solution
 * Written by CS559 course staff
 */

// JavaScript file to be filled in by the student for Box 4-2
// we'll give you something to get started...

// you don't need to do the window.onload thing because we used defer in the html

// you should start by getting the canvas
// then draw whatever you want!

// Begin Example Solution
// The drawing is based on the Avengers symbol: https://upload.wikimedia.org/wikipedia/commons/0/0b/Symbol_from_Marvel%27s_The_Avengers_logo.svg
/** @type {HTMLCanvasElement} */ const canvas = (/** @type {HTMLCanvasElement} */ document.getElementById("canvas1"));
/** @type {CanvasRenderingContext2D} */ const context = canvas.getContext('2d');
// The circle
/** @type {string} */ const aColor = "blue"; // The color of A
/** @type {string} */ const bColor = "white"; // The color of background
context.fillStyle = aColor;
context.beginPath();
context.arc(300, 300, 190, 0, 2 * Math.PI);
context.fill();
context.fillStyle = bColor;
context.beginPath();
context.arc(300, 300, 160, 0, 2 * Math.PI);
context.fill();
// The bottom / part of A
context.fillStyle = aColor;
context.strokeStyle = bColor;
context.lineWidth = 20;
context.beginPath();
context.moveTo(115, 495); // CS559 Example Code
context.lineTo(185, 495);
context.lineTo(236.25, 382.5);
context.lineTo(168.75, 382.5);
context.closePath();
context.stroke();
context.fill();
// The | part of A
context.fillStyle = aColor;
context.fillRect(330, 45, 60, 350);
// The -> part of A
context.strokeStyle = bColor;
context.beginPath();
context.moveTo(273, 300); // CS559 Example Code
context.lineTo(330, 300);
context.lineTo(330, 270);
context.lineTo(400, 330);
context.lineTo(330, 390);
context.lineTo(330, 360);
context.lineTo(245, 360);
context.closePath();
context.stroke();
context.fill();
// The top / part of A
context.fillStyle = aColor;
context.beginPath();
context.moveTo(115, 495); // CS559 Example Code
context.lineTo(185, 495);
context.lineTo(390, 45);
context.lineTo(330, 45);
context.closePath();
context.fill();
// The text
context.fillStyle = "rgb(255, 0, 0, 0.5)";
context.strokeStyle = "rgb(255, 0, 0, 0.5)";
context.lineWidth = 3;
context.font = "50px Arial";
context.strokeText("CS559 Example Code", 0, 250);
context.fillText("CS559 Example Code", 0, 250);
// End Example Solution