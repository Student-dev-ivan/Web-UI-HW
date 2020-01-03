import { TemplaterSearch } from "./TemplaterSearch.js";

export class ViewSearch {
    constructor() {
        this.domMenu = document.querySelector('.ui.borderless.fixed.menu');
        this.renderMenu();
    }
    renderMenu() {
        this.domMenu.innerHTML = TemplaterSearch.getMenuTemplate();
        this.input = document.querySelector('.input__search');
    }
    addListeners(searchFunc, filterFunc) {
        document.querySelector('.ui.search').addEventListener('click', searchFunc);
        document.querySelector('.ui.search').addEventListener('keypress', searchFunc);
        document.querySelector('.ui.container.search__menu').addEventListener('click', filterFunc);
    }
    selectSpecies(element) {
        this.domMenu.querySelector('.active').classList.toggle('active');
        element.classList.toggle('active');
    }
    getInputValue() {
        return this.input.value.trim();
    }
    // clearInput() {
    //     this.input.value = '';
    // }

}