import { App } from "../system/App";

export class CombinationManager{
    constructor(panel){
        this.panel = panel
    }


    getMatches(){
        let resultados = [];

        this.panel.bloques.forEach(bloqueCheck => {
            App.config.reglasCombinacion.forEach(regla => {
                let matches = [bloqueCheck.item];
                regla.forEach(position =>{
                    const row = bloqueCheck.row + position.row;
                    const col = bloqueCheck.col + position.col;
                    const camposComparados = this.panel.getField(row,col);
                    if(camposComparados && camposComparados.item.color === bloqueCheck.item.color ){
                        matches.push(camposComparados.item);
                    }
                });

                if(matches.length === regla.length + 1){
                    resultados.push(matches);
                }
            })
        });

        return resultados;
    }
}