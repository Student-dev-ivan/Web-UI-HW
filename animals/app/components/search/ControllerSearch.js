import { ViewSearch } from "./ViewSearch.js";
import { ModelSearch } from "./ModelSearch.js";

export class ControllerSearch {
    constructor({ publish }) {
        this.view = new ViewSearch();
        this.model = new ModelSearch();
        this.model.updateSelectedSpecies('all');
        this.model.updateEnteredBreed('');
        this.view.addListeners(this.handleSearch.bind(this), this.handleFilter.bind(this), this.handleSort.bind(this));
        this.publish = publish;
    }
    handleSearch(event) {
        if (event.keyCode === 13 || event.target.classList.value === 'search icon') {
            // this.publish('onSearch', this.view.getInputValue());
            const breed = this.view.getInputValue();
            this.model.updateEnteredBreed(breed);
            this.publish('onSearch', { breed, species: this.model.getSelectedSpecies() });
        }
    }
    handleFilter(event) {
        const element = event.target;
        const species = element.dataset.species;
        if (!!species) {
            this.model.updateSelectedSpecies(species);
            this.publish('onFilter', { species, breed: this.model.getEnteredBreed() });
            this.view.selectSpecies(element);
            // this.view.clearInput();
        }
    }
    handleSort(event) {
        const element = event.target;
        let sort = element.dataset.sort;
        if (!!sort) {
            sort = sort.split(' ');
            console.log(sort);
            this.publish('onSort', { field: sort[0], order: sort[1] });
        }
    }
}