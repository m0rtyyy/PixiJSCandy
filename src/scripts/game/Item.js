import { App } from "../system/App";

export class Item {
    constructor(color){
        this.item = null;
        
        this.color = color;
        this.sprite = App.sprite(this.color);
        this.sprite.anchor.set(0.5);
    }

    setPosicion(posicion){
        this.sprite.x = posicion.x;
        this.sprite.y = posicion.y;

    }
}