const SIZE = 19;

let grid;

function setup() {
  createCanvas(800, 800);

  grid = new Grid(SIZE);
  grid.setRandomValue(1);
}

function keyPressed() {
  if (keyCode == UP_ARROW) grid.moveUp();
  else if (keyCode == RIGHT_ARROW) grid.moveRight();
  else if (keyCode == DOWN_ARROW) grid.moveDown();
  else if (keyCode == LEFT_ARROW) grid.moveLeft();
}

function draw() {
  background(0);
  grid.render();
}

function newPoint() {
  grid.setRandomValue(1);
}
