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

  move(oldX, oldY, newX, newY) {
    if (newX >= 0 && newY >= 0 && newX < this.size && newY < this.size) {
      if (this.data[newX][newY] != 1) {
        this.data[newX][newY] = 1;
        this.data[oldX][oldY] = 0;
        return false;
      } else {
        return true;
      }
    }
  }
  moveUp() {
    let success = this.move(this.cx, this.cy, this.cx, this.cy - 1);
    success ? newPoint() : this.cy--;
  }
  moveRight() {
    let success = this.move(this.cx, this.cy, this.cx + 1, this.cy);
    success ? newPoint() : this.cx++;
  }
  moveDown() {
    let success = this.move(this.cx, this.cy, this.cx, this.cy + 1);
    success ? newPoint() : this.cy++;
  }
  moveLeft() {
    let success = this.move(this.cx, this.cy, this.cx - 1, this.cy);
    success ? newPoint() : this.cx--;
  }

  render() {
    stroke(255);

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
