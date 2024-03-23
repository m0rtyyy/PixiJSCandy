import { App } from "../system/App";
import { Scene } from "../system/Scene";
import { Bloque } from "./Bloque";
import { CombinationManager } from "./CombinationManager";
import { Panel } from "./Panel";

export class Game extends Scene {
    create() {
        this.desactivado = false;
        this.itemSeleccionado = null;
        this.createBackground();
        this.createPanel();
        this.combinationManager = new CombinationManager(this.panel);
        this.removeStartMatches();

    }

    removeStartMatches(){
        let matches = this.combinationManager.getMatches();
        console.log(matches);

        while (matches.length) {
            this.eliminarMatches(matches);

            const fields = this.panel.bloques.filter(bloque => bloque.item == null);
            fields.forEach(emptyField => {
                this.panel.crearItem(emptyField);
            });
             matches = this.combinationManager.getMatches();

        }

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
            const matches = this.combinationManager.getMatches();
            if(matches.length) {
                this.procesarMatches(matches);
            }
            console.log(matches);
        }); 
        //1. Reiniciar bloques al mover el item
        //2. Reiniciar items en el panel de bloques
        //3. Ocupar el item en la nueva posicion del nuevo bloque.

    }

    procesarMatches(matches){
        this.eliminarMatches(matches);
        this.procesarFallDown()
        .then(() => this.anadirItems())
        .then(() => this.onFallDownOver());
    }

    onFallDownOver(){
        const matches = this.combinationManager.getMatches();

        if(matches.length){
            this.procesarMatches(matches)
        }else{
            this.desactivado = false; //bloqueamos

        }
    }

    anadirItems(){
        return new Promise(resolve =>{
            //1. Obtenemos los campos vacios
            const fields = this.panel.bloques.filter( bloque => bloque.item === null);
            let total = fields.length;
            let completed = 0;
            //2. iteramos cada campo
            fields.forEach(field => {
            //3. Creamos un nuevo item
            const item = this.panel.crearItem(field);
            //4. Colocamos el item en el panel
            item.sprite.y= -500;

            const delay = Math.random() * 2/10 + 0.3/(field.row + 1);
            
            //5. Movemos el item creado en el campo vacio correspondiente
            item.caerA(field.position,delay).then(()=>{
                ++completed;
                if(completed >= total){
                    resolve();
                }
            })
            
            });


        })
    }

    //Chequeamos de abajo arriba cada bloque. si hay uno vacío debemos bajar los otros
    procesarFallDown(){
        return new Promise(resolve =>{
            let completed = 0;
            //Animacion de empezar
            let started = 0;

            for (let row = this.panel.rows-1; row >= 0; row--) {
                for (let col = this.panel.cols-1; col >= 0; col--) {
                    const bloque = this.panel.getField(row,col);
                    //Si ha encontrado uno vacio   
                    if(!bloque.item) {
                        ++started;
                        //Cambiar todos los items que estan en la misma columna de todas las filas
                        this.caerA(bloque).then(()=>{
                            completed++;

                            if(completed>=started){
                                resolve();
                            }
                        })
                    }
                }
               
                
            }
        });
    }

    caerA(emptyField) {
        //Chequear todas los bloques del panel que son mayores que el
        for (let row = emptyField.row-1; row >=0; row--) {
            let fallingField = this.panel.getField(row, emptyField.col);  
            //Encuentra el primer bloque con item
            if(fallingField.item) {
                //El primer item encontrado debe de ser desplazado a la posicion actual
                const fallingItem = fallingField.item;
                fallingItem.bloque = emptyField;
                emptyField.item = fallingItem;
                fallingField.item = null;

                // Hacer la animacion del item moviendose y pararla cuando encuentre un item debajo.
                return fallingItem.caerA(emptyField.position);
            }          
        }

        return Promise.resolve();
    }

    eliminarMatches(matches){
        matches.forEach(match => {
            match.forEach(item =>{
                item.eliminar();
            })
        });
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