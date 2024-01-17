// VIEW SECTION
class GridView {
    constructor() {
        this.canvas = document.getElementById('myCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.cellSize = 150; // Taille de chaque tuile dans l'image
        this.HEXTILES_IMAGE = new Image();
        this.HEXTILES_IMAGE.src = '../image/tree.png'; // Replace with the correct path to your image
    }

    loadImage() {
        return new Promise((resolve) => {
            this.HEXTILES_IMAGE.addEventListener('load', resolve);
        });
    }

    drawGrid(grid) {
        // Calculate the width and height of the grid
        let gridWidth = grid[0].length * this.cellSize;
        let gridHeight = grid.length * this.cellSize +10;
        let cornerRadius = 10; // Set the corner radius here

        // Start the path for the rounded rectangle
        this.ctx.beginPath();
        this.ctx.moveTo(cornerRadius, 0);
        this.ctx.lineTo(gridWidth - cornerRadius, 0);
        this.ctx.arcTo(gridWidth, 0, gridWidth, cornerRadius, cornerRadius);
        this.ctx.lineTo(gridWidth, gridHeight - cornerRadius);
        this.ctx.arcTo(gridWidth, gridHeight, gridWidth - cornerRadius, gridHeight, cornerRadius);
        this.ctx.lineTo(cornerRadius, gridHeight);
        this.ctx.arcTo(0, gridHeight, 0, gridHeight - cornerRadius, cornerRadius);
        this.ctx.lineTo(0, cornerRadius);
        this.ctx.arcTo(0, 0, cornerRadius, 0, cornerRadius);
        this.ctx.closePath();

        // Fill the rectangle with green color
        this.ctx.fillStyle = '#72751b';
        this.ctx.fill();
    
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                let tileIndex = grid[i][j];
                let sx = tileIndex * this.cellSize;
                let sy = 0;
                this.ctx.drawImage(this.HEXTILES_IMAGE, sx, sy, this.cellSize, this.cellSize, j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
            }
        }
    }}

export default GridView;