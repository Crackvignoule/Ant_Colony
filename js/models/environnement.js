import {Ant} from './ant.js';
import {GridModel} from './grid.js';

export class Environnement {
    constructor() {  
        this.modelGrid = new GridModel();
        this.grid = this.modelGrid.buildGrid();
        this.ants = [];
        this.createAnts();

        this._startTime = Date.now();
        this._lag = 0;
        this._fps = 60; // Frame rate.
        this._frameDuration = 1000 / this._fps;
        this._cellSize = 36;
        this._timer = 0;
    }

    createAnts(){
        for (let i=0; i<1; i++){
            let ant = new Ant(10,9);
            this.ants.push(ant);
        }
    }
    
    bindDisplay (callback) {
        this.display = callback;
      }

    FindNewPosition(ant){
        let val1 = Math.random() * (2 - -2) + -2;
        let val2 = Math.random() * (2 - -2) + -2;
        let x = val1 + ant.x;
        let y = val2 + ant.y;

        return { x: x, y: y };
    }

    get(){
        this.Update();
    }

    Update(){
        for(let ant of this.ants){
            // Compute deltaTime.
            let currentTime = Date.now();
            let deltaTime   = currentTime - this._startTime;
            this._lag += deltaTime;
            this._startTime = currentTime;
            this._timer += deltaTime;
    
            // Calculez la nouvelle position seulement si nécessaire.
            if (ant.hasReachedDestination()) {
                console.log("Reached");
                let coord = this.FindNewPosition(ant);
                ant.x_end = coord.x;
                ant.y_end = coord.y;

                
            }
    
            while (this._lag >= this._frameDuration) {

                // console.log("this._lag : ",this._lag);
                // console.log("this._frameDuration : ",this._frameDuration);

                ant.Move(this._frameDuration);
                // console.log("x : ",ant.x, " x_end : ",ant.x_end);
                // console.log("y : ",ant.y, " y_end : ",ant.y_end);
                this._lag -= this._frameDuration;
                this.display(this.grid, this.ants);
                this._lag -= this._frameDuration;
            }
        }
    
        requestAnimationFrame(this.Update.bind(this));
    }
    
    }
