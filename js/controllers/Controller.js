import {Environnement} from "../models/environnement.js";
import {Ant} from "../models/ant.js";

// CONTROLLER SECTION
export class Controller {
    constructor(modelEnv, view) {
        this.modelEnv = modelEnv;
        this.view = view;

        this.bindDisplay = this.bindDisplay.bind(this);
        this.modelEnv.bindDisplay(this.bindDisplay);

        this.bindDisplayStart = this.bindDisplayStart.bind(this);
        this.modelEnv.bindDisplayStart(this.bindDisplayStart);

        this.bindGet = this.bindGet.bind(this);
        this.view.bindGet(this.bindGet);

    }

    bindDisplay(grid, ants) {
      this.view.display(grid, ants);
  }

    bindGet () {
      this.modelEnv.get();
    }

    bindDisplayStart(grid) {
      this.view.displayStart(grid);
  }

    play(){
      this.modelEnv.UpdateStart();
    }
  }