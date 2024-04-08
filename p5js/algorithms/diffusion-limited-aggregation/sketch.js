const SIZE = 19 * 10;

const directions = [
  [0, -1], // UP
  [1, 0], // RIGHT
  [0, 1], // DOWN
  [-1, 0], // LEFT
];

let grid;

function setup() {
  createCanvas(innerHeight - 10, innerHeight - 10);

  grid = new Grid(SIZE);
  for (let i = 0; i < 19; i++) {
    grid.setRandomValue(1);
  }
}

function keyPressed() {
  const img = new Date().getMilliseconds();
  if (keyCode == RETURN) saveCanvas(img);
  if (keyCode == UP_ARROW) grid.moveUp();
  else if (keyCode == RIGHT_ARROW) grid.moveRight();
  else if (keyCode == DOWN_ARROW) grid.moveDown();
  else if (keyCode == LEFT_ARROW) grid.moveLeft();
  // if (keyCode == ENTER) {
  //   grid.moveRandom() ? newPoint() : doNothing();
  // }
}

function draw() {
  background(0);
  if (keyIsDown(UP_ARROW)) grid.moveUp();
  else if (keyIsDown(RIGHT_ARROW)) grid.moveRight();
  else if (keyIsDown(DOWN_ARROW)) grid.moveDown();
  else if (keyIsDown(LEFT_ARROW)) grid.moveLeft();
  grid.moveRandom() ? newPoint() : doNothing();
  // keyIsDown(ENTER)
  //   ? grid.moveRandom()
  //     ? newPoint()
  //     : doNothing()
  //   : doNothing();
  grid.render();
}

function newPoint() {
  grid.setRandomValue(1);
}

function doNothing() {}
