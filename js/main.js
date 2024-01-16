import GridModel from './models/grid.js';
import GridView from './views/GridView.js';
import GridController from './controllers/gridController.js';

let model = new GridModel();
let view = new GridView();
let controller = new GridController(model, view);

view.loadImage().then(() => {
    controller.displayGrid();
});