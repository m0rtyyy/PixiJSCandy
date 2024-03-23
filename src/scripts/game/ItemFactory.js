import { App } from "../system/App";
import { Tools } from "../system/Tools";
import { Item } from "./Item";


export class ItemFactory {
    static generar(){
        const randomIndex = Tools.randomNumber(0,App.config.itemColors.length-1);
        const color = App.config.itemColors[randomIndex];
        return new Item(color);

    }
}