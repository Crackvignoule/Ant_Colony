import {Free} from "../models/free.js";
import {Obstacle} from "../models/obstacle.js";
import {Objective} from "../models/objective.js";
import {Start} from "../models/start.js";

// VIEW SECTION
class GridView {
    constructor() {
        this.canvas = document.getElementById('myCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.cellSize = 36; // Taille de chaque tuile dans l'image
        this.START_IMAGE = new Image();
        this.START_IMAGE.src = '../image/foodAndColony.png'; //35 646
        this.TREE_IMAGE = new Image();
        this.TREE_IMAGE.src = '../image/tree.png'; 
        this.SHADOW_IMAGE = new Image();
        this.SHADOW_IMAGE.src = '../image/shadow.png';
        this.KEBAB_IMAGE = new Image();
        this.KEBAB_IMAGE.src = '../image/kebab.png'; 
    }

    loadImage() {
        return Promise.all([
            new Promise((resolve) => {
                this.TREE_IMAGE.addEventListener('load', resolve);
            }),
            new Promise((resolve) => {
                this.SHADOW_IMAGE.addEventListener('load', resolve);
            })
        ]);
    }

    drawStart(i, j, scale) {
        let sx = 35; // x-coordinate of the top left corner of the source rectangle
        let sy = 646; // y-coordinate of the top left corner of the source rectangle
        this.ctx.drawImage(
            this.START_IMAGE, 
            sx, sy, 
            30, 26,
            j * this.cellSize, i * this.cellSize, 
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

    drawObjective(i, j, scale) {
        let sx = 0;
        let sy = 0;
        this.ctx.drawImage(
            this.KEBAB_IMAGE, 
            sx, sy, 
            499, 499,
            j * this.cellSize, i * this.cellSize, 
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
                    // this.drawFree(i, j, 1);
                } else if (cell instanceof Obstacle) {
                    this.drawShadow(i, j, 1.1); 
                    this.drawObstacle(i, j, 1.5);
                }
                else if (cell instanceof Objective) { 
                    this.drawObjective(i, j, 1);
                }
                else if (cell instanceof Start) { 
                    this.drawStart(i, j, 1);
                }
            }
        }
    }
}

export default GridView;