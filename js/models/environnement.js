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
        let x = 10;
        let y = 10;

        return x,y
    }

    get(){
        this.Update();
    }

    Update(){
       

            // Compute deltaTime.
            let currentTime = Date.now();
            let deltaTime   = currentTime - this._startTime;
            this._lag += deltaTime;
            this._startTime = currentTime;
            this._timer += deltaTime;

            // Update the logic if the lag counter is greater than or equal to the frame duration.
            while (this._lag >= this._frameDuration) {

                for(let ant of this.ants){
                    let new_x, new_y = this.FindNewPosition(ant);
                
                    //On configure les nouvelle valeur de x et de y
                    ant.x_end = new_x;
                    ant.y_end = new_y;
                    
                    ant.Move(_frameDuration);
                }

                this.display(this.grid, this.ants);

                
                // Reduce the lag counter by the frame duration.
                this._lag -= this._frameDuration;
            }

            if (new_x < 17) {
                requestAnimationFrame(Update);
            }

            // console.log(new_x,new_y, this._timer / 1000);

            
        
        
        



        

    }
}