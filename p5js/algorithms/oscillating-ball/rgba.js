class Rgba {
  constructor(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
  get() {
    return [this.r, this.g, this.b, this.a];
  }
  withA(a) {
    let copy = this;
    copy.a = a;
    return copy;
  }
  incR() {
    this.r++;
  }
  incG() {
    this.g++;
  }
  incB() {
    this.b++;
  }
  incA() {
    this.a++;
  }
  decR() {
    this.r--;
  }
  decG() {
    this.g--;
  }
  decB() {
    this.b--;
  }
  decA() {
    this.a--;
  }
}
