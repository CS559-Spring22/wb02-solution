/**
 * CS559 Spring 2021 Example Solution
 * Written by CS559 course staff
 */

// @ts-check

// Begin Example Solution
// Mike's Fireworks
function version0() {
    /**
     * given a mouse event, return the x,y position in the canvas
     * (assumes the event is for a canvas)
     * note: we need to figure out where the canvas is
     * @param {MouseEvent} event 
     */
    function eventToClick(event) {
        // what element if the event on?
        let box = /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect();
        let x = event.clientX - box.left;
        let y = event.clientY - box.top;
        return [x, y];
    }
    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("box2canvas0"));
    let context = canvas.getContext('2d');
    /** @type {Array[object]} */
    let circles = [];
    /** @type {Array[object]} */
    let squares = [];
    canvas.onclick = function (evt) {
        let [x, y] = eventToClick(evt);
        circles.push({ "x": x, "y": canvas.height, "tx": x, "ty": y, "vx": 0, "vy": -8 });
    };
    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        // update the positions
        squares.forEach(function (s) {
            s.x += s.vx;
            s.y += s.vy;
            s.life -= 1;
        });
        // kill dead particles
        squares = squares.filter(s => s.life > 0);
        circles.forEach(function (c) {
            c.x += c.vx;
            c.y += c.vy;
            // see if the circle got to its destination (or past it!)
            if (c.y <= c.ty) {
                c.kill = true;
                // Make some squares
                let nsquares = 10 + Math.round(10 * Math.random());
                for (let i = 0; i < nsquares; i++) {
                    squares.push({
                        "x": c.tx, "y": c.ty,
                        "vx": (Math.random() - 0.5) * 16, "vy": (Math.random() - 0.5) * 16,
                        "life": 20 + Math.round(20 * Math.random())
                    });
                }
            }
        });
        circles = circles.filter(c => !c.kill);
        context.fillStyle = "black";
        circles.forEach(function (c) {
            context.beginPath();
            context.arc(c.x, c.y, 10, 0, Math.PI * 2);
            context.fill();
        });
        context.fillStyle = "red";
        squares.forEach(function (c) {
            context.fillRect(c.x - 3, c.y - 3, 6, 6);
        });
        window.requestAnimationFrame(draw);
    }
    draw();
}
// Young's Fireworks
function version1() {
    /** @type {string[]} */ const rainbow = ["red", "green", "yellow", "blue", "orange", "purple", "cyan"]; // Set the list of colors to randomize over
    /**
     * Get the y-coordinate relevant to the canvas' top left corner for mouse events
     * @param {MouseEvent} event The mouse event
     */
    function getX(event) { 
        return event.clientX - /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect().left;
    }
    /**
     * Get the y-coordinate relevant to the canvas' top left corner for mouse events
     * @param {MouseEvent} event The mouse event
     */
    function getY(event) {
        return event.clientY - /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect().top;
    }
    /**
     * Get a random number between a and b
     * @param {number} a The min 
     * @param {number} b The max
     */
    function rand(a, b) {
        return Math.random() * (b - a) + a;
    }
    /**
     * Get a random integer between a and b
     * @param {number} a The min 
     * @param {number} b The max
     */
    function randInt(a, b) {
        return Math.floor(rand(a, b + 1));
    }
    /**
     * Fill a square specified by its center (x, y), its radius (half side length) r, and its color c
     * @param {CanvasRenderingContext2D} ctx The context
     * @param {object} sqr The square 
     */
    function drawSquare(ctx, sqr) {
        ctx.fillStyle = sqr.c;
        ctx.fillRect(sqr.x - sqr.r, sqr.y - sqr.r, 2 * sqr.r, 2 * sqr.r); // CS559 Example Code
    }
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
    /** @type {HTMLCanvasElement} */ const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("box2canvas1"));
    /** @type {CanvasRenderingContext2D} */ const context = canvas.getContext('2d');
    /** @type {number} */ const circleSize = 5; // Set the circle (and square) size
    /** @type {number} */ const sizeChange = 0.1; // Set the square size change
    /** @type {number} */ const timeToExplode = 20; // Set the number of frames until the circle explodes
    /** @type {number} */ const minExplosion = 10; // Set the minimum number of squares generated by an explosion
    /** @type {number} */ const maxExplosion = 20; // Set the maximum number of squares generated by an explosion
    /** @type {number} */ const maxInitialSpeed = 10; // Set the maximum initial speed of the squares
    /** @type {number} */ const gravity = 0.5; // Set the acceleration in the y direction
    /** @type {number} */ const randomCircleProb = 0.01; // Set the probability of random fireworks
    /**
     * Create a square object at location (x, y) with color c and initial velocity (vx, vy)
     * @param {number} x The x coordinate of the center 
     * @param {number} y The y coordinate of the center 
     * @param {string} c The color
     * @param {number} vx The x velocity
     * @param {number} vy The y velocity
     */
    function genSquare(x, y, c, vx, vy) {
        return { x: x, y: y, r: circleSize, c: c, vx: vx, vy: vy };
    }
    /**
     * Create a circle object at location (x, 0) with target location (tx, ty)
     * @param {number} x The x coordinate of the center 
     * @param {number} tx The target x coordinate
     * @param {number} ty The target y coordinate
     */
    function genCircle(x, tx, ty) {
        // Select a random color and compute the speed based on the time to explosion
        return { x: x, y: canvas.height, r: circleSize, c: rainbow[randInt(0, rainbow.length - 1)], vx: ((tx - x) / timeToExplode), vy: ((canvas.height - ty) / timeToExplode), tx: tx, ty: ty };
    }
    /**
     * Find square location in the next frame given its current location, velocity and acceleration
     * @param {object} sqr The square
     */
    function nextSquare(sqr) {
        // Update the center by the velocity
        sqr.x += sqr.vx;
        sqr.y -= sqr.vy;
        // Update the velocity by the acceleration due to gravity
        sqr.vy -= gravity;
        // Update the square size for fading
        sqr.r = Math.max(sqr.r - sizeChange, 0);
    }
    /**
     * Find circle location in the next frame given its current location, velocity and acceleration
     * @param {object} cir The square
     */
    function nextCircle(cir) {
        // Update the center by the velocity
        cir.x += cir.vx;
        cir.y -= cir.vy;
        // If the circle reaches its target height, create a random number of square with the same location and color as the circle
        if (cir.y < cir.ty) {
            for (let i = 0; i < randInt(minExplosion, maxExplosion); i++) squares.push(genSquare(cir.tx, cir.ty, cir.c, rand(-maxInitialSpeed, maxInitialSpeed), rand(-maxInitialSpeed, maxInitialSpeed)));
        }
    }
    /** @type {object[]} */ let circles = []; // Initialize the list of circles
    /** @type {object[]} */ let squares = []; // Initialize the list of squares
    // Push a new circle with a random initial location when there is a mouse click
    canvas.onclick = event => circles.push(genCircle(rand(0, canvas.width), getX(event), getY(event)));
    /**
     * The animation function
     */
    function animate() {
        // With probability "randomCircleProb", push a new circle with a random initial and target location
        if (rand(0, 1) < randomCircleProb) circles.push(genCircle(rand(0, canvas.width), rand(0, canvas.width), rand(0, canvas.height)));
        // Move the squares and the circles for the next frame
        squares.forEach(sqr => nextSquare(sqr));
        circles.forEach(cir => nextCircle(cir));
        // Remove the squares that fall below the ground
        squares = squares.filter(sqr => sqr.y < canvas.height + sqr.r);
        // Remove the circles that exploded (above their target height)
        circles = circles.filter(cir => cir.y >= cir.ty);
        // Clear the canvas and draw the squares and the circles
        context.clearRect(0, 0, canvas.width, canvas.height);
        squares.forEach(sqr => drawSquare(context, sqr));
        circles.forEach(cir => drawCircle(context, cir));
        window.requestAnimationFrame(animate);
    }
    animate();
}
// Gia-Phong's Version
function version2() {
    // settings for when firework is rising to explosion point
    const risingFWSize = 10;
    const risingParticlesPerTick = 2;
    const risingParticleFadeSpeed = 5;
    const risingParticleSize = 6;
    const risingParticleColor = [255,255,255];

    // settings for when firework explodes
    const numberOfExplosionParticles = 80;
    const explodingParticleSize = 8;
    const explodingParticleFadeSpeed = 3;
    const explodingParticleMinSpeed = 0;
    const explodingParticleMaxSpeed = 4;
    const explosionTrailSize = 3;

    // gravity constant applied to both rising fireworks and explosion particles
    const gravity = 0.12;

    let ticksTillNextFirework = Math.random()*100+50; // delay until next random firework from ground

    /** @type {HTMLCanvasElement} */
    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("box2canvas2"));
    let context = canvas.getContext('2d');

    let fireworks = []; // array of fireworks

    // function to create firework
    // (x,y) - position of where firework with explode
    let createFirework = (x, y) => {
        let startX = Math.random()*(canvas.width-20); // firework starts at random position on ground

        // calculates the initial velocity Y and velocity X for the firework to meet the end position from the start X with respect to gravity
        let dY = canvas.height-y+40;
        let vy = Math.sqrt(2*gravity*dY);
        let time = vy/gravity;
        let vx = (x-risingFWSize/2-startX)/time;
        fireworks.push({
            "mode": 0,
            "x": startX,
            "y": canvas.height+30,
            "vx": vx,
            "vy": vy,
            "goalY": y-risingFWSize,
            "curT": 0,
            "endT": time, // the time it takes to reach the point of explosion
            "trailParticles": [], // trail particles from when the fireworks are rising
            "explosionParticles": [], // particles the create the explosion
            "color": [Math.ceil(Math.random()*200)+30, Math.ceil(Math.random()*200)+30, Math.ceil(Math.random()*200)+30], // picks random color for firework
            "tick": 0 // when ticks count up to a specific amount before restarting. When tick reaches 0 again, create a explosion trail particle
        })
    }

    // creates a firework on mouse down
    canvas.onclick = (event) => {
        let box = /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect();
        let mouseX = event.clientX - box.left;
        let mouseY = event.clientY - box.top;
        createFirework(mouseX, mouseY);
    }

    // function for animating all the fireworks
    let animateFireworks = () => {
        context.clearRect(0,0,canvas.width, canvas.height);
        context.fillStyle = "black";
        context.fillRect(0,0,canvas.width, canvas.height);
        fireworks.forEach((firework) => {
            // function to explode the firework
            let explode = () => {
                for(let i=0; i<numberOfExplosionParticles; i++) {
                    let vel = ((Math.random()*(explodingParticleMaxSpeed-explodingParticleMinSpeed))+explodingParticleMinSpeed)*((Math.floor(Math.random()*2))*2-1);
                    let angle = Math.random()*Math.PI;
                    firework.explosionParticles.push({
                        "x": firework.x-risingParticleSize/2+risingFWSize/2,
                        "y": firework.y-risingParticleSize/2+risingFWSize/2,
                        "vx": vel * Math.cos(angle),
                        "vy": vel * Math.sin(angle),
                        "opacity": Math.round((Math.random()*150)+100),
                        "explosionTrails": [] // explosion particles leave behind a trail of smaller particles that fade away with the explosion particle
                    });
                }
            }
            // function for creating trail particles on a rising firework
            let addTrailParticles = () => {
                for(let i=0; i<risingParticlesPerTick; i++) {
                    firework.trailParticles.push({
                        "x": firework.x-risingParticleSize/2+risingFWSize/2,
                        "y": firework.y-risingParticleSize/2+risingFWSize/2,
                        "vx": Math.random()*2-1,
                        "vy": Math.random()*4-2,
                        "opacity": Math.round((Math.random()*150)+100)
                    });
                }
            }
            // function that updates firework trail particles when firework is rising
            let updateTrailParticles = () => {
                firework.trailParticles.forEach(particle => {
                    // updates trail particles
                    particle.opacity -= risingParticleFadeSpeed; // lowers opacity of trail particles per tick
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    // draw trail particles
                    context.fillStyle = "#" + (risingParticleColor[0]).toString(16) + 
                    (risingParticleColor[1]).toString(16) + 
                    (risingParticleColor[2].toString(16)) + 
                    (particle.opacity).toString(16);
                    context.fillRect(particle.x,particle.y,risingParticleSize,risingParticleSize)
                })

                // firework trail particles are removed when their opacity is too low
                firework.trailParticles = firework.trailParticles.filter(particle => particle.opacity > risingParticleFadeSpeed+16);
            }

            // updates all explosion particles (including explosion trail particles)
            let updateExplosionParticles = () => {
                firework.explosionParticles.forEach(particle => {
                    // lowers the opacity of the particle until it is 0
                    particle.opacity = (particle.opacity > explodingParticleFadeSpeed) ? particle.opacity-explodingParticleFadeSpeed : 0;
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    particle.vy += gravity; // gravity impacts the velocity of the explosion particles
                
                    // adds a stationary explosion trail particle ontop of the explosion particle
                    if(particle.opacity>0 && firework.tick === 0) {
                        particle.explosionTrails.push({
                            "x": particle.x+explodingParticleSize/2-explosionTrailSize/2,
                            "y": particle.y+explodingParticleSize/2-explosionTrailSize/2
                        });
                    }
                    // draws the firework explosion trail particles
                    particle.explosionTrails.forEach(miniParticle => {
                        context.fillStyle = "#" + (firework.color[0]).toString(16) + (firework.color[1]).toString(16) + (firework.color[2]).toString(16) + 
                        ((particle.opacity).toString(16).length>1 ? (particle.opacity).toString(16) : "0"+(particle.opacity).toString(16));
                        context.fillRect(miniParticle.x, miniParticle.y, explosionTrailSize, explosionTrailSize);
                    });
                    // draws a white square beneath each explosion particle to help brighten them up
                    let whiteHighlightSize = 2;
                    context.fillStyle = "#FFFFFF" + (particle.opacity).toString(16);
                    context.fillRect(particle.x-whiteHighlightSize,particle.y-whiteHighlightSize,explodingParticleSize+whiteHighlightSize*2,explodingParticleSize+whiteHighlightSize*2)
                    // draws the firework explosion particle
                    context.fillStyle = "#" + (firework.color[0]).toString(16) + 
                    (firework.color[1]).toString(16) + 
                    (firework.color[2].toString(16)) + 
                    ((particle.opacity).toString(16).length>1 ? (particle.opacity).toString(16) : "0"+(particle.opacity).toString(16));
                    context.fillRect(particle.x,particle.y,explodingParticleSize,explodingParticleSize);
                })
            }
            // updates firework mode and sets them to explode once it reaches its point
            if(firework.curT >= firework.endT && firework.mode === 0) { // reaches its point at the determined time
                firework.mode = 1;
                explode();
            }
            // updates the fireworks position
            let moveFirework = () => {
                firework.y -= firework.vy;
                firework.x += firework.vx;
                firework.vy -= gravity; // gravity effects movement
                firework.curT++;
            }
            // updates the tick count for the fireworks
            firework.tick = (firework.tick+1) % 2;
            updateTrailParticles();
            if(firework.mode===0) { // during rising firework mode
                addTrailParticles();
                moveFirework();
                context.beginPath();
                context.arc(firework.x+risingFWSize/2, firework.y+risingFWSize/2, risingFWSize/2, 0, Math.PI * 2);
                styleAndDraw("#" + (firework.color[0]+25).toString(16) + (firework.color[1]+25).toString(16) + (firework.color[2]+25).toString(16), "#FFFFFF", 2)
            } else { // creates explosion and starts animating exploding
                updateExplosionParticles();
            }
        })

        // only keeps fireworks that have any kind of particle still available
        fireworks = fireworks.filter(firework => (firework.explosionParticles.some(particle => particle.opacity>0) || firework.trailParticles.length>0));
        
        // counts until time to create new random firework
        ticksTillNextFirework--;
        if(ticksTillNextFirework<=0) {
            createFirework(Math.random()*(canvas.width-80)+40, Math.random()*300 + 20);
            ticksTillNextFirework = Math.random()*100+50; // determines next time to create random firework
        }

        window.requestAnimationFrame(animateFireworks);
    }

    // helper function for setting the fill and stroke and drawing
    let styleAndDraw = (fillColor, strokeColor, strokeThickness) => {
        context.fillStyle = fillColor;
        context.fill();
        context.strokeStyle = strokeColor;
        context.lineWidth = strokeThickness;
        context.stroke();
    }

    animateFireworks(); 
}
version0();
version1();
version2();
// End Example Solution