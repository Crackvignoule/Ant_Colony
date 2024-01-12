class Grid {
    constructor(canvasId, gridSize) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = gridSize;
        this.numCellsX = this.canvas.width / this.gridSize;
        this.numCellsY = this.canvas.height / this.gridSize;
    }

    drawGrid() {
        for (let x = 0; x < this.numCellsX; x++) {
            for (let y = 0; y < this.numCellsY; y++) {
                this.ctx.strokeRect(x * this.gridSize, y * this.gridSize, this.gridSize, this.gridSize);
            }
        }
    }
}