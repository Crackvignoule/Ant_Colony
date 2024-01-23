export class Ant {
    
    constructor (x,y){
        this.x = x;
        this.y = y;
        this._fps           = 60; // Frame rate.
        this.x_end = x;
        this.y_end = y;
        this._speed         = 1;
    }

    Move(durationFrame) {
        /*
            ArcTan2 permet d'obtenir l'angle en radian entre la position actuelle de notre cube et une position donnée (_positionEnd).
            https://fr.wikipedia.org/wiki/Atan2
        */
        let direction = Math.atan2(-1 * this.y_end - this.y, this.x_end - this.x);
        
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

}