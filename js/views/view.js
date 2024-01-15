class View {
    constructor(div_id) {
      this.div_id = div_id;
      this.p_tag;
      this.cellSize = 150; // Taille de chaque tuile dans l'image
      this.canvas = document.getElementById('myCanvas');
      this.ctx = this.canvas.getContext('2d');
      this.initView();
    }

    displaygrid(){
        const HEXTILES_IMAGE = new Image();
        HEXTILES_IMAGE.src = '../image/tree.png'; // Mettez le chemin correct de l'image ici
        Promise.all([
            new Promise((resolve) => { HEXTILES_IMAGE.addEventListener('load', () => { resolve(); }); })
        ])
        .then(() => {
            // MODEL SECTION
            let grid = getGrid()

            // VIEW SECTION
            for (let i = 0; i < grid.length; i++) {
                for (let j = 0; j < grid[i].length; j++) {
                    let tileIndex = grid[i][j];
                    let sx = tileIndex * cellSize;
                    let sy = 0;
                    this.ctx.drawImage(HEXTILES_IMAGE, sx, sy, this.cellSize, this.cellSize, j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
                }
            }
        });
    }
    // Binding.
    bindGetCNF (callback) {
      this.getCNF = callback; // On veut pouvoir demander au Model (depuis le Controller) une nouvelle Chuck Norris Fact.
    }

    initView () {
      let div = document.querySelector(`#${this.div_id}`);
      this.p_tag = document.createElement('p');
      this.p_tag.innerHTML = 'Click to display a new Chuck Norris Fact.';
      let button = document.createElement('button');
      button.innerHTML = 'New Chuck Norris Fact';
      button.addEventListener('click', () => {
        this.getCNF();
      });
      div.appendChild(this.p_tag);
      div.appendChild(button);
    }

    displayCNF (cnf_value) {
        if (this.p_tag) {
          this.p_tag.innerHTML = cnf_value;
        }
      }

}
