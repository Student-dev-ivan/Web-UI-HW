import { ControllerPets } from './components/pets/ControllerPets.js';
import { ControllerSearch } from './components/search/ControllerSearch.js';
import { ControllerCart } from './components/cart/ControllerCart.js';
import { Publisher } from './share/Publisher.js';


const publisher = new Publisher();
const menu = new ControllerSearch(publisher.methods);
const pets = new ControllerPets(publisher.methods);
const cart = new ControllerCart(publisher.methods);
