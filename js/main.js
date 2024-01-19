import GridModel from './models/grid.js';
import GridView from './views/gridView.js';
import GridController from './controllers/gridController.js';


const START_IMAGE = new Image();
START_IMAGE.src = '../image/foodAndColony.png';

const TREE_IMAGE = new Image();
TREE_IMAGE.src = '../image/tree.png';

const SHADOW_IMAGE = new Image();
SHADOW_IMAGE.src = '../image/shadow.png';

const KEBAB_IMAGE = new Image();
KEBAB_IMAGE.src = '../image/kebab.png';

const ANT_IMAGE = new Image();
ANT_IMAGE.src = '../image/ant.png';

Promise.all([
    new Promise( (resolve) => {START_IMAGE.addEventListener('load', () => { resolve();}); }),
    new Promise( (resolve) => {TREE_IMAGE.addEventListener('load', () => { resolve();}); }),
    new Promise( (resolve) => {SHADOW_IMAGE.addEventListener('load', () => { resolve();}); }),
    new Promise( (resolve) => {KEBAB_IMAGE.addEventListener('load', () => { resolve();}); }),
    new Promise( (resolve) => {ANT_IMAGE.addEventListener('load', () => { resolve();}); })
])
.then(() => {
    const app = new GridController(new GridModel(), new GridView(START_IMAGE, TREE_IMAGE, SHADOW_IMAGE, KEBAB_IMAGE, ANT_IMAGE));
});



























/*
let model = new GridModel();
let view = new GridView();
let controller = new GridController(model, view);

view.loadImage().then(() => {
    controller.displayGrid();
});


*/











// let minutes = 0;
// let seconds = 0;
// let intervalId = null;

// // // Mettre chrono dans MVC pour que les fourmis puissent s'arrêter avec le chrono
// document.getElementById('start-button').addEventListener('click', function() {
//     let button = this;

//     if (button.textContent === 'Start') {
//         button.textContent = 'Stop';
//         button.classList.add('active');
//         intervalId = setInterval(function() {
//             seconds++;
//             if (seconds >= 60) {
//                 minutes++;
//                 seconds = 0;
//             }

//             document.getElementById('chrono').textContent = 
//                 (minutes < 10 ? '0' : '') + minutes + ':' + 
//                 (seconds < 10 ? '0' : '') + seconds;
//         }, 1000);
//     } else {
//         button.textContent = 'Start';
//         button.classList.remove('active');
//         clearInterval(intervalId);
//     }
// });