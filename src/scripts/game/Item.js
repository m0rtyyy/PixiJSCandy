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


    caerA(position, delay) {
        return this.moverA(position, 0.5, delay, "bounce.out")
    } 

    //Chequeamos las coordenadas de los posibles vecinos.
    //calculando la diferencia entre columnas y filas
    esVecino(item){
        return Math.abs(this.bloque.row - item.bloque.row) + Math.abs(this.bloque.col - item.bloque.col) === 1
    }

    moverA(position, duration, delay, ease){
        return new Promise(resolve =>{
            //GSAP, Le enviamos el sprite,y asignamos duracion yconfiguracion de pixi que se cmabiara durante la animacion
            gsap.to(this.sprite, {
                duration,
                delay,
                pixi:{
                    x: position.x,
                    y: position.y, 
                },
                ease,
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


    eliminar(){
        if(!this.sprite){
            return;
        }
        this.sprite.destroy();
        this.sprite = null;

        if(this.bloque) {
            this.bloque.item = null;
            this.bloque = null;
        }
    }

    
}

