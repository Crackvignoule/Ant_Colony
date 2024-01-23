import {Ant} from './ant.js';
import {GridModel} from './grid.js';

export class Environnement {
    constructor() {  
        this.modelGrid = new GridModel();
        this.grid = this.modelGrid.buildGrid();
        this.ants = [];
        this.createAnts();
    }

    createAnts(){
        for (let i=0; i<1; i++){
            let ant = new Ant(9,10);
            this.ants.push(ant);
        }
    }
    
    bindDisplay (callback) {
        this.display = callback;
      }

    Update(){
        console.log("Dans Update, avant call display: ",this.ants);
        this.display(this.grid, this.ants);
    }
}