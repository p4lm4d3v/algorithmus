const DROP_RESOLUTION = 400;

class Drop {
  constructor(x, y, r) {
    this.center = createVector(x, y);
    this.r = r;

    this.vertices = [];

    for (let i = 0; i < DROP_RESOLUTION; i++) {
      let angle = map(i, 0, DROP_RESOLUTION, 0, TWO_PI);
      let v = createVector(cos(angle), sin(angle));
      v.mult(this.r);
      v.add(this.center);
      this.vertices[i] = v;
    }
    this.col = [random(0, 255), random(0, 255), random(0, 255)];
  }

  marble(other) {
    for (let v of this.vertices) {
      let c = other.center;
      let r = other.r;
      let p = v.copy();
      p.sub(c);
      let m = p.mag();
      let root = sqrt(1 + (r * r) / (m * m));
      p.mult(root);
      p.add(c);
      v.set(p);
    }
  }

  tineX(xl, z, c) {
    let u = 1 / pow(2, 1 / c);
    for (let v of this.vertices) {
      v.y = v.y + z * pow(u, abs(v.x - xl));
    }
  }

  tineY(yl, z, c) {
    let u = 1 / pow(2, 1 / c);
    for (let v of this.vertices) {
      v.x = v.x + z * pow(u, abs(v.y - yl));
    }
  }

  tine(m, x, y, z, c) {
    let u = 1 / pow(2, 1 / c);
    let b = createVector(x, y);
    for (let p of this.vertices) {
      let pb = p5.Vector.sub(p, b);
      let n = m.copy().rotate(HALF_PI);
      let d = abs(pb.dot(n));
      let mag = z * pow(u, d);
      p.add(m.copy().mult(mag));
    }
  }

  show() {
    noStroke();
    fill(this.col);

    beginShape();
    for (let v of this.vertices) {
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
  }
}
