import { Templater } from "./Templater.js";

export class ViewSearch {
    constructor() {
        this.domMenu = document.querySelector('.ui.borderless.fixed.menu');
        this.renderMenu();
    }
    renderMenu() {
        this.domMenu.innerHTML = Templater.getMenuTemplate();
        this.input = document.querySelector('.input__search');
    }
    addListeners(searchFunc) {
        document.querySelector('.ui.search').addEventListener('click', searchFunc);
        document.querySelector('.ui.search').addEventListener('keypress', searchFunc);
    }
}