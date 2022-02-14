/**
 * CS559 Spring 2021 Example Solution
 * Written by CS559 course staff
 */

// @ts-check

// Begin Example Solution
// Helper functions
// Get the x-coordinate and y-coordinate relevant to the canvas' top left corner for mouse events
/**
 * Get the y-coordinate relevant to the canvas' top left corner for mouse events
 * @param {MouseEvent} event The mouse event
 */
function getX(event) { return event.clientX - /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect().left; }
/**
 * Get the y-coordinate relevant to the canvas' top left corner for mouse events
 * @param {MouseEvent} event The mouse event
 */
function getY(event) { return event.clientY - /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect().top; }
/**
 * Fill a circle specified by its center (x, y), its radius r, and its color c
 * @param {CanvasRenderingContext2D} ctx The context 
 * @param {object} cir The circle
 */
function drawCircle(ctx, cir) {
    ctx.fillStyle = cir.c;
    ctx.beginPath();
    ctx.arc(cir.x, cir.y, cir.r, 0, 2 * Math.PI); // CS559 Example Code
    ctx.closePath();
    ctx.fill();
}
/** @type {HTMLCanvasElement} */ const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("box1canvas"));
/** @type {CanvasRenderingContext2D} */ const context = canvas.getContext('2d');
/** @type {number} */ const circleSize = 10; // Set the radius of the circles
/** @type {string[]} */ const color1 = ["green", "red"]; // Set the original colors
/** @type {string[]} */ const color2 = ["yellow", "orange"]; // Set the mouse-over colors
/**
 * Get the list of circles that are under the mouse position
 * @param {number} x The x coordinate of the mouse
 * @param {number} y The y coordinate of the mouse
 */
function getSelected(x, y) {
    // Note that it is done by filtering the list for circles whose center is within "circleSize" length of the mouse position
    return circles.filter(cir => (cir.x - x) * (cir.x - x) + (cir.y - y) * (cir.y - y) <= circleSize * circleSize); 
}
/**
 * The function to handle the click event
 * @param {MouseEvent} event The mouse event
 */
function click(event) {
    /** @type {number} */ const x = getX(event); // Get the mouse position
    /** @type {number} */ const y = getY(event);
    /** @type {object[]} */ let selected = getSelected(x, y); // Get the list of circles under the mouse
    // When there are no circles under the mouse click
    if (selected.length == 0) {
        // Add a new circle with color 1 because it is under the mouse
        // Use index i to keep track of which sets of colors the circle has
        circles.push({ x: x, y: y, r: circleSize, c: color1[0], i: 0 });
    }
    // Where there are circles under the mouse click
    else {
        // Increment the index of each circle under the mouse click
        selected.forEach(cir => cir.i = (cir.i + 1) % color1.length);
        // Change the color of these circles based on the new index;
        selected.forEach(cir => cir.c = color1[cir.i]);
    }
    // Clear the canvas and redraw all the circles
    context.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(cir => drawCircle(context, cir));
}
/**
 * The function to handle the mouse-over event
 * @param {MouseEvent} event The mouse event
 */
function over(event) {
    /** @type {number} */ const x = getX(event); // Get the mouse position
    /** @type {number} */ const y = getY(event);
    /** @type {object[]} */ let selected = getSelected(x, y); // Get the list of circles under the mouse
    // Change the colors of all the circles back to color 1
    circles.forEach(cir => cir.c = color1[cir.i]);
    // Change the colors of all the selected circles to color 2
    selected.forEach(cir => cir.c = color2[cir.i]);
    // Clear the canvas and redraw all the circles
    context.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(cir => drawCircle(context, cir));
}
/** @type {object[]} */ const circles = []; // Initialize the list of circles and assign the click event
canvas.onclick = event => click(event);
canvas.onmousemove = event => over(event);
// End Example Solution