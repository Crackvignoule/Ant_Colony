// CONTROLLER SECTION
class GridController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.bindDisplayGrid = this.bindDisplayGrid.bind(this);
        this.model.bindDisplayGrid(this.bindDisplayGrid);

        this.model.getGrid();
    }
    
    bindDisplayGrid (cnf_value) {
        this.view.displayGrid(cnf_value);
      }


  }
  
  export default GridController;