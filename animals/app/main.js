import { ControllerPets } from './components/pets_cards/ControllerPets.js';
import { ControllerSearch } from './components/search/ControllerSearch.js';
import { Publisher } from './share/Publisher.js';

const publisher = new Publisher();
const menu = new ControllerSearch(publisher.methods);
const pets = new ControllerPets(publisher.methods);