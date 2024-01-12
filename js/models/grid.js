class Grid {
    constructor() {
      this.gridSize = 20;
      this.grid = this.createGrid(this.gridSize);
    }
  
    createGrid(size) {
      let grid = [];
      for (let i = 0; i < size; i++) {
        grid[i] = [];
        for (let j = 0; j < size; j++) {
          grid[i][j] = 0;
        }
      }
      return grid;
    }
  }
  