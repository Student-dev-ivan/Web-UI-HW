import { ViewCart } from './ViewCart.js';
import { ModelCart } from './ModelCart.js';

export class ControllerCart {
    constructor({ subscribe, publish }) {
        this.model = new ModelCart();
        this.view = new ViewCart(this.model.getCartItemsCount());
        this.subscribe = subscribe;
        this.publish = publish;
        this.subscribe('onAddToCart', this.addToCart.bind(this));
        this.subscribe('onRemoveFromCart', this.removeFromCart.bind(this));
        this.view.addListeners(this.handleCartIconClick.bind(this), this.handleRemoveClick.bind(this));
    }
    addToCart(id) {
        this.model.addToCart(id);
        this.view.updateCartCounter(true);
    }
    removeFromCart(id) {
        this.model.removeFromCart(id);
        this.view.updateCartCounter(false);
    }
    handleCartIconClick(event) {
        this.view.renderCart('view', this.model.getAnimals());
    }
    handleRemoveClick(event) {
        const element = event.target;
        const id = Number(element.dataset.id);
        if (isNaN(id) || element.name !== 'remove_cart_btn') {
            return;
        }
        this.model.removeFromCart(id);
        element.closest('.ui.item').nextElementSibling.remove();
        element.closest('.ui.item').remove();
        this.publish('onRemoveFromCart', id);
    }
}