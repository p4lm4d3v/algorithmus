// Coding Train / Daniel Shiffman
// Weighted Voronoi Stippling
// https://thecodingtrain.com/challenges/181-image-stippling

// All of the points
let points = [];
// Global variables for geometry
let delaunay, voronoi;
// Image
let img;

// Load image before setup
function preload() {
  img = loadImage("img/poodle.jpg");
}

function setup() {
  createCanvas(img.width, img.height);

  // Generate random points avoiding bright areas
  generateRandomPoints(6000);

  // Calculate Delaunay triangulation and Voronoi diagram
  delaunay = calculateDelaunay(points);
  voronoi = delaunay.voronoi([0, 0, width, height]);
}

function draw() {
  background(255);

  // Display points
  displayPoints();

  // Calculate centroids and update points
  updatePoints();
}

// Generate random points avoiding bright areas
function generateRandomPoints(n) {
  for (let i = 0; i < n; i++) {
    let x = random(width);
    let y = random(height);
    let col = img.get(x, y);
    if (random(100) > brightness(col)) {
      points.push(createVector(x, y));
    } else {
      i--;
    }
  }
}

// Display points
function displayPoints() {
  for (let v of points) {
    stroke(0);
    strokeWeight(4);
    point(v.x, v.y);
  }
}

// Calculate centroids and update points
function updatePoints() {
  // Get latest polygons
  let polygons = voronoi.cellPolygons();
  let cells = Array.from(polygons);

  // Arrays for centroids and weights
  let centroids = new Array(cells.length);
  let weights = new Array(cells.length).fill(0);
  for (let i = 0; i < centroids.length; i++) {
    centroids[i] = createVector(0, 0);
  }

  // Get the weights of all the pixels and assign to cells
  img.loadPixels();
  let delaunayIndex = 0;
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let index = (i + j * width) * 4;
      let r = img.pixels[index + 0];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      let bright = (r + g + b) / 3;
      let weight = 1 - bright / 255;
      delaunayIndex = delaunay.find(i, j, delaunayIndex);
      centroids[delaunayIndex].x += i * weight;
      centroids[delaunayIndex].y += j * weight;
      weights[delaunayIndex] += weight;
    }
  }

  // Compute weighted centroids
  for (let i = 0; i < centroids.length; i++) {
    if (weights[i] > 0) {
      centroids[i].div(weights[i]);
    } else {
      centroids[i] = points[i].copy();
    }
  }

  // Interpolate points
  for (let i = 0; i < points.length; i++) {
    points[i].lerp(centroids[i], 0.1);
  }

  // Next voronoi (relaxation)
  delaunay = calculateDelaunay(points);
  voronoi = delaunay.voronoi([0, 0, width, height]);
}

// Calculate Delaunay triangulation from p5.Vectors
function calculateDelaunay(points) {
  let pointsArray = [];
  for (let v of points) {
    pointsArray.push(v.x, v.y);
  }
  return new d3.Delaunay(pointsArray);
}
