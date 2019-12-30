export class TemplaterCart {
    static getCartTemplate(display, cartItems) {
        return `<div class="cart__container zoomInDown animated delay-fast">
        <div class="ui header">Cart</div>
        <div class="ui buttons">
            <button class="ui view positive button">View cart</button>
            <div class="or" data-text="<->"></div>
            <button class="ui order button">Place an order</button>
        </div>
        ${display === 'view' ?
                `<div class="total__amount">Total: $${cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}</div>
        <div class="ui divider"></div>`
                : 'ORDER'}
       ${display === 'view' ? cartItems.map(animal => this.getCartItemTemplate(animal)).join('') : 'order placing'} 
    </div>`
    }

    static getCartItemTemplate({ id, image, price, breed }) {
        return `<div class="ui item">
            <div class="ui medium image">
              <img src="${image}" alt="cat">
            </div>
        <div class="info">
            <div class="breed">${breed}</div>
            <div class="ui divider"></div>
            <div class="price">$${price}</div>
        </div>
        <button class="ui remove red button" name="remove_cart_btn" data-id="${id}">Remove</button>
    </div>
    <div class="ui divider"></div>`
    }
    static getCartIconTemplate() {
        return `<i class="shopping cart icon"></i>
        <span class="cart__counter"></span>`;
    }
}