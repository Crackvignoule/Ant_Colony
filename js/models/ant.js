// import { Free } from "./free.js";
import { Objective } from "./objective.js";
import { Obstacle } from "./obstacle.js";
import { Start } from "./start.js";

export class Ant {
    
    constructor (x,y){
        this.x = x;
        this.y = y;
        this._fps = 60; // Frame rate.
        this.x_end = x;
        this.y_end = y;
        this._speed = 2;
        this.positions = [{x:this.x_end,y:this.y_end}];
    }

    Move(durationFrame) {
        let direction = Math.atan2(this.y_end - this.y, this.x_end - this.x);
        let dx = Math.cos(direction);
        let dy = Math.sin(direction);
        this.x += dx * this._speed / this._fps;
        this.y += dy * this._speed / this._fps;
    }

    hasReachedDestination() {
        const distance = Math.sqrt(Math.pow(this.x_end - this.x, 2) + Math.pow(this.y_end - this.y, 2));
        return distance < 0.1; // Définissez un seuil de proximité approprié
    }
    
    FindNewPosition(grid){
        // let x, y;
        // do {
        //     let val1 = Math.random() * 2 - 1; // donne une valeur entre -1 et 1
        //     let val2 = Math.random() * 2 - 1; // donne une valeur entre -1 et 1
        //     x = val1 + this.x;
        //     y = val2 + this.y;
        // } while (!((x > 0) && (x < 18) && (y > 0) && (y < 18)));
        
        // this.x_end = x;
        // this.y_end = y;
    
    

        // Directions possibles (only free cell are possible)
        // si ya de la bouffe on y va (si ya plusieurs bouffe on y va au hasard)
        // Si aucun pheromones n'est détecté, on choisit une direction aléatoire
        // Si plusieurs directions ont le même nombre de pheromones, on choisit aléatoirement parmi ces directions
        // gamma est ajouté aux cases sans pheromones pour éviter qu'elles ne soient jamais choisies
        let gamma = 0.5;

        let directions = [
            [-1, 0], // up
            [1, 0], // down
            [0, -1], // left
            [0, 1] // right
        ];
    
        let probabilities = [];
        let sumOfProbas = 0;
    
        for (let direction of directions) {
            let newX = this.x_end + direction[0];
            let newY = this.y_end + direction[1];
    
            // Check if the new position is within the grid and not an obstacle nor the start cell
            if (newX >= 0 && newX < grid.length && newY >= 0 && newY < grid[0].length && !(grid[newX][newY] instanceof Obstacle) && !(grid[newX][newY] instanceof Start)) {
                let proba = (gamma + grid[newX][newY]._qty);
                if (grid[newX][newY] instanceof Objective) {
                    proba = Infinity; // If the cell is food, we want to go there for sure
                }
                console.log(proba, grid[newX][newY]);
                probabilities.push(proba);
                sumOfProbas += proba;
            } else {
                probabilities.push(0);
            }
        }

        // Normalize probabilities
        if (sumOfProbas === Infinity) {
            // If sumOfProbas is Infinity, set the probability of the objective cell to 1 and all other probabilities to 0
            probabilities = probabilities.map(proba => proba === Infinity ? 1 : 0);
        } else {
            probabilities = probabilities.map(proba => proba / sumOfProbas);
        }
    
        // Choose a direction based on the probabilities
        let r = Math.random();
        let index = probabilities.findIndex((proba, i) => (r -= proba) < 0);
        
        // console.log(index,directions);
        this.x_end += directions[index][0]
        this.y_end += directions[index][1]
        this.positions.push({x:this.x_end,y:this.y_end});
    }

    getIntensity(direction, grid) {
    }

}