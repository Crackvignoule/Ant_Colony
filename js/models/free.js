import {Cell} from "./cell.js";

export class Free extends Cell {
    constructor(x, y, qty = 0.0) {
        super(x, y);
        this._qty = qty;
    }

    GetQty() { return this._qty;  }
    SetQty(newValue) { this._qty = newValue; }

    evaporate(){
        if(this._qty>0){
            if(this._qty < 0.02){
                this._qty = 0;
            }else{
                this._qty -= 0.02;
            }
            
        }
    }
}