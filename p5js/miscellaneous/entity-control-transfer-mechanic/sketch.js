const SIZE = 19;

let grid;
let currX;
let currY;

function setup() {
  createCanvas(800, 800);

  grid = new Grid(SIZE);
  [currX, currY] = grid.setRandomValue(1);
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    let success = grid.moveUp(currX, currY);
    success ? newPoint() : currY--;
  } else if (keyCode == RIGHT_ARROW) {
    let success = grid.moveRight(currX, currY);
    success ? newPoint() : currX++;
  } else if (keyCode == DOWN_ARROW) {
    let success = grid.moveDown(currX, currY);
    success ? newPoint() : currY++;
  } else if (keyCode == LEFT_ARROW) {
    let success = grid.moveLeft(currX, currY);
    success ? newPoint() : currX--;
  }
}

function draw() {
  background(0);
  grid.render();
}

function newPoint() {
  console.log("newPoint ran");
}
