import { Tools } from "../system/Tools";
import { Game } from "./Game";

export const Config = {
    scenes: {
        Game
    },
    itemColors: ["blue","green","orange","pink","red","yellow"],
    loader: Tools.massiveRequire(require["context"]('./../../sprites/', true, /\.(mp3|png|jpe?g)$/)),
    panel: {
        rows: 6,
        cols: 6,
    }
};