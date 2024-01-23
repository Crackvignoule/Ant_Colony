export class Ant {
    
    constructor (x,y){

        this._startTime     = Date.now();
        this._lag           = 0;
        this._fps           = 60; // Frame rate.
        this._frameDuration = 1000 / this._fps;
        this._position      = {x: x, y: y};
        this._positionEnd   = {x: 1, y: 1};
        this._cellSize      = 100; // px.
        this._speed         = 1;
        this._timer         = 0;
    }

    Move(durationFrame) {
        /*
            ArcTan2 permet d'obtenir l'angle en radian entre la position actuelle de notre cube et une position donnée (_positionEnd).
            https://fr.wikipedia.org/wiki/Atan2
        */
        let direction = Math.atan2(-1 * this._positionEnd.y, this._positionEnd.x);
        
        /*
            Calculer le vecteur direction:
            https://reglecompas.fr/wp-content/uploads/2020/10/coord-trigo.png
        */
        let dx = Math.cos(direction); // cos(0) = 1 ; cos(pi) = -1 ; cos(pi/2) = 0.
        let dy = Math.sin(direction) * -1; // sin(0) = 0 ; sin(pi) = 0 ; sin(pi/2) = 1 ; -1 car canvas inverse l'axe Y.
        // Multiplier la direction par la vitesse.
        this._position.x += dx * this._speed / this._fps; // cellGrid/seconde. On divise par les fps car la fonction est appelée toutes les frames.
        this._position.y += dy * this._speed / this._fps;
    }


    Display() {
        let x = this._position.x * this._cellSize;
        let y = this._position.y * this._cellSize;
        let canvas = document.getElementById('myCanvas');
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw vertical limit line.
        ctx.beginPath(); // Start a new path
        ctx.moveTo(100, 0); // Move the pen to (100, 0)
        ctx.lineTo(100, 100); // Draw a line to (150, 100)
        ctx.stroke(); // Render the path
        // Draw horizontal limit line.
        ctx.beginPath(); // Start a new path
        ctx.moveTo(0, 100); // Move the pen to (100, 0)
        ctx.lineTo(100, 100); // Draw a line to (150, 100)
        ctx.stroke(); // Render the path
        
        // Draw a filled square.
        ctx.fillRect(x, y, 10, 10);
    }

    Update() {
        // Compute deltaTime.
        let currentTime = Date.now();
        let deltaTime   = currentTime - this._startTime;
        this._lag += deltaTime;
        this._startTime = currentTime;
        this._timer += deltaTime;

        // Update the logic if the lag counter is greater than or equal to the frame duration.
        while (_lag >= this._frameDuration) {
            // Update the logic and view.
            Move(this._frameDuration);
            Display();
            // Reduce the lag counter by the frame duration.
            this._lag -= this._frameDuration;
        }

        if (this._position.x < 1) {
            requestAnimationFrame(Update);
        }

        console.log(this._position, this._timer / 1000);
    }

    // move(direction) {
    //     switch(direction) {
    //         case 'up':
    //             this.y -= 1;
    //             break;
    //         case 'down':
    //             this.y += 1;
    //             break;
    //         case 'left':
    //             this.x -= 1;
    //             break;
    //         case 'right':
    //             this.x += 1;
    //             break;
    //     }
    // }

    bindDisplayAnts (callback) {
        this.DisplayAnts = callback;
      }

    getAnts () {
        this.DisplayAnts();
      }
}