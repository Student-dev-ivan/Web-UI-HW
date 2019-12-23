import { ModelPets } from './ModelPets.js';
import { ViewPets } from './ViewPets.js';

export class ControllerPets {
    constructor({ subscribe }) {
        this.model = new ModelPets();
        this.view = new ViewPets();
        this.subscribe = subscribe;
        this.subscribe('onSearch', this.updatePetsList.bind(this));
        this.updatePetsList();
        this.view.addListeners(this.handlePageClick.bind(this), this.handleDetailsClick.bind(this));
    }
    updatePetsList(query) {
        // if (query === '') {
        //     return;
        // }
        this.model.getPets(query).then(() => {
            if (this.model.animals.length != 0) {
                this.updatePage(1);
            } else {
                this.updatePage(1);
                this.view.renderNoPetMessage(query);
            }
        });
    }
    updatePage(page) {
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
        this.updatePage(page);
    }
    handleDetailsClick(event) {
        const data = event.target.attributes['data-id'];
        if (!!data) {
            console.log(data.value)
            console.log(this.model.getPetById(Number(data.value)))
            this.view.renderModalInfo(this.model.getPetById(Number(data.value)));
            $('.ui.modal')
                .modal('setting', 'transition', 'scale')
                .modal('show');
        }

    }
}






//SCRIPT FOR MODAL

// $('.ui.modal')
//     .modal('setting', 'transition', 'scale')
//     .modal('show');