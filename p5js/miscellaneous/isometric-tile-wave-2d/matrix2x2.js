class Matrix2x2 {
  constructor(data) {
    this.a = data[0][0];
    this.b = data[1][0];
    this.c = data[0][1];
    this.d = data[1][1];
  }

  mulVec(vec) {
    const x = vec.x * this.a + vec.y * this.b;
    const y = vec.x * this.c + vec.y * this.d;
    return new createVector(x, y);
  }

  inverse() {
    const det = this.a * this.d - this.b * this.c;
    if (det == 0) {
      throw new Error("Matrix is not invertible.");
    }

    const invDet = 1 / det;

    return new Matrix2x2([
      [this.d * invDet, -this.b * invDet],
      [-this.c * invDet, this.a * invDet],
    ]);
  }
}
