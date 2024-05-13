class Grid {
  constructor(size) {
    this.size = size;
    this.sx = Math.floor(size / 2);
    this.sy = Math.floor(size / 2);
    this.cellSize = width / size;
    this.data = this.initData();
    this.setValue(this.sx, this.sy, 1);
  }

  initData() {
    let arr = [];
    for (let x = 0; x < this.size; x++) {
      let a = [];
      for (let y = 0; y < this.size; y++) {
        a.push(0);
      }
      arr.push(a);
    }
    return arr;
  }

  setValue(x, y, value) {
    this.data[x][y] = value;
    this.cx = x;
    this.cy = y;
  }

  setRandomValue(value) {
    let rx = Math.floor(Math.random() * (this.size - 1));
    let ry = Math.floor(Math.random() * (this.size - 1));
    while (this.data[rx][ry] == 1) {
      rx = Math.floor(Math.random() * (this.size - 1));
      ry = Math.floor(Math.random() * (this.size - 1));
    }
    this.setValue(rx, ry, value);
  }

  moveRandom() {
    const r = Math.floor(Math.random() * directions.length);
    const dir = directions[r];

    const xOffset = dir[0];
    const yOffset = dir[1];

    const newX = this.cx + xOffset;
    const newY = this.cy + yOffset;

    const c = this.check(newX, newY);

    if (c == -1) console.log("edge");
    else if (c == 0) console.log("free");
    else if (c == 1) console.log("block");

    if (c == 0) {
      this.move(this.cx, this.cy, newX, newY);
    } else if (c == 1) {
      return true;
    } else {
      return false;
    }
  }

  check(newX, newY) {
    // -1 out of bounds
    // 0 can move
    // 1 needs to stop (touched a block)
    if (newX < 0 || newY < 0 || newX >= this.size || newY >= this.size)
      return -1;
    if (this.data[newX][newY] == 1) return 1;
    return 0;
  }

  move(oldX, oldY, newX, newY) {
    // if (newX >= this.size) newX = 0;
    // else if (newX < 0) newX = this.size - 1;
    // else if (newY >= this.size) newY = 0;
    // else if (newY < 0) newY = this.size - 1;

    if (newX >= 0 && newY >= 0 && newX < this.size && newY < this.size) {
      if (this.data[newX][newY] != 1) {
        this.data[newX][newY] = 1;
        this.data[oldX][oldY] = 0;
        this.cx = newX;
        this.cy = newY;
        return false;
      } else {
        return true;
      }
    }
    return true;
  }
  moveUp() {
    let success = this.move(this.cx, this.cy, this.cx, this.cy - 1);
    if (success) this.newPoint();
  }
  moveRight() {
    let success = this.move(this.cx, this.cy, this.cx + 1, this.cy);
    if (success) this.newPoint();
  }
  moveDown() {
    let success = this.move(this.cx, this.cy, this.cx, this.cy + 1);
    if (success) this.newPoint();
  }
  moveLeft() {
    let success = this.move(this.cx, this.cy, this.cx - 1, this.cy);
    if (success) this.newPoint();
  }

  render() {
    stroke(255);
    noStroke();

    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.data[0].length; j++) {
        if (this.data[i][j] == 1) {
          if (i == this.sx && j == this.sy) {
            fill(255, 0, 0);
          } else if (i == this.cx && j == this.cy) {
            fill(0, 255, 0);
          } else {
            fill(255);
          }
        } else {
          noFill();
        }
        const x = i * this.cellSize;
        const y = j * this.cellSize;
        square(x, y, this.cellSize);
      }
    }
  }
}
