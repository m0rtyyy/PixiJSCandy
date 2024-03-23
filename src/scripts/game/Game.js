import { App } from "../system/App";
import { Scene } from "../system/Scene";
import { Bloque } from "./Bloque";
import { Panel } from "./Panel";

export class Game extends Scene {
    create() {
        this.createBackground();
        this.createPanel();
    }

    createPanel() {
        this.panel = new Panel();
        this.container.addChild(this.panel.container);
    }

    createBackground() {
        this.bg = App.sprite("bg");
        this.container.addChild(this.bg);
        this.bg.width = window.innerWidth;
        this.bg.height = window.innerHeight;
    }
}