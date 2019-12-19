import { TemplaterPet } from './TemplatePet.js';
import { Paginator } from '../utils/Paginator.js'

export class ViewPets {
    constructor() {
        this.domPets = document.querySelector('.root');
        this.templater = new TemplaterPet();
        this.paginator = new Paginator();
    }
    renderCard(animal) {
        return this.templater.getPetTemplate(animal);
    }
    renderAllCards(allAnimals) {
        let cards = '';
        allAnimals.forEach(animal => {
            cards += this.renderCard(animal);
        });
        this.domPets.innerHTML = cards;
    }

}