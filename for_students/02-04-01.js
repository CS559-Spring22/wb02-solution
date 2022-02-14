/**
 * CS559 Spring 2021 Example Solution
 * Written by CS559 course staff
 */

// JavaScript file to be filled in by the student for Box 4-1
// we'll give you something to get started...

// you don't need to do the window.onload thing because we used defer in the html

// you should start by getting the canvas

// then draw the 4 shapes

// Begin Example Solution
/** @type {HTMLCanvasElement} */ const canvas = (/** @type {HTMLCanvasElement} */ document.getElementById("canvas1"));
/** @type {CanvasRenderingContext2D} */ const context = canvas.getContext('2d');
// Draw the circle
// <circle cx="50" cy="50" r="25" style="width:3; fill: #F8E; stroke:#846; stroke-width:5"></circle>
context.fillStyle = "#F8E";
context.strokeStyle = "#846";
context.lineWidth = 5;
context.beginPath();
// The arguments are x-coordinate of the center, y-coordinate of the center, radius, starting angle, ending angle
context.arc(50, 50, 25, 0, 2 * Math.PI);
// Always remember to close the path then fill and stroke
context.closePath();
context.fill();
context.stroke();
// Draw the triangle
// <polygon points="25,150, 75,150, 50,110" style="stroke-width:5; fill:sandybrown; stroke:darkgoldenrod" />
context.fillStyle = "sandybrown";
context.strokeStyle = "darkgoldenrod";
context.lineWidth = 5;
context.beginPath();
context.moveTo(25, 150); // CS559 Example Code
context.lineTo(75, 150);
context.lineTo(50, 110);
// Always remember to close the path then fill and stroke
context.closePath();
context.fill();
context.stroke();
// Draw the rounded rectangle (use arc)
// <path d="M 125 25 L 175 25 A 25 25 0 0 1 175 75 L 125 75 A 25 25 0 0 1 125 25 Z" style="stroke:darkred; stroke-width: 5; fill:lightpink" />
context.fillStyle = "lightpink";
context.strokeStyle = "darkred";
context.lineWidth = 5;
context.beginPath();
context.moveTo(125, 25); // CS559 Example Code
context.lineTo(175, 25);
// The arguments are x-coordinate of the center, y-coordinate of the center, radius, starting angle, ending angle
context.arc(175, 50, 25, 1.5 * Math.PI, 0.5 * Math.PI);
context.lineTo(175, 75);
context.lineTo(125, 75);
// The arguments are x-coordinate of the center, y-coordinate of the center, radius, starting angle, ending angle
context.arc(125, 50, 25, 0.5 * Math.PI, 1.5 * Math.PI);
// Always remember to close the path then fill and stroke
context.closePath();
context.fill();
context.stroke();
// Draw the sawtooth
// <path d="M 100 150 L 200 150 L 200 125 L 175 100 L 150 125 L 125 100 L 100 125 Z" style="stroke:black; fill:gray; stroke-width:5" />
context.fillStyle = "gray";
context.strokeStyle = "black";
context.lineWidth = 5;
context.beginPath();
context.moveTo(100, 150); // CS559 Example Code
context.lineTo(200, 150);
context.lineTo(200, 125);
context.lineTo(175, 100);
context.lineTo(150, 125);
context.lineTo(120, 100);
context.lineTo(100, 125)
// Always remember to close the path then fill and stroke
context.closePath();
context.fill();
context.stroke();
// End Example Solution