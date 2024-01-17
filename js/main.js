import GridModel from './models/grid.js';
import GridView from './views/gridView.js';
import GridController from './controllers/gridController.js';

let model = new GridModel();
let view = new GridView();
let controller = new GridController(model, view);

view.loadImage().then(() => {
    controller.displayGrid();
});

let minutes = 0;
let seconds = 0;
let intervalId = null;

document.getElementById('start-button').addEventListener('click', function() {
    let button = this;

    if (button.textContent === 'Start') {
        button.textContent = 'Stop';
        button.classList.add('active');
        intervalId = setInterval(function() {
            seconds++;
            if (seconds >= 60) {
                minutes++;
                seconds = 0;
            }

            document.getElementById('chrono').textContent = 
                (minutes < 10 ? '0' : '') + minutes + ':' + 
                (seconds < 10 ? '0' : '') + seconds;
        }, 1000);
    } else {
        button.textContent = 'Start';
        button.classList.remove('active');
        clearInterval(intervalId);
    }
});