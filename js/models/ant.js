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

        if (this.positions.length > 0) {
            // Si la fourmi a un chemin à suivre dans positions
            let nextPosition = this.positions.shift(); // Prendre le prochain point
            this.x_end = nextPosition.x;
            this.y_end = nextPosition.y;
        }

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
        // Directions possibles (only free cell are possible)
        // si ya de la bouffe on y va (si ya plusieurs bouffe on y va au hasard)
        // Si aucun pheromones n'est détecté, on choisit une direction aléatoire
        // Si plusieurs directions ont le même nombre de pheromones, on choisit aléatoirement parmi ces directions
        // gamma est ajouté aux cases sans pheromones pour éviter qu'elles ne soient jamais choisies

        if (grid[this.x_end][this.y_end] instanceof Objective){
            this.return_to_start(grid,{x:10,y:9});
            return;
        }
        
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

    drop_pheromones(grid){
        // calculate qty of dropped pheromones
        // qty = Q / length of path at k iteration
        // by doing so, the closer the cells are to the food, the higher the qty of pheromones are

        let Q = 1; // constant
        let path = this.positions;
        let qty = Q / path.length;

        // for (let cell of path){
        //     grid[cell.x][cell.y]._qty += qty;
        // }
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
    
        while (openSet.size > 0) {
            let currentKey = this.getLowestFScore(openSet, fScore);
    
            if (currentKey === goalKey) {
                return this.reconstructPath(cameFrom, currentKey);
            }
            if (typeof currentKey !== 'string') {
                continue;
            }
    
            

            openSet.delete(currentKey);
            closedSet.add(currentKey);
            let currentParts = currentKey.split(',');
            let current = { x: parseInt(currentParts[0]), y: parseInt(currentParts[1]) };
    
            for (let neighbor of this.getNeighbors(current, grid)) {
                let neighborKey = `${neighbor.x},${neighbor.y}`;
    
                if (closedSet.has(neighborKey)) continue;
    
                let tentativeGScore = gScore[currentKey] + this.distBetween(current, neighbor);
    
                if (!openSet.has(neighborKey)) openSet.add(neighborKey);
                else if (tentativeGScore >= (gScore[neighborKey] || Infinity)) continue;
    
                cameFrom.set(neighborKey, currentKey);
                gScore[neighborKey] = tentativeGScore;
                fScore[neighborKey] = gScore[neighborKey] + this.heuristic(neighbor, goal);
            }
        }
    
        return []; // Aucun chemin trouvé
    }
    
    

    // Méthodes supplémentaires nécessaires pour l'A*
    // getLowestFScore, heuristic, getNeighbors, distBetween, reconstructPath

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
    
    
    
    // Dans aStar_path_finding et partout où vous utilisez cameFrom, gScore, et fScore:
    // Convertissez les coordonnées en chaîne de caractères avant de les utiliser comme clés.
    // Par exemple:
    // let nodeKey = `${current.x},${current.y}`;
    // gScore[nodeKey] = ...
    
    reconstructPath(cameFrom, current) {
        let totalPath = [current];
        let currentKey = `${current.x},${current.y}`;
    
        while (cameFrom.has(currentKey)) {
            let cameFromKey = cameFrom.get(currentKey);
            let [x, y] = cameFromKey.split(",").map(Number);
            current = { x, y };
            totalPath.unshift(current);
            currentKey = cameFromKey;
        }
    
        return totalPath;
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
    
            if (newX >= 0 && newX < grid.length && newY >= 0 && newY < grid[0].length && !(grid[newX][newY] instanceof Obstacle)) {
                neighbors.push({ x: newX, y: newY });
            }
        });
    
        return neighbors;
    }

    distBetween(current, neighbor) {
        return 1; // Distance constante pour grille simplifiée
    }

    return_to_start(grid, startPoint) {
        // startPoint est le point de départ initial de la fourmi
        let goal = startPoint; // Point de départ comme destination
    
        // Utiliser A* pour trouver le chemin du point actuel au point de départ
        let path = this.aStar_path_finding(grid, { x: this.x, y: this.y }, goal);
        if (path.length > 0) {
            this.followPath(path);
        }
    }
    
    followPath(path) {
        // Mise à jour de this.positions avec le chemin entier
        this.positions = path.slice(); // Copie du chemin
    }

}