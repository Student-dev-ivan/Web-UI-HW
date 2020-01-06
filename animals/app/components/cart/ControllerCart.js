import { ViewCart } from './ViewCart.js';
import { ModelCart } from './ModelCart.js';
import { TemplaterCart } from './TemplaterCart.js'

export class ControllerCart {
    constructor({ subscribe, publish }) {
        this.model = new ModelCart();
        this.view = new ViewCart(this.model.getCartItemsCount());
        this.subscribe = subscribe;
        this.publish = publish;
        this.subscribe('onAddToCart', this.addToCart.bind(this));
        this.subscribe('onRemoveFromCart', this.removeFromCart.bind(this));
        this.view.addListeners(this.handleCartIconClick.bind(this), this.handleRemoveClick.bind(this), this.handleCartButtonsClick.bind(this));
    }
    addToCart(id) {
        this.model.addToCart(id);
        this.view.updateCartCounter(this.model.getCartItemsCount());
    }
    removeFromCart(id) {
        this.model.removeFromCart(id);
        this.view.updateCartCounter(this.model.getCartItemsCount());
        this.view.updateCartTotalAmount(this.model.getTotalAmount());
    }
    handleCartIconClick() {
        this.view.renderCart(this.model.getTotalAmount());
        this.view.renderCartContent('view', this.model.getAnimals(), this.model.getTotalAmount());
        window.scrollTo({ top: 0 });
    }
    toggleContent(display) {
        this.view.renderCartContent(display, this.model.getAnimals(), this.model.getTotalAmount());
        this.view.orderViewToggle(display);
    }

    handleCartButtonsClick(event) {
        const dataset = event.target.dataset.type;
        switch (true) {
            case dataset === 'clear':
                this.model.clearCart();
                this.view.eraseCart();
                this.view.updateCartCounter(this.model.getCartItemsCount());
                this.view.updateCartTotalAmount(this.model.getTotalAmount());
                console.log(event.target)
                break;
            case dataset === 'back':
                this.publish('onBackFromCart', this.model.getCurrentPage());
                break;
            case dataset === 'view' || dataset === 'order':
                this.toggleContent(dataset);
                break;
            case dataset === 'submit':
                const input = this.view.getOrderInput();
                if (this.isValidInput(input)) {
                    const text = TemplaterCart.getOrderTemplate(input, this.model.getAnimals(), this.model.getTotalAmount());
                    fetch(`https://api.telegram.org/bot987525486:AAFQf1i1D3p4ZT84cYZTJU1KEk9vg693mlI/sendMessage?chat_id=-377489566&text=${encodeURIComponent(text)}&parse_mode=MarkDown`)
                        .then(d => d.json())
                        .then(data => console.log(data));
                    this.model.clearCart();
                    this.view.updateCartCounter(this.model.getCartItemsCount());
                    this.view.renderOrderCompletedMsg();
                }
                break;
        }
    }
    handleRemoveClick(event) {
        const element = event.target;
        const id = Number(element.dataset.id);
        if (isNaN(id) || element.name !== 'remove_cart_btn') {
            return;
        }
        this.publish('onRemoveFromCart', id);
        this.view.removeItem(element);
    }

    isValidEmail(email) {
        var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    }
    isValidPhone(phone) {
        return new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im).test(phone.replace(/\s/g, ''));
    }
    toggleError(input) {
        document.querySelector(`[data-input="${input}"]`).classList.toggle('error');
    }
    isValidInput({ name, phone, email, address }) {
        let allValid = true;
        [...document.querySelectorAll('[data-input]')].forEach((input) => input.classList.toggle('error', false));
        if (name === '') {
            this.toggleError('name');
            allValid = false;
        }
        if (!this.isValidPhone(phone)) {
            this.toggleError('phone');
            allValid = false;
        }
        if (!this.isValidEmail(email)) {
            this.toggleError('email');
            allValid = false;
        }
        if (address === '') {
            this.toggleError('address');
            allValid = false;
        }
        return allValid;
    }
}