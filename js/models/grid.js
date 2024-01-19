// MODEL SECTION
import {Free} from "./free.js";
import {Obstacle} from "./obstacle.js";
import {Objective} from "./objective.js";
import {Start} from "./start.js";

class GridModel {
    constructor() {
        let free = new Free();
        let obstacle = new Obstacle();
        let objective = new Objective();
        let start = new Start();

        // Mapping of numbers to objects
        let objectMapping = {
            0: free,
            1: obstacle,
            2: objective,
            3: start
        };

        this.numberGrid = [
            [1, 1, 1 , 1, 1, 1, 1, 1, 1, 1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1],
            [1, 1, 1, 0, 0, 0, 0, 0, 1, 0 ,0, 0, 0, 0, 1, 1, 1, 1],
            [1, 1, 1, 0, 1, 0, 1, 0, 1, 0 ,1, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 1, 0, 1, 0, 1, 0 ,1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 0, 1, 0 ,1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 1, 0 ,1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 1, 0, 1, 0, 0, 0 ,1, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 0, 0, 0, 1, 1, 1, 0 ,1, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 0, 1, 1, 0 ,0, 0, 0, 0, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 1, 1, 0, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 3 ,0, 1, 1, 0, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1 ,0, 1, 1, 0, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 0, 0, 0, 1 ,0, 0, 0, 0, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 0, 1 ,0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 1, 0, 1 ,0, 1, 0, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 1, 0, 1 ,0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 1, 1, 0, 0 ,0, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1 , 1, 1, 1, 1, 1, 1, 1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1],
        ];

        // Convert number grid to object grid
        this.grid = this.numberGrid.map(row => row.map(cell => objectMapping[cell]));
    }

    // TODO
    // createAnts(count) {
    //     const ants = [];
    //     for (let i = 0; i < count; i++) {
    //         let ant = new Ant(10, 9);
    //         ants.push(ant);
    //     }
    //     return ants;
    // }
  
    bindDisplayGrid (callback) {
        this.DisplayGrid = callback;
      }

    getGrid () {
        this.DisplayGrid(this.grid);
      }

  }
  
  export default GridModel;
  