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
    
    bindDisplay (cnf_value) {
        this.view.display(cnf_value);
      }

    bindGet () {
      this.modelEnv.get();
    }
    
    play(){
      this.modelEnv.Update();
    }
  }