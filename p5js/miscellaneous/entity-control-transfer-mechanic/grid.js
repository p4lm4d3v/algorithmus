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
  }

  setRandomValue(value) {
    const rx = Math.floor(Math.random() * (this.size - 1));
    const ry = Math.floor(Math.random() * (this.size - 1));
    this.setValue(rx, ry, value);
    return [rx, ry];
  }

  move(oldX, oldY, newX, newY) {
    if (newX >= 0 && newY >= 0 && newX < this.size && newY < this.size) {
      if (this.data[newX][newY] != 1) {
        this.data[newX][newY] = 1;
        this.data[oldX][oldY] = 0;
        return true;
      }
    }
    return false;
  }
  moveUp(x, y) {
    this.move(x, y, x, y - 1);
  }
  moveRight(x, y) {
    this.move(x, y, x + 1, y);
  }
  moveDown(x, y) {
    this.move(x, y, x, y + 1);
  }
  moveLeft(x, y) {
    this.move(x, y, x - 1, y);
  }

  render() {
    stroke(255);

    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.data[0].length; j++) {
        if (this.data[i][j] == 1) {
          if (i == this.sx && j == this.sy) {
            fill(255, 0, 0);
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
