import {Environnement} from "../models/environnement.js";
import {Ant} from "../models/ant.js";

// CONTROLLER SECTION
class GridController {
    constructor(model, view) {
        this.modelGrid = model;
        this.modelEnv = new Environnement();
        this.view = view;

        this.bindDisplayGrid = this.bindDisplayGrid.bind(this);
        this.modelGrid.bindDisplayGrid(this.bindDisplayGrid);

        this.bindDisplayAnts = this.bindDisplayAnts.bind(this);
        this.modelEnv.bindDisplayAnts(this.bindDisplayAnts);

        this.bindGetAnts = this.bindGetAnts.bind(this);
        this.view.bindGetAnts(this.bindGetAnts);

        this.modelGrid.getGrid();
    }
    
    bindDisplayGrid (cnf_value) {
        this.view.displayGrid(cnf_value);
      }

    bindDisplayAnts (cnf_value) {
        this.view.displayAnts(cnf_value);
      }

    bindGetAnts () {
      this.modelEnv.getAnts();
    }

  }
  
  export default GridController;