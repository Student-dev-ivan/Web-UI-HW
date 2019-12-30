import { TemplaterCart } from './TemplaterCart.js';

export class ViewCart {
    constructor(animalsCount) {
        this.rootDOM = document.querySelector('.root');
        this.cartDOM = document.querySelector('.ui.cart.item');
        this.renderCartIcon();
        this.cartCounterDOM = document.querySelector('.cart__counter');
        this.cartCounter = animalsCount;
        this.cartCounterDOM.innerText = this.cartCounter;

        // this.renderCart('view', JSON.parse(sessionStorage.getItem('animals')).slice(0, 10));
    }
    renderCart(display, cartItems) {
        document.querySelector('.pages').innerHTML = '';
        this.rootDOM.innerHTML = TemplaterCart.getCartTemplate(display, cartItems);
    }
    renderCartIcon() {
        this.cartDOM.innerHTML = TemplaterCart.getCartIconTemplate();
    }
    updateCartCounter(animalAdded) {
        this.cartCounterDOM.innerText = animalAdded ? ++this.cartCounter : --this.cartCounter;
    }
    addListeners(handleCartClickFunc, handleRemoveClickFunc) {
        this.cartDOM.addEventListener('click', handleCartClickFunc);
        this.rootDOM.addEventListener('click', handleRemoveClickFunc);
    }

}