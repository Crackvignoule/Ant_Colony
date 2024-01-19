// MODEL SECTION
import {Free} from "./free.js";
import {Obstacle} from "./obstacle.js";
import {Objective} from "./objective.js";
import {Start} from "./start.js";
import {Ant} from "./ant.js";

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
            [1, 0, 0, 0, 1, 0, 1, 0, 1, 0 ,1, 0, 1, 1, 1, 1, 0, 1],
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
        this.numberGrid = this.addObjective(this.numberGrid);
        // Convert number grid to object grid
        this.grid = this.numberGrid.map(row => row.map(cell => objectMapping[cell]));
    }

    addObjective (numberGrid){
        // Trouver tous les emplacements avec un "0"
        let zeroLocations = [];
        for (let i = 0; i < numberGrid.length; i++) {
            for (let j = 0; j < numberGrid[i].length; j++) {
                if (numberGrid[i][j] === 0) {
                    zeroLocations.push([i, j]);
                }
            }
        }

        // Vérifier s'il y a au moins trois emplacements avec un "0"
        if (zeroLocations.length < 3) {
            console.log("Pas assez de zéros pour placer trois '2'");
        } else {
            // Sélectionner aléatoirement trois emplacements et les remplacer par "2"
            for (let k = 0; k < 3; k++) {
                let randomIndex = Math.floor(Math.random() * zeroLocations.length);
                let location = zeroLocations.splice(randomIndex, 1)[0];
                numberGrid[location[0]][location[1]] = 2;
            }

    }
    return numberGrid;
}

  
    bindDisplayGrid (callback) {
        this.DisplayGrid = callback;
      }

    getGrid () {
        this.DisplayGrid(this.grid);
      }

  }
  
  export default GridModel;
  