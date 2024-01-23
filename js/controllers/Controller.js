import {Environnement} from "../models/environnement.js";
import {Ant} from "../models/ant.js";

// CONTROLLER SECTION
export class Controller {
    constructor(modelEnv, view) {
        this.modelEnv = modelEnv;
        this.view = view;

        this.bindDisplay = this.bindDisplay.bind(this);
        this.modelEnv.bindDisplay(this.bindDisplay);

        this.bindGet = this.bindGet.bind(this);
        this.view.bindGet(this.bindGet);
    }

    bindDisplay(grid, ants) {
      // Appel de la méthode display de la vue avec les valeurs reçues
      this.view.display(grid, ants);
  }

    bindGet () {
      this.modelEnv.get();
    }

    play(){
      this.modelEnv.Update();
    }
  }