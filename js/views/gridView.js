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
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                let tileIndex = grid[i][j];
                let sx = tileIndex * this.cellSize;
                let sy = 0;
                this.ctx.drawImage(this.HEXTILES_IMAGE, sx, sy, this.cellSize, this.cellSize, j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
            }
        }
    }
}

export default GridView;