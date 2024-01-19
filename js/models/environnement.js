export class Environnement {
    
    // TODO
    createAnts(count) {
        const ants = [];
        for (let i = 0; i < count; i++) {
            let ant = new Ant(10, 9);
            ants.push(ant);
        }
        return ants;
    }

}