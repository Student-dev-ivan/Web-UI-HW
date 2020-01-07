export class TemplaterCart {
    static getCartTemplate(total__amount) {
        return `<div class="cart__container lightSpeedIn animated delay-fast">
        <div class="ui header">Cart</div>
        <div class="ui buttons">
            <button class="ui blue button" data-type="view">View cart</button>
            <div class="or" data-text="<->"></div>
            <button class="ui ${total__amount > 0 ? '' : 'disabled'} button" data-type="order">Place an order</button>
        </div>
        <div class="content"></div>
    </div>`
    }

    static getCartContentTemplate(display, cartItems, totalAmount) {
        return `<div class="${display === 'view' ? 'fadeInLeft' : 'fadeInRight'} animated delay-fast">${display === 'view' ?
            `<div class="total__amount">Total: $<span>${totalAmount}</span></div>
<div class="ui divider"></div>
        <div class="ui buttons">
        <button class="ui teal button" data-type="back"><i class="left arrow icon"></i>back to the shop</button>    
        <button class="ui negative button" data-type="clear">clear cart</button>
        </div>
        <div class="ui divider"></div>`

            :
            `<div class="ui divider"></div>
            <button class="ui teal fluid button" data-type="back"><i class="left arrow icon"></i>back to the shop</button>
            <div class="ui large form">
                <div class="two fields">
                    <div class="required field" data-input="name">
                        <label>Name</label>
                        <input placeholder="Jhon" type="text">
                    </div>
                    <div class="required field" data-input="phone">
                        <label>Phone</label>
                        <input placeholder="+380 xx xxx xx xx" type="tel">
                    </div>
                </div>
                <div class="two fields">
                    <div class="required field" data-input="email">
                        <label>Email</label>
                        <input placeholder="Jhon@gmail.com" type="email">
                    </div>
                    <div class="required field" data-input="address">
                        <label>Address</label>
                        <input placeholder="City, street, house" type="text">
                    </div>
                </div>
            <div class= field" data-input="notes">
                <label>Notes</label>
                <textarea rows="5"></textarea>
            </div>
            <div class="ui positive submit button" data-type="submit">Submit</div>
        </div>
    </div?`}
${display === 'view' ? `<div class="cart_items">${cartItems.map(animal => this.getCartItemTemplate(animal)).join('')}</div>` : ''} `
    }

    static getCartItemTemplate({ id, image, price, breed }) {
        return `<div class="ui item">
            <div class="ui medium image">
              <img src="${image}" alt="${breed}" onerror="this.onerror = null; this.src='app/assets/no-image.png';">
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
    static getOrderTemplate({ name, phone, email, address, notes }, animals, total__amount) {
        return `#############################

*__NEW ORDER HAS BEEN PLACED!__*

*Customer info:*

*Name:* _${name}_
*Phone number:* _${phone}_
*Email address:* _${email}_
*Address:* _${address}_
${notes !== '' ? `*Notes:* _${notes}_` : ''}

*Animals:*

${animals.map(animal => {
            return `*Species:* _${animal.species}_
*Breed:* _${animal.breed}_
*Price:* _$${animal.price}_
*Id:* _${animal.id}_`;
        }).join('\n\n')}

*Total amount:* _$${total__amount}_

#############################`
    }

    static getOrderCompletedMsgTemplate() {
        return `<div class="ui positive massive message fadeIn animated delay-fast">
        <div class="header">Order completed!</div>
<p>Our representative will contact you shortly.
Have a nice day : - )</p>
</div>`
    }
}