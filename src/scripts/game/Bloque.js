import { App } from "../system/App";
import { Item } from "./Bloque";

export class Bloque {
    constructor(row, col) {
        this.row = row;
        this.col = col;

        this.item = null;

        this.sprite = App.sprite("field");
        this.sprite.x = this.position.x;
        this.sprite.y = this.position.y;
        //este ancho nos permise que se situe el centro justo en medio.
        this.sprite.anchor.set(0.5);

        this.seleccionado = App.sprite("field-selected");
        this.seleccionado.anchor.set(0.5);
        this.seleccionado.visible=false;
        this.sprite.addChild(this.seleccionado);


    }

    setItem(item){
        this.item = item;
        item.bloque = this;
        item.setPosicion(this.position)
    }

    seleccionar(){
        //Cambiamos la imagen
        this.seleccionado.visible = true;

    }

    desSeleccionar(){
        this.seleccionado.visible = false;

    }


    get position() {
        return {
            x: this.col * this.sprite.width,
            y: this.row * this.sprite.height
        }
    }

  
}