export class Ant {
    
    constructor (x,y){
        this.x = x;
        this.y = y;
        this._fps = 60; // Frame rate.
        this.x_end = x;
        this.y_end = y;
        this._speed = 1;
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
    
    FindNewPosition(){

        let val1 = Math.random() * (2 - -2) + -2;
        let val2 = Math.random() * (2 - -2) + -2;
        let x = val1 + this.x;
        let y = val2 + this.y;

        this.x_end = x;
        this.y_end = y;
        // // Directions possibles (only free cell are possible)
        


        // // Calculer la probabilité pour chaque direction
        // let probabilities = directions.map(direction => {
        //     let intensity = this.getIntensity(direction);
        //     return Math.pow(intensity, alpha) * Math.pow(1, beta); // visibilité est toujours 1
        // });

        // // Normaliser les probabilités pour qu'elles somment à 1
        // let sum = probabilities.reduce((a, b) => a + b, 0);
        // probabilities = probabilities.map(prob => prob / sum);

        // // Ajouter une probabilité d'exploration
        // probabilities = probabilities.map(prob => prob * (1 - gamma));
        // probabilities.push(gamma);

        // // Choisir une direction en fonction des probabilités
        // let chosenDirection = this.chooseDirection(probabilities);

        // // Mettre à jour la position
        // this.updatePosition(chosenDirection);
    }

    getIntensity(direction) {
        let dx = 0, dy = 0;
        switch(direction) {
            case 'up': dy = -1; break;
            case 'down': dy = 1; break;
            case 'left': dx = -1; break;
            case 'right': dx = 1; break;
        }
        let newX = this.x + dx;
        let newY = this.y + dy;
    
        // Ensure the new position is within the bounds of the grid
        if(newX < 0 || newX >= this.grid[0].length || newY < 0 || newY >= this.grid.length) {
            return 0;
        }
    
        return this.grid[newY][newX]._qty;
    }

}