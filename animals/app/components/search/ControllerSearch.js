import { ViewSearch } from "./ViewSearch.js";

export class ControllerSearch {
    constructor({ publish }) {
        this.view = new ViewSearch();
        this.view.addListeners(this.handleSearch.bind(this));
        this.publish = publish;
    }
    handleSearch(event) {
        if (event.keyCode === 13 || event.target.classList.value === 'search icon') {
            this.publish('onSearch', this.view.input.value.trim());
        }
    }
}