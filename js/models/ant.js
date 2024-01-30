import { Free } from "./free.js";
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
        this._speed = 5 // 2 de base
        this.positions = [];
        
        this.isReturning = false;
        this.numberPositionToStart;
    }

    Move(durationFrame,grid) {
        this.setDirection(this.x-this.x_end,this.y-this.y_end); // set direction
        if (this.isReturning) {
            this.moveToStart(grid);
        } else {
            this.moveTowardsEnd(durationFrame);
        }
    }
    
    moveToStart(grid) {
        if (this.returnPath.length > 0) {
            let nextPosition = this.returnPath[0];
            this.x_end = nextPosition.x;
            this.y_end = nextPosition.y;
            this.drop_pheromones(grid,this.x_end,this.y_end);
    
            let direction = Math.atan2(this.y_end - this.y, this.x_end - this.x);
            let dx = Math.cos(direction);
            let dy = Math.sin(direction);
            this.x += dx * this._speed / this._fps;
            this.y += dy * this._speed / this._fps;
    
            // Vérifier si la fourmi a atteint la prochaine position
            if (Math.sqrt(Math.pow(this.x_end - this.x, 2) + Math.pow(this.y_end - this.y, 2)) < 0.1) {
                this.returnPath.shift(); // Supprimer la position atteinte
            }
    
            if (this.returnPath.length === 0) {
                this.isReturning = false; // Réinitialisez l'état une fois le chemin de retour terminé
            }
        }
    }
    
    moveTowardsEnd(durationFrame) {
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

    setDirection(dx,dy){
        if ((dx<-0.5) && (dy>-0.5) && (dy<0.5)) {  // up
            this.direction = 3;
        }
        else if ((dx>0.5) && (dy>-0.5) && (dy<0.5)) {  // down
            this.direction = 1;
        }
        else if ((dy<-0.5) && (dx>-0.5) && (dx<0.5)) {  // left
            this.direction = 2;
        }
        else if ((dy>0.5) && (dx>-0.5) && (dx<0.5)) {  // right
            this.direction = 0;
        }
    }
    
    FindNewPosition(grid){
        // Directions possibles (only free cell are possible)
        // si ya de la bouffe on y va (si ya plusieurs bouffe on y va au hasard)
        // Si aucun pheromones n'est détecté, on choisit une direction aléatoire
        // Si plusieurs directions ont le même nombre de pheromones, on choisit aléatoirement parmi ces directions
        // gamma est ajouté aux cases sans pheromones pour éviter qu'elles ne soient jamais choisies

        if (grid[this.x_end][this.y_end] instanceof Objective){
            this.positions = [];
            this.returnPath = this.aStar_path_finding(grid, { x: this.x_end, y: this.y_end }, {x:10,y:9});
            this.numberPositionToStart = this.returnPath.length;
            this.isReturning = true;
            return;
        }
        
        let gamma = 0.01;

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
                    grid[newX][newY]._qty -= 0.1;

                    //Si plus de nourriture on change avec une cellule vide
                    if(grid[newX][newY]._qty <= 0){
                        grid[newX][newY] = new Free(); 
                    }
                }
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
        
        this.x_end += directions[index][0]
        this.y_end += directions[index][1]
        this.positions.push({x:this.x_end,y:this.y_end});
    }

    drop_pheromones(grid,x,y){
        // cette fonction est appelée à chaque fois que la fourmi passe sur une case du chemin retour
        let Q = 15; // constant
        let path_length = this.returnPath.length;
        let qty = path_length / Q;

        // drop pheromones on the current cell
        grid[x][y]._qty += qty;
    }

    aStar_path_finding(grid, start, goal) {
        let startKey = `${start.x},${start.y}`;
        let goalKey = `${goal.x},${goal.y}`;
    
        // Initialisez les ensembles openSet, closedSet et les scores g et f
        let openSet = new Set([startKey]);
        let closedSet = new Set();
        let gScore = {}; // Coût depuis le départ
        let fScore = {}; // Coût total estimé
        gScore[startKey] = 0;
        fScore[startKey] = this.heuristic(start, goal);
    
        let cameFrom = new Map();
    
        let compteur = 0;
        while (openSet.size > 0) {
            let currentKey = this.getLowestFScore(openSet, fScore);    
            
            // Si on a atteint la destination, on reconstruit le chemin et on le suit
            if (currentKey === goalKey) {
                compteur += 1;                
                let path = this.reconstructPath(cameFrom, goalKey);
                return path;
            }
            

            openSet.delete(currentKey);
            closedSet.add(currentKey);
            let currentParts = currentKey.split(',');
            let current = { x: parseInt(currentParts[0]), y: parseInt(currentParts[1]) };
    
            for (let neighbor of this.getNeighbors(current, grid)) {
                let neighborKey = `${neighbor.x},${neighbor.y}`;
            
                if (closedSet.has(neighborKey)) continue;
            
                let tentativeGScore = gScore[currentKey] + 1;
            
                if (!openSet.has(neighborKey)) openSet.add(neighborKey);
                else if (tentativeGScore >= (gScore[neighborKey] || Infinity)) continue;
            
                cameFrom.set(neighborKey, currentKey);
                gScore[neighborKey] = tentativeGScore;
                fScore[neighborKey] = gScore[neighborKey] + this.heuristic(neighbor, goal);
            }
        }
        return [];
    }
    
    

    getLowestFScore(openSet, fScore) {
        let lowestKey = null;
        let lowestFScore = Infinity;
    
        openSet.forEach(nodeKey => {
            let score = fScore[nodeKey];
            if (score < lowestFScore) {
                lowestFScore = score;
                lowestKey = nodeKey;
            }
        });
    
        return lowestKey; // Devrait être une chaîne de caractères
    }
    
    
    reconstructPath(cameFrom, endKey) {
        let path = [];
        let currentKey = endKey;
        while (cameFrom.has(currentKey)) {
            let [x, y] = currentKey.split(",").map(Number);
            
            let node = { y, x };
            path = [node].concat(path);


            currentKey = cameFrom.get(currentKey);
        }
    
        return path;
    }
    
    
    
    heuristic(start, goal) {
        return Math.sqrt(Math.pow(start.x - goal.x, 2) + Math.pow(start.y - goal.y, 2));
    }
    
    getNeighbors(node, grid) {
        let neighbors = [];
        let directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // haut, bas, gauche, droite
    
        directions.forEach(dir => {
            let newX = node.x + dir[0];
            let newY = node.y + dir[1];
    
            if (newX >= 0 && newX < grid.length && newY >= 0 && newY < grid[0].length) {
                if (!(grid[newX][newY] instanceof Obstacle)) {
                    neighbors.push({ x: newX, y: newY });
                } else {
                }
            }
        });
    
        return neighbors;
    }
    

}