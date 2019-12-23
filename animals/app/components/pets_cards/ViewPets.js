import { Templater } from './Templater.js';

export class ViewPets {
    constructor() {
        this.domPets = document.querySelector('.root');
        this.domPages = document.querySelector('.pages');
    }
    renderAllCards(allAnimals) {
        this.domPets.innerHTML = allAnimals.map(animal => Templater.getPetTemplate(animal)).join('');
    }
    renderPaginationMenu(page, allPages) {
        this.domPages.innerHTML = Templater.getPageButtonsTemplate(page, allPages);
    }
    renderNoPetMessage(query) {
        this.domPets.innerHTML = Templater.getNoPetTemplate(query);
    }
    renderModalInfo(animal) {
        this.domPets.insertAdjacentHTML('beforebegin', Templater.getModalInfoTemplate(animal));
    }
    addListeners(pageClickFunc, detailsClickFunc) {
        this.domPages.addEventListener('click', pageClickFunc);
        this.domPets.addEventListener('click', detailsClickFunc);
    }
}