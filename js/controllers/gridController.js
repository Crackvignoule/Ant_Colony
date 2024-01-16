// CONTROLLER SECTION
class GridController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
  
    displayGrid() {
        let grid = this.model.getGrid();
        this.view.drawGrid(grid);
    }
  }
  
  export default GridController;