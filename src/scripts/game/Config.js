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
    },
    reglasCombinacion: [
        [
            {col:1, row:0},{col:2, row:0}
        ],
        [
            {col:0, row:1},{col:0, row:2}
        ],
    ],
};