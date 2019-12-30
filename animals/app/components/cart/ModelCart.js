export class ModelCart {
    getAnimals() {
        return JSON.parse(sessionStorage.getItem('cart'));
    }
    addToCart(id) {
        const currentCart = this.getAnimals() || [];
        const animal = JSON.parse(sessionStorage.getItem('animals')).find(animal => animal.id === id);
        currentCart.push(animal);
        // !currentCart ? JSON.stringify([animal]) : JSON.stringify(currentCart.push(animal));
        sessionStorage.setItem('cart', JSON.stringify(currentCart));
    }
    removeFromCart(id) {
        const currentCart = this.getAnimals();
        sessionStorage.setItem('cart', JSON.stringify(currentCart.filter(animal => animal.id !== id)));
    }
    getCartItemsCount() {
        const currentCart = this.getAnimals();
        return !currentCart ? 0 : currentCart.length;
    }
}