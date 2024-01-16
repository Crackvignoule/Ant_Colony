// MODEL SECTION
class GridModel {
    constructor() {
        this.grid = [
            [0, 1, 2],
            [0, -1, 0],
            [0, 0, 0],
            [0, 0, 0],
        ];
    }
  
    getGrid() {
        return this.grid;
    }
  }
  
  export default GridModel;
  