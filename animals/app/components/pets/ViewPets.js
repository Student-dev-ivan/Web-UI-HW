import { TemplaterPets } from './TemplaterPets.js';

export class ViewPets {
    constructor() {
        this.domPets = document.querySelector('.root');
        this.domPages = document.querySelector('.pages');
    }
    renderAllCards(allAnimals) {
        this.domPets.innerHTML = allAnimals.map(animal => TemplaterPets.getPetTemplate(animal)).join('');
    }
    renderPaginationMenu(page, allPages) {
        this.domPages.innerHTML = TemplaterPets.getPageButtonsTemplate(page, allPages);
    }
    renderNoPetMessage(query) {
        this.domPets.innerHTML = TemplaterPets.getNoPetTemplate(query);
    }
    renderModalInfo(animal) {
        this.domPages.insertAdjacentHTML('beforeend', TemplaterPets.getModalInfoTemplate(animal));
    }
    addListeners(pageClickFunc, detailsClickFunc) {
        this.domPages.addEventListener('click', pageClickFunc);
        this.domPets.addEventListener('click', detailsClickFunc);
    }
    addRemoveToggle(button) {
        button.innerText = button.innerText === 'Add to cart' ? 'Remove' : 'Add to cart';
        button.classList.toggle('remove');
    }
}