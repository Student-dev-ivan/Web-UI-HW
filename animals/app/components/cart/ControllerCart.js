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
                    // 477223820 - my chat id
                    //-377489566 - group id
                    fetch(`https://api.telegram.org/bot987525486:AAFQf1i1D3p4ZT84cYZTJU1KEk9vg693mlI/sendMessage?chat_id=477223820&text=${encodeURIComponent(text)}&parse_mode=MarkDown`)
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
        this.view.removeItem(element, this.model.getTotalAmount());
    }

    isValidEmail(email) {
        const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        return regex.test(email);
    }
    isValidPhone(phone) {
        return new RegExp(/^\+?3?8?(0\d{9})$/).test(phone.replace(/\s/g, ''));
    }

    isValidInput({ name, phone, email, address }) {
        let allValid = true;
        this.view.toggleFormFieldError();
        if (name === '') {
            this.view.toggleFormFieldError('name');
            allValid = false;
        }
        if (!this.isValidPhone(phone)) {
            this.view.toggleFormFieldError('phone');
            allValid = false;
        }
        if (!this.isValidEmail(email)) {
            this.view.toggleFormFieldError('email');
            allValid = false;
        }
        if (address === '') {
            this.view.toggleFormFieldError('address');
            allValid = false;
        }
        return allValid;
    }
}