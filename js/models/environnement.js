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
        for (let i=0; i<10; i++){
            let ant = new Ant(10,9);
            this.ants.push(ant);
        }
    }
    
    bindDisplay (callback) {
        this.display = callback;
      }

    bindDisplayStart (callback) {
        this.displayStart = callback;
    }

    get(){
        this.Update();
    }

    UpdateStart(){
        this.displayStart(this.grid);
    }

    Update(){
        let currentTime = Date.now();
        let deltaTime = currentTime - this._startTime;
        this._lag += deltaTime;
        this._startTime = currentTime;
    
        if (this._lag >= this._frameDuration) {
            for (let ant of this.ants) {
                if (ant.hasReachedDestination()) {
                    ant.FindNewPosition(this.grid);
                }
                ant.Move(this._frameDuration);
            }
    
            this._lag -= this._frameDuration;
            this.display(this.grid, this.ants);
        }
    
        //requestAnimationFrame(this.Update.bind(this));
    }
    
    
    }
