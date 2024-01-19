import {Ant} from "../models/ant.js";

// CONTROLLER SECTION
class GridController {
    constructor(model, view) {
        this.modelGrid = model;
        this.modelAnts = new Ant();
        this.view = view;

        this.bindDisplayGrid = this.bindDisplayGrid.bind(this);
        this.modelGrid.bindDisplayGrid(this.bindDisplayGrid);

        this.bindDisplayAnts = this.bindDisplayAnts.bind(this);
        this.modelAnts.bindDisplayAnts(this.bindDisplayAnts);

        this.modelGrid.getGrid();
    }
    
    bindDisplayGrid (cnf_value) {
        this.view.displayGrid(cnf_value);
      }

    bindDisplayAnts (cnf_value) {
        this.view.displayAnts(cnf_value);
      }

  }
  
  export default GridController;