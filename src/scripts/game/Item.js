import gsap from "gsap";
import { App } from "../system/App";

export class Item {
    constructor(color){
        this.item = null;
        this.bloque = null;

        this.color = color;
        this.sprite = App.sprite(this.color);
        this.sprite.anchor.set(0.5);
    }

    moverA(position, duration){
        return new Promise(resolve =>{
            //GSAP, Le enviamos el sprite,y asignamos duracion yconfiguracion de pixi que se cmabiara durante la animacion
            gsap.to(this.sprite, {
                duration,
                pixi:{
                    x: position.x,
                    y: position.y, 
                },
                onComplete: () => {
                    resolve();
                }
            })
        })
    }

    setPosicion(posicion){
        this.sprite.x = posicion.x;
        this.sprite.y = posicion.y;

    }

    
}

