// CONTROLLER SECTION
class GridController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.bindDisplayCNF = this.bindDisplayCNF.bind(this);
        this.model.bindDisplayCNF(this.bindDisplayCNF);

        this.model.getCNF();
    }
    
    bindDisplayCNF (cnf_value) {
        this.view.displayCNF(cnf_value);
      }


/*
    displayGrid() {
        //let grid = this.model.getGrid();
        this.view.drawGrid(grid);
    }*/
  }
  
  export default GridController;