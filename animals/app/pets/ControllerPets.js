import { ModelPets } from './ModelPets.js';
import { ViewPets } from './ViewPets.js';

export class ControllerPets {
    constructor() {
        this.model = new ModelPets();
        this.view = new ViewPets();
        this.passPetsToView();
    }
    passPetsToView() {
        this.model.getPets().then((animals) => this.view.renderAllCards(animals));
    }
}