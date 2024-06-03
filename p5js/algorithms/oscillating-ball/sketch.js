// Colors
let white_color;
let dark_gray_color;
let black_color;
let red_color;

// Positioning constants
let minX, maxX;
let minY, maxY;

// The ball!!
let ball;

// Vertical & Horizontal speeds of the ball
let speedX;
let speedY;

// Current ball color
let currentColor;

// Sliders
let sliderX;
let sliderY;

function setup() {
  // Create the canvas
  let MARGIN = 50;
  createCanvas(innerWidth - MARGIN, innerHeight - MARGIN);

  // Initializing the colors
  white_color = new Rgba(255, 255, 255, 255);
  dark_gray_color = new Rgba(20, 20, 20, 255);
  black_color = new Rgba(0, 0, 0, 255);
  red_color = new Rgba(255, 0, 0, 255);

  // Initializing the speeds
  speedX = 2;
  speedY = 1;

  [speedX, speedY] = [speedX / 4, speedY / 4];

  // Initializing the ball
  ball = new Ball(width / 2, height / 2, 20);

  // Initialize the current color
  currentColor = white_color;

  // Initialize the values
  minX = 0 + ball.r;
  minY = 0 + ball.r;
  maxX = width - ball.r;
  maxY = height - ball.r;
}

function draw() {
  if (frameCount % 15 == 0) {
    background(black_color.get());
  } else {
    background(black_color.withA(1).get());
  }
  if (ball.pos.x > maxX || ball.pos.x < minX) {
    speedX *= -1;
  }
  if (ball.pos.y > maxY || ball.pos.y < minY) {
    speedY *= -1;
  }
  let newX = ball.pos.x + speedX * deltaTime;
  let newY = ball.pos.y + speedY * deltaTime;
  ball.pos.set(newX, newY);
  ball.draw(currentColor.get());
  currentColor.incR();
  if (frameCount % 50 == 0) {
    speedX += 0.01;
  }
  if (frameCount % 500 == 0) {
    speedY += 0.01;
  }
}
