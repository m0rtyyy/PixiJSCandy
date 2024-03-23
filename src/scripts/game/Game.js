import { App } from "../system/App";
import { Scene } from "../system/Scene";
import { Bloque } from "./Bloque";
import { Panel } from "./Panel";

export class Game extends Scene {
    create() {
        this.desactivado = false;
        this.itemSeleccionado = null;
        this.createBackground();
        this.createPanel();
    }

    createPanel() {
        this.panel = new Panel();
        this.container.addChild(this.panel.container);
        //cuando aparezca este evento (Lo emite el panel)
        this.panel.container.on("item-touch-start", this.onItemClick.bind(this));
    }

    onItemClick(item){
        if(this.desactivado){
            return;
        }
        //1. Seleccionar un nuevo item si no hay ningun seleccionado
        if (!this.itemSeleccionado) {
            this.seleccionarItem(item);
        }else{
            //Chequeamos que están cercas
            if(!this.itemSeleccionado.esVecino(item)){
                this.limpiarSeleccion();
                this.seleccionarItem(item)
            }else{
                //2. Arrastrar el item si hay uno seleccionado
                this.swap(this.itemSeleccionado,item);
            }
        }

        
        //3. Seleccionar un nuevo item si es el continuo (No puede mover mas de 1);
    }
    limpiarSeleccion(){
        if(this.itemSeleccionado){
            this.itemSeleccionado.bloque.desSeleccionar();
            this.itemSeleccionado = null;
        }
    }

    //item es el que he seleccionado
    swap(itemSeleccionado, item){
        this.desactivado = true; //Bloqueamos el panel para evitar movimientos de Items mientras la animacion está ocurriendo
        this.limpiarSeleccion(); // Esconde el item seleccionado
        
        itemSeleccionado.moverA(item.bloque.position, 0.2); 
        item.moverA(itemSeleccionado.bloque.position, 0.2).then(() =>{
            this.panel.swap(itemSeleccionado,item);
            this.desactivado = false; //bloqueamos
        }); 
        //1. Reiniciar bloques al mover el item
        //2. Reiniciar items en el panel de bloques
        //3. Ocupar el item en la nueva posicion del nuevo bloque.

    }

    seleccionarItem(item){
        // Recordar el item seleccionado
        this.itemSeleccionado = item;
        // Hightlight
        this.itemSeleccionado.bloque.seleccionar()

    }

    createBackground() {
        this.bg = App.sprite("bg");
        this.container.addChild(this.bg);
        this.bg.width = window.innerWidth;
        this.bg.height = window.innerHeight;
    }
}