import { App } from "../system/App";
import * as PIXI from "pixi.js";
import { Bloque } from "./Bloque";
import { Item } from "./Item";
import { ItemFactory } from "./ItemFactory";

export class Panel {
    constructor(){
        this.container = new PIXI.Container();
        this.bloques = [];
        this.rows = App.config.panel.rows;
        this.cols =  App.config.panel.cols;
        this.crear();
        this.ajustarPosicion();


    }

    crear() {
        this.crearBloques();
        this.crearItems();
        
    }

    crearItems(){
        this.bloques.forEach(bloque => this.crearItem(bloque))
     }

     crearItem(bloque){
        const item = ItemFactory.generar();
        item.sprite.interactive = true;
        item.sprite.on("pointerdown", () =>{
            this.container.emit("item-touch-start", item);
        })
        bloque.setItem(item);
        this.container.addChild(item.sprite); 
     }


    crearBloques(){
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
              this.crearBloque(row,col);  
            }
        }
    }

    crearBloque(row,col){
        const bloque = new Bloque(row,col);
        this.bloques.push(bloque);
        this.container.addChild(bloque.sprite);

    }

    ajustarPosicion(){
        this.tamanioBloque = this.bloques[0].sprite.width;
        this.anchoPanel = this.cols * this.tamanioBloque;
        this.altoPanel = this.rows * this.tamanioBloque;
        //Aqui ajustamos la posicion Cogemos todo el ancho de la panbtalla emnos el panel. Lo dividimos entre dos y le sumamos la mitad del ancho de un bloque.
        this.container.x = (window.innerWidth - this.anchoPanel) /2 + this.tamanioBloque/2 ;
        this.container.y = (window.innerHeight - this.altoPanel) /2 + this.tamanioBloque/2 ;

        console.log(this.anchoPanel, this.altoPanel);

    }


}