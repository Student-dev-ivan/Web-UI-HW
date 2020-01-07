import { TemplaterCart } from './TemplaterCart.js';

export class ViewCart {
    constructor(animalsCount) {
        this.rootDOM = document.querySelector('.root');
        this.cartDOM = document.querySelector('.ui.cart.item');
        this.renderCartIcon();
        this.cartCounterDOM = document.querySelector('.cart__counter');
        this.cartCounterDOM.innerText = animalsCount;
    }

    orderViewToggle(display) {
        this.rootDOM.querySelector('button[data-type="view"]').classList.toggle('blue', display === 'view' ? true : false);
        this.rootDOM.querySelector('button[data-type="order"]').classList.toggle('blue', display === 'view' ? false : true);
    }

    renderCart(totalAmount) {
        document.querySelector('.pages').innerHTML = '';
        this.rootDOM.innerHTML = TemplaterCart.getCartTemplate(totalAmount);
    }

    renderCartContent(display, cartItems, totalAmount) {
        this.rootDOM.querySelector('.content').innerHTML = TemplaterCart.getCartContentTemplate(display, cartItems, totalAmount);
    }

    renderCartIcon() {
        this.cartDOM.innerHTML = TemplaterCart.getCartIconTemplate();
    }

    renderOrderCompletedMsg() {
        this.rootDOM.innerHTML = TemplaterCart.getOrderCompletedMsgTemplate();
    }

    updateCartCounter(count) {
        this.cartCounterDOM.innerText = count;
    }

    updateCartTotalAmount(totalAmount) {
        const total = document.querySelector('.total__amount span');
        if (!!total) {
            total.innerText = totalAmount;
        }
    }

    addListeners(handleCartClickFunc, handleRemoveClickFunc, handleCartButtonsClickFunc) {
        this.cartDOM.addEventListener('click', handleCartClickFunc);
        this.rootDOM.addEventListener('click', handleRemoveClickFunc);
        this.rootDOM.addEventListener('click', handleCartButtonsClickFunc);

    }

    removeItem(element) {
        element.closest('.ui.item').nextElementSibling.remove();
        element.closest('.ui.item').remove();
    }

    eraseCart() {
        this.rootDOM.querySelector('.cart_items').innerHTML = '';
        this.rootDOM.querySelector('[data-type="order"]').classList.toggle('disabled', true);
    }

    getOrderInput() {
        const inputValues = [...this.rootDOM.querySelectorAll('input')].map(input => input.value.trim());
        inputValues.push(this.rootDOM.querySelector('textarea').value.trim());
        return {
            name: inputValues[0],
            phone: inputValues[1],
            email: inputValues[2],
            address: inputValues[3],
            notes: inputValues[4]
        };
    }
    toggleFormFieldError(input = 'all') {
        if (input === 'all') {
            [...document.querySelectorAll('[data-input]')].forEach((field) => field.classList.toggle('error', false));
        } else {
            document.querySelector(`[data-input="${input}"]`).classList.toggle('error');
        }
    }
}