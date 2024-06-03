class Ball {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.r = r;
    this.halfR = r / 2;
  }

  draw(color) {
    push();
    fill(color);
    noStroke();
    circle(this.pos.x, this.pos.y, this.r * 2);
    pop();
  }
}
