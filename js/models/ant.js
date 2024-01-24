import { Free } from "./free.js";
import { Objective } from "./objective.js";
import { Start } from "./start.js";

export class Ant {
    
    constructor (x,y){
        this.x = x;
        this.y = y;
        this._fps = 60; // Frame rate.
        this.x_end = x;
        this.y_end = y;
        this._speed = 2;
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
        
        // Si aucun pheromones n'est détecté, on choisit une direction aléatoire
        // Sinon, on choisit la direction avec le plus de pheromones
        // Si plusieurs directions ont le même nombre de pheromones, on choisit aléatoirement parmi ces directions

        let directions = ['up', 'down', 'left', 'right'];
        let maxIntensity = 0;
        let maxDirections = [];
        for (let direction of directions) {
            let intensity = this.getIntensity(direction, grid);
            if (intensity > maxIntensity) {
                maxIntensity = intensity;
                maxDirections = [direction];
            } else if (intensity === maxIntensity) {
                maxDirections.push(direction);
            }else if (intensity == -2){
                //traitement
            }
        }
        console.log(this.x_end,this.y_end,maxDirections);
        let randomIndex = Math.floor(Math.random() * maxDirections.length);
        let newDirection = maxDirections[randomIndex];
        this.direction = newDirection;

        // Définir x_end et y_end en fonction de la direction choisie
        switch(newDirection) {
            case 'up': this.y_end = this.y_end - 1; break;
            case 'down': this.y_end = this.y_end + 1; break;
            case 'left': this.x_end = this.x_end - 1; break;
            case 'right': this.x_end = this.x_end + 1; break;
        }

    }

    getIntensity(direction, grid) {
        let dx = 0, dy = 0;
        switch(direction) {
            case 'up': dy = -1; break;
            case 'down': dy = 1; break;
            case 'left': dx = -1; break;
            case 'right': dx = 1; break;
        }
        let newX = this.x_end + dx;
        let newY = this.y_end + dy;
    
        // Ensure the new position is within the bounds of the grid
        if(newX < 0 || newX >= 18 || newY < 0 || newY >= 18) {
            return -1;
        }
        
        if((grid[newX][newY] instanceof Objective)){
            return -2;
        }

        // ensure the new position is free
        if(!(grid[newX][newY] instanceof Free) && !(grid[newX][newY] instanceof Start)) {
            return -1;
        }
        
       
        return grid[newY][newX]._qty;
    }

}