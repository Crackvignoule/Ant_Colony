// TODO WE NEED A FUNCTION UPDATE DISPLAY IN THE VIEW
// TODO REFACTOR IN SEPARATE FUNCTIONS
// TODO RENAME CLASSES (gridModel -> Model,...)

import {Free} from "../models/free.js";
import {Obstacle} from "../models/obstacle.js";
import {Objective} from "../models/objective.js";
import {Start} from "../models/start.js";
import {Ant} from "../models/ant.js";

// VIEW SECTION
export class View {
    constructor(START_IMAGE, TREE_IMAGE, SHADOW_IMAGE, KEBAB_IMAGE, ANT_IMAGE) {
        this.canvas = document.getElementById('myCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.cellSize = 36; // Taille de chaque tuile dans l'image
        this.START_IMAGE = START_IMAGE;
        this.TREE_IMAGE = TREE_IMAGE;
        this.SHADOW_IMAGE = SHADOW_IMAGE;
        this.KEBAB_IMAGE = KEBAB_IMAGE;
        this.ANT_IMAGE = ANT_IMAGE;
        this.endGame = false;
        this.showCircles=true;
        this.ants = [];

        

        this.initGame();
    }

    bindGet (callback) {
        this.get = callback;
   }

    display(grid, ants) {
        this.drawGrid(grid);

        // for each free cell in grid draw qty of pheromones
        let offset = 30;
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[0].length; x++){
                if (grid[y][x] instanceof Free) {
                    
                    if(this.showCircles){
                        // Scale _qty to a suitable radius size
                        let radius = Math.sqrt(grid[y][x]._qty) * 5; // Adjust the multiplier as needed                   
                        // Calculate color based on radius
                        let red = Math.min(255, Math.round(radius * 10)); // Adjust the multiplier as needed
                        let blue = 255 - red;
                        this.ctx.fillStyle = 'rgb(' + red + ', 0, ' + blue + ')';
                            
                        this.ctx.beginPath();
                        this.ctx.arc(x * this.cellSize+offset, y * this.cellSize+offset, radius, 0, 2 * Math.PI);
                        this.ctx.fill();
                    } else{
                        this.ctx.fillStyle = '#FFFFFF'; // Set text color to white
                        this.ctx.textAlign = 'center';
                        this.ctx.fillText(grid[y][x]._qty.toFixed(2), x * this.cellSize+offset, y * this.cellSize+offset);
                    }
                    
                }
            }
        }

        // for each ant in ants drawAnt
        for (let ant of ants) {
            // TODO ROTATE ANT
            // this.ctx.save(); // Save the current state of the canvas
            // this.ctx.translate(ant.y * this.cellSize + this.cellSize / 2, ant.x * this.cellSize + this.cellSize / 2); // Move the origin to the center of the ant
            // this.ctx.rotate(ant.rotation); // Rotate the canvas around the new origin
            // this.ctx.translate(-this.cellSize / 2, -this.cellSize / 2); // Move the origin back to the top-left corner of the ant
            // this.drawAnt(0, 0); // Draw the ant at the new origin
            // this.ctx.restore(); // Restore the saved state of the canvas
            this.drawAnt(ant.x, ant.y);
        }
    }


    displayStart(grid) {
        this.drawGrid(grid);
    }
    
    initGame() {

        let button = document.getElementById("start-button");
        let button_pheromone = document.getElementById("pheromones-button");

        this.buttonPheromoneClickHandler = () => {
                this.showCircles = !this.showCircles;
        };
        button_pheromone.addEventListener('click', this.buttonPheromoneClickHandler);
        

        let intervalId = null;
        let seconds = 0;
        let minutes = 0;

        this.buttonClickHandler = () => {
            if (!this.endGame) {
                this.endGame = true;
                // Démarrer le jeu
                button.textContent = 'Stop';
                button.classList.add('active');

                // Démarrer le chronomètre
                intervalId = setInterval(() => {
                    seconds++;
                    if (seconds >= 60) {
                        minutes++;
                        seconds = 0;
                    }
                    document.getElementById('chrono').textContent = 
                        (minutes < 10 ? '0' : '') + minutes + ':' + 
                        (seconds < 10 ? '0' : '') + seconds;
                }, 1000);

                
                this.startGame(intervalId);
            } else {
                // Arrêter le jeu
                this.endGame = false;
                button.textContent = 'Start';
                button.classList.remove('active');

                // Arrêter le chronomètre
                clearInterval(intervalId);

                console.log("stop");
            }
        };

        button.addEventListener('click', this.buttonClickHandler);
    }

    startGame(intervalId) {
        const gameLoop = () => {
            
            if (this.endGame) {
                // console.log("marche");
                this.get();
                requestAnimationFrame(gameLoop);
            }else{
                // console.log("STOOOOP");
            }
        };

        requestAnimationFrame(gameLoop);
    }


    drawStart(i, j, scale) {
        let offset = 10;
        let sx = 35; // x-coordinate of the top left corner of the source rectangle
        let sy = 646; // y-coordinate of the top left corner of the source rectangle
        this.ctx.drawImage(
            this.START_IMAGE, 
            sx, sy, 
            30, 26,
            j * this.cellSize+offset, i * this.cellSize+offset, 
            this.cellSize * scale, this.cellSize * scale
        );
    }

    drawObstacle(i, j, scale) {
        let sx = 0; // x-coordinate of the top left corner of the source rectangle
        let sy = 0; // y-coordinate of the top left corner of the source rectangle
        this.ctx.drawImage(
            this.TREE_IMAGE, 
            sx, sy, 
            137, 153,
            j * this.cellSize, i * this.cellSize, 
            this.cellSize * scale, this.cellSize * scale
        );
    }

    drawShadow(i, j, scale) {
        let sx = 48; // x-coordinate of the top left corner of the source rectangle for the shadow
        let sy = 100; // y-coordinate of the top left corner of the source rectangle for the shadow
        let sw = 133 - sx; // width of the source rectangle for the shadow
        let sh = 152 - sy; // height of the source rectangle for the shadow
        
        // Calculate the scale factor based on the original dimensions of the shadow
        let shadowScale = Math.min(this.cellSize * scale / sw, this.cellSize * scale / sh);

        // Adjust this value to move the shadow up or down
        let yOffset = 30;

        this.ctx.drawImage(
            this.SHADOW_IMAGE, 
            sx, sy, 
            sw, sh, 
            j * this.cellSize, (i * this.cellSize) + yOffset, 
            sw * shadowScale, sh * shadowScale
        );
}

    drawObjective(i, j, scale=1.1) {
        let sx = 0;
        let sy = 0;
        let offset = 13;
        this.ctx.drawImage(
            this.KEBAB_IMAGE, 
            sx, sy, 
            499, 499,
            j * this.cellSize+offset, i * this.cellSize+offset, 
            this.cellSize * scale, this.cellSize * scale
        );
    }
    
    drawBackground(grid) {
    let Offset = 20;

    // Calculate the width and height of the grid
    let gridWidth = grid[0].length * this.cellSize;
    let gridHeight = grid.length * this.cellSize;
    
    // Set the canvas width and height
    this.canvas.width = gridWidth+Offset;
    this.canvas.height = gridHeight+Offset;

    // Draw a rectangle that fills the entire grid
    this.ctx.fillStyle = '#72751b'; // Set the fill color to green
    this.ctx.fillRect(0, 0, gridWidth+Offset, gridHeight+Offset);
}
    
    drawGrid(grid) {
        this.drawBackground(grid);
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                let cell = grid[i][j];
                
                if (cell instanceof Free) { 
                    // draw _qty of pheromones with filltext
                    // this.ctx.fillText(cell._qty, i * this.cellSize, j * this.cellSize)
                    // this.ctx.fillStyle = '#000000';
                } else if (cell instanceof Obstacle) {
                    this.drawShadow(i, j, 1.1); 
                    this.drawObstacle(i, j, 1.5);
                }
                else if (cell instanceof Objective) { 
                    this.ctx.globalAlpha = cell._qty;
                    this.drawObjective(i, j, 1.1); // ou scale=1.1*cell._qty
                    this.ctx.globalAlpha = 1;
                }
                else if (cell instanceof Start) { 
                    this.drawStart(i, j, 1);
                }
            }
        }
    }

    drawAnt(i, j, scale=1) {
        let sx = 0;
        let sy = 0;
        this.ctx.drawImage(
            this.ANT_IMAGE, 
            sx, sy, 
            64, 64,
            j * this.cellSize, i * this.cellSize, 
            this.cellSize * scale, this.cellSize * scale
        );
    }
}