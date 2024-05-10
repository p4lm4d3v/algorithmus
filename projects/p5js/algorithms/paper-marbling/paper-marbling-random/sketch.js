// AN ARRAY TO STORE ALL DROPS OF INK
let drops = [];
// COUNTS EVERY DRAW OF A FRAME
let frames = 0;

// RUNS ONLY ONCE AT THE START OF THE PROGRAM
function setup() {
  // INIT A CANVAS OF THE MAX VIEWPORT SIZE
  createCanvas(innerWidth, innerHeight);
}

// APPLY A TINE LINE TO ALL DROPS OF INK
function tineLine(v, x, y, z, c) {
  for (let drop of drops) {
    drop.tine(v, x, y, z, c);
  }
}

// ADD A DROP OF INK AT THE (x,y) COORDS AND WITH THE RADIUS r
function addInk(x, y, r) {
  let drop = new Drop(x, y, r);
  for (let other of drops) {
    other.marble(drop);
  }
  drops.push(drop);
}

// RUNS EVERY FRAME
function draw() {
  // RUN THIS CODE EVERY 15 FRAMES
  if (frames % 15 == 0) {
    // GENERATE A RANDOM DROP
    let x = random(width);
    let y = random(height);
    let r = random(10, 50);
    addInk(x, y, r);
  }
  // RUNS THIS CODE EVERY 150 FRAMES
  if (frames % 150 == 0) {
    // GENERATE A RANDOM POINTS(VECS)
    // THAT REPRESENT A LINE
    let a = p5.Vector.random2D();
    let b = p5.Vector.random2D();
    b.sub(a);
    b.normalize();
    // RUN A TINE LINE WITH THE GIVEN RANDOM LINE WITH
    // z = 80 & c = 16
    tineLine(b, random(width), random(height), 80, 16);
  }
  // DRAW A GRAYISH BACKGROUND
  background(150);
  // DRAW THE DROPS ON THE SCREEN
  for (let drop of drops) {
    drop.show();
  }
  // UPDATE THE FRAME COUNT
  frames++;
}
