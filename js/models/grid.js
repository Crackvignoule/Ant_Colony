// MODEL SECTION
class GridModel {
    constructor() {
        this.grid = this.grid = Array(18).fill().map(() => Array(18).fill(1));
    }
  
    getGrid() {
        return this.grid;
    }
  }
  
  export default GridModel;
  