export class ModelCart {
    getCurrentPage() {
        return Number(sessionStorage.getItem('currentPage')) || 1;
    }

    getTotalAmount() {
        return Number(sessionStorage.getItem('total_price'));
    }

    updateTotalAmount(currentCart) {
        sessionStorage.setItem('total_price', currentCart.reduce((total, item) => total + item.price, 0).toFixed(2));
    }

    getAnimals() {
        return JSON.parse(sessionStorage.getItem('cart')) || [];
    }

    addToCart(id) {
        const currentCart = this.getAnimals();
        const animal = JSON.parse(sessionStorage.getItem('animals')).find(animal => animal.id === id);
        currentCart.push(animal);
        // !currentCart ? JSON.stringify([animal]) : JSON.stringify(currentCart.push(animal));
        sessionStorage.setItem('cart', JSON.stringify(currentCart));
        this.updateTotalAmount(currentCart);
    }

    removeFromCart(id) {
        const currentCart = this.getAnimals().filter(animal => animal.id !== id);
        sessionStorage.setItem('cart', JSON.stringify(currentCart));
        this.updateTotalAmount(currentCart);
    }

    clearCart() {
        const allAnimals = JSON.parse(sessionStorage.getItem('animals'));
        const idsInCart = this.getAnimals().map(animal => animal.id);
        allAnimals.forEach(animal => {
            if (idsInCart.includes(animal.id)) {
                delete animal.in_cart;
            }
        });
        sessionStorage.setItem('animals', JSON.stringify(allAnimals));
        sessionStorage.setItem('cart', '[]');
        sessionStorage.setItem('total_price', 0);
    }

    getCartItemsCount() {
        return this.getAnimals().length;
    }
}