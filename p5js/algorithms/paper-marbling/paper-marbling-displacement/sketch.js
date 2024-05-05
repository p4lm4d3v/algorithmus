// ARRAY THAT HOLDS ALL OF THE DROPS
let drops = [];
// THE START POSITION (VECTOR) OF THE TINE LINE
let start;
// THE END POSITION (VECTOR) OF THE TINE LINE
let end;

// RUNS ONLY ONCE AT THE START OF THE PROGRAM
function setup() {
  // INIT A CANVAS OF THE MAX VIEWPORT SIZE
  createCanvas(innerWidth, innerHeight);
}

// APPLY A TINE LINE OF THE GIVEN VECTOR m TO ALL DROPS
function tineLine(m, x, y, z, c) {
  for (let drop of drops) {
    drop.tine(m, x, y, z, c);
  }
}

// APPLY A VERTICAL TINE LINE AT THE X POSITION OF THE MOUSE
function tineLineX(z, c) {
  for (let drop of drops) {
    drop.tineX(mouseX, z, c);
  }
}

// APPLY A HORIZONTAL TINE LINE AT THE Y POSITION OF THE MOUSE
function tineLineY(z, c) {
  for (let drop of drops) {
    drop.tineY(mouseY, z, c);
  }
}

// ADD A DROP OF PAINT TO THE SCREEN
function addInk(x, y, r) {
  let drop = new Drop(x, y, r);
  for (let other of drops) {
    other.marble(drop);
  }
  drops.push(drop);
}

// RUNS WHEN THE MOUSE IS PRESSED
function mousePressed() {
  // CREATE A STARTING POSITION FOR
  // THE DIRECTION LINE OF THE TINE LINE
  start = createVector(mouseX, mouseY);
}

// RUNS WHEN YOU RELEASE THE MOUSE (STOP HOLDING IT)
function mouseReleased() {
  // CREATE A ENDING POSITION FOR
  // THE DIRECTION LINE OF THE TINE LINE
  let end = createVector(mouseX, mouseY);
  // TURN THE END VECTOR INTO THE DIRECTION LINE REPRESENTAITON
  end.sub(start);
  // NORMALIZE IT SO IT'S ONLY A DIRECTION WITHOUT THE MAGNITUDE
  end.normalize();
  // APPLY THE TINE LINE WITH THE GIVEN DIRECTION
  // ON THE X POSITION OF THE MOUSE & THE Y POSITION OF THE MOUSE
  // WITH z = 80 & c = 16
  tineLine(end, mouseX, mouseY, 80, 16);
}

// RUNS WHEN A KEYBOARD KEY IS PRESSED
function keyPressed() {
  console.log("kita");
  if (key === "n") {
    addInk(mouseX, mouseY, random(10, 50));
  }
}

// RUNS EVERY FRAME
function draw() {
  // DRAW A GRAYISH BACKGROUND
  background(150);
  // DRAW ALL THE DROPS
  for (let drop of drops) {
    drop.show();
  }
}
