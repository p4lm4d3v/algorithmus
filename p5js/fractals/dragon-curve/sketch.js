let segments = [];
let firstTime = true;
let zoom = 1;
let targetZoom = 1;
let amt = 0;

let endSegment;

function setup() {
  createCanvas(innerWidth - 5, innerHeight - 5);

  let b = createVector(0, 0);
  let a = createVector(0, 300);

  endSegment = b;

  endSegment = new Segment(a, b, b);
  endSegment.completed = true;
  segments.push(endSegment);
}

function nextGeneration() {
  let newSegments = [];

  for (let s of segments) {
    let newS = s.duplicate(endSegment.a);
    if (firstTime) {
      newS.origin = endSegment.b.copy();
      firstTime = false;
    }
    newSegments.push(newS);
  }

  endSegment = newSegments[0];

  segments = segments.concat(newSegments);

  let maxAmt = 9000;
  if (segments.length > maxAmt) {
    location.reload();
  }

  rotationSpeed *= 0.5;
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  let newZoom = lerp(zoom, targetZoom, amt);
  scale(newZoom);

  // let allCompleted = true;
  amt += 0.01;

  for (let s of segments) {
    if (!s.completed) {
      s.update();
      allCompleted = false;
    }
    s.show();
  }

  if (amt >= 1) {
    nextGeneration();
    amt = 0;
    zoom = newZoom;
    targetZoom = zoom / Math.sqrt(2);
  }
}
