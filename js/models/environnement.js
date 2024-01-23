import {Ant} from './ant.js';

export class Environnement {
    constructor() {  
        this.NUMBER_ANTS = 1;      
    }
    
    bindDisplayAnts (callback) {
        this.DisplayAnts = callback;
      }
    getAnts () {
        let ants = this.createAnts(this.NUMBER_ANTS);
        this.DisplayAnts(ants);
    }
    // TODO
    createAnts(count) {
        const ants = [];
        for (let i = 0; i < count; i++) {
            let ant = new Ant(9, 10);
            ants.push(ant);
        }
        return ants;
    }

}