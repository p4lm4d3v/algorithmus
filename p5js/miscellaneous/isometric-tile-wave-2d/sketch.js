// **************************
// Toggle booleans for
// button control
// **************************

let isometricViewOn; // if the "isometric view" is turned on/off
let animationOn; // if the tile animation is turned on/off

// **************************
// Isometric & normal tiles sprites
// **************************

let isoTile; // isometric
let normalTile; // normal

// **************************
// HTML Control Elements
// **************************

let menuDiv; // Menu div
let animateBtn; // Turn on/off the animation
let scaleSlider; // Scale slider
let isometricBtn; // Turn on/off "Isometric view"

// **************************
// Built-in p5js functions
// **************************

function preload() {
  isoTile = loadImage("assets/tiles/iso_tile32x32.png"); // Load the iso tile sprite
  normalTile = loadImage("assets/tiles/tile32x32.png"); // Load the normal tile sprite
}

function setup() {
  // Create a canvas with the maximum height
  // and the a little shorter height bc. of the slider
  createCanvas(windowWidth, windowHeight - 50);

  // Set the isometricView to true
  isometricViewOn = true;
  animationOn = true;

  // Set the image mode to CORNER so the
  // images start drawing from the top left corner
  imageMode(CORNER);

  // Disable smoothing so the picture is pixel crisp
  noSmooth();

  menuDiv = createDiv();
  menuDiv.addClass("menu-div");

  // Create a button to toggle the tiles animation
  animateBtn = createButton("Animate");
  animateBtn.addClass("btn-on btn");
  animateBtn.mousePressed(toggleTileAnimation);
  animateBtn.parent(menuDiv);

  // Setup the scaleSlider with the
  // minimum = 1, maximum = 9
  // startValue = 4, stepValue = 0.01
  scaleSlider = createSlider(1, 9, 4, 0.01);
  scaleSlider.addClass("scale-slider");
  scaleSlider.parent(menuDiv);

  // Create a button to toggle the "isometric view"
  isometricBtn = createButton("Isometric");
  isometricBtn.addClass("btn-on btn");
  isometricBtn.mousePressed(enableIsometricView);
  isometricBtn.parent(menuDiv);
}

function draw() {
  // Paint the background with a nice purple
  background(160, 32, 240);

  // Depending of the view state
  // draw the isometricView or the normalView
  isometricViewOn ? drawIsoTileGrid() : drawNormalTileGrid();
}

// **************************
// Other functions
// **************************

function toggleTileAnimation() {
  animationOn = !animationOn;
  if (animationOn) {
    animateBtn.removeClass("btn-off");
    animateBtn.addClass("btn-on");
  } else {
    animateBtn.addClass("btn-off");
    animateBtn.removeClass("btn-on");
  }
}

function enableIsometricView() {
  isometricViewOn = !isometricViewOn;
  if (isometricViewOn) {
    isometricBtn.removeClass("btn-off");
    isometricBtn.addClass("btn-on");
  } else {
    isometricBtn.addClass("btn-off");
    isometricBtn.removeClass("btn-on");
  }
}

function drawIsoTileGrid() {
  // Scale of the tiles
  const scale = scaleSlider.value();

  // Width & height of the tile
  const w = 32 * scale;
  const h = 32 * scale;

  // Number of tiles to the right of the top tile
  const rows = floor(width / w) - 3;
  // Number of tiles to the left of the top tile
  const cols = floor(width / w) - 3;

  // X offset
  const xoff = (width - w) / 2;
  // Number of iso tiles on the main vertical diagonal
  const n = max(rows, cols);
  // Full height of the iso tile grid
  const fullHeight = (n + 1) * 0.5 * h;
  // The "white space" between the iso tile grid and the bottom of the screen
  const white_space = height - fullHeight;

  // Isometric projection matrix
  const isometricProjection = new Matrix2x2([
    [0.5 * w, 0.25 * h],
    [-0.5 * w, 0.25 * h],
  ]);

  // Draw a grid of rows * cols iso tiles
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      // Animation of the tiles
      // with a sin wave
      const dx = 0.25; // diff between the tile x coords
      const dy = -0.25; // diff between the tile y coords
      const df = 0.075; // the speed of the wave
      const amp = 20; // amplitude of the wave
      // The baseline y offset that will be applied
      let yoff = white_space / 2;
      // Increase the y offset by the sin value or by 0
      // depending if the animation(sin wave) should be applied
      yoff += animationOn ? sin(x * dx + y * dy + frameCount * df) * amp : 0;

      // Creating the position vector
      const pos = createVector(x, y);
      // Projecting the coodinates with the isometric matrix
      const isoPos = isometricProjection.mulVec(pos);
      // Adding the offsets to center the position to the screen
      isoPos.add(xoff, yoff);

      // Drawing the image
      image(isoTile, isoPos.x, isoPos.y, w, h);
    }
  }
}

function drawNormalTileGrid() {
  // Scale of the tiles
  const scale = scaleSlider.value();

  // Width & height of the tile
  const w = 32 * scale;
  const h = 32 * scale;

  // Number of tiles to the right of the top tile
  const rows = floor(height / h) - 1;
  // Number of tiles to the left of the top tile
  const cols = floor(height / h) - 1;

  // Y offset
  const xoff = (width - rows * w) / 2;
  // X offset
  const yoff = (height - cols * h) / 2;

  // Draw a grid of rows * cols iso tiles
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      // Animation of the tiles
      // with a sin wave
      const dx = 0.25; // diff between the tile x coords
      const dy = -0.25; // diff between the tile y coords
      const df = 0.075; // the speed of the wave
      // Use the s value of the sin or 1 depending
      // if the animation(sin wave) should be applied
      let s = animationOn ? sin(x * dx + y * dy + frameCount * df) : 1;
      // Scale it from [-1, 1] to [0.5, 1] so it looks better
      s = map(s, -1, 1, 0.5, 1);

      // Creating the position vector
      const pos = createVector(x, y);
      // Multiplying it with the width & height of the tile
      pos.mult(w, h);
      // / Adding the offsets to center the position to the screen
      pos.add(xoff, yoff);

      // Drawing the image
      image(normalTile, pos.x, pos.y, w * s, h * s);
    }
  }
}
