// MODEL SECTION
import {Free} from "./free.js";
import {Obstacle} from "./obstacle.js";
import {Objective} from "./objective.js";
import {Start} from "./start.js";
import {Ant} from "./ant.js";

export class GridModel {
    constructor() {
        
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
            for (let k = 0; k < 4; k++) {
                let randomIndex = Math.floor(Math.random() * zeroLocations.length);
                let location = zeroLocations.splice(randomIndex, 1)[0];
                numberGrid[location[0]][location[1]] = 2;
            }

    }
    return numberGrid;
}


    buildGrid () {
        // Mapping of numbers to objects
        let objectMapping = {
            0: () => new Free(),
            1: () => new Obstacle(),
            2: () => new Objective(),
            3: () => new Start(),
        };

        let numberGrid = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1],
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
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1],
        ];
        // add 4 random food
        numberGrid = this.addObjective(numberGrid);
        // Convert number grid to object grid
        let grid = numberGrid.map(row => row.map(cell => objectMapping[cell]()));
        return grid;
    }

  }
  
  export default GridModel;
  