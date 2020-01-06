import { ModelPets } from './ModelPets.js';
import { ViewPets } from './ViewPets.js';

export class ControllerPets {
    constructor({ subscribe, publish }) {
        this.model = new ModelPets();
        this.view = new ViewPets();
        this.subscribe = subscribe;
        this.publish = publish;
        this.subscribe('onSearch', this.updatePetsList.bind(this));
        this.subscribe('onFilter', this.updatePetsList.bind(this));
        this.subscribe('onAddToCart', this.handleAddToCart.bind(this));
        this.subscribe('onRemoveFromCart', this.handleRemoveFromCart.bind(this));//add function
        this.updatePetsList({ breed: '', species: 'all' });
        this.subscribe('onBackFromCart', this.updatePage.bind(this));
        this.subscribe('onSort', this.handleSort.bind(this));
        this.view.addListeners(this.handlePageClick.bind(this), this.handleCardButtonClick.bind(this));
    }

    updatePetsList({ breed, species }) {
        this.model.getPets(breed, species).then((animals) => {
            this.updatePage();
            if (animals.length === 0) {
                this.view.renderNoPetMessage(breed);
            }
        });
    }

    filterPetsList(species) {
        this.model.filterPets(species);
        this.updatePage();
    }

    updatePage(page = 1) {
        this.model.updateCurrentPageNumber(page);
        this.view.renderAllCards(this.model.getAnimalsAtPage(page));
        this.view.renderPaginationMenu(page, this.model.getPagesCount());
    }

    handlePageClick(event) {
        const targetText = event.target.innerText.trim();
        let page;
        switch (true) {
            case targetText === 'First':
                page = 1;
                break;
            case targetText === 'Last':
                page = this.model.getPagesCount();
                break;
            default:
                page = Number(targetText);
        }
        if (isNaN(page)) {
            return;
        }
        this.updatePage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    handleCardButtonClick(event) {
        const dataset = event.target.dataset;
        const id = Number(dataset.id);
        const btn = dataset.btn;
        if (isNaN(id)) {
            return;
        }
        if (btn === 'details') {
            this.view.renderModalInfo(this.model.getPetById(id));
            $('.ui.modal')
                // .modal('setting', 'transition', 'scale')
                .modal('show')
                .modal('setting', 'onHidden', () => {
                    const el = document.querySelector('.ui.dimmer.modals.page');
                    el.parentNode.removeChild(el);
                });
        }
        if (btn === 'cart') {
            this.handleCart(id);
        }
    }

    handleAddToCart(id) {
        this.model.updateSessionStorage(id, true);
    }

    handleRemoveFromCart(id) {
        this.model.updateSessionStorage(id, false);
    }

    handleCart(id) {
        const pet = this.model.getPetById(id);
        if (!pet.in_cart) {
            this.publish('onAddToCart', id);
        } else {
            this.publish('onRemoveFromCart', id);
        }
        this.view.addRemoveToggle(event.target);
    }

    handleSort(sort) {
        this.model.sortAnimals(sort);
        this.updatePage(this.model.getCurrentPage());
    }
}