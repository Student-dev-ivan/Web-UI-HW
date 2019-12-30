import { Pagination } from "./Pagination.js";

export class ModelPets {
    constructor() {
        // this.dbLink = 'https://student-dev-ivan.github.io/Web-UI-HW/animals/animals-en-general.json';
        this.dbLink = 'https://maksv21.github.io/softserve/demo2/database/animals_en.json';
        this.itemsPerPage = 30;
        this.animals;
    }
    getPetById(id) {
        return JSON.parse(sessionStorage.getItem('animals')).find(animal => animal.id === id);
    }
    filterPets(species) {
        const storageAnimals = JSON.parse(sessionStorage.getItem('animals'));
        this.animals = species === 'all' ?
            storageAnimals :
            storageAnimals.filter(animal => animal.species === species);
    }
    updateSessionStorage(id, inCart) {
        const currenValues = JSON.parse(sessionStorage.getItem('animals'));
        currenValues.forEach(animal => {
            if (animal.id === id) {
                inCart ? animal.in_cart = true : delete animal.in_cart;
            }
        });
        sessionStorage.setItem('animals', JSON.stringify(currenValues));
    }
    async getPets(breed = 'all') {
        const storageAnimals = sessionStorage.getItem('animals');
        if (!storageAnimals) {
            return fetch(this.dbLink)
                .then(res => res.json())
                .then(res => {
                    const now = new Date();
                    res.forEach(animal => animal.age = this.calculateAge(now, animal.birth_date));
                    res.sort(() => Math.random() - Math.random());
                    sessionStorage.setItem('animals', JSON.stringify(res));
                    this.animals = res;
                    return this.animals;
                });
        } else {
            if (breed !== 'all') {
                this.animals = JSON.parse(storageAnimals).filter(animal => animal.breed.toLowerCase().includes(breed.toLowerCase()));
            } else {
                this.animals = JSON.parse(storageAnimals);
            }
            return this.animals;
        }
        // return fetch(this.dbLink)
        //     .then(res => res.json())
        //     .then(res => {
        //         const now = new Date();
        //         if (breed !== 'all') {
        //             res = res.filter((animal) => animal.breed.toLowerCase().includes(breed.toLowerCase()));
        //         }
        //         res.forEach(animal => animal.age = this.calculateAge(now, animal.birth_date));
        //         // res.sort(() => Math.random() - Math.random());
        //         this.animals = res;
        //         // this.pagination = new Pagination(this.animals, 20);
        //         return this.animals;
        //     });

    }
    calculateAge(now, birthDate) {
        const years = Math.floor((now.valueOf() - birthDate) / 1000 / 60 / 60 / 24 / 365);
        const months = Math.floor((now.valueOf() - birthDate) / 1000 / 60 / 60 / 24 / 30) % 12;
        switch (true) {
            case years > 0 && months > 0:
                return `${years} ${years > 1 ? 'years' : 'year'} ${months} ${months > 1 ? 'months' : 'month'}`;
            case years > 0:
                return `${years} ${years > 1 ? 'years' : 'year'}`;
            case months > 0:
                return `${months} ${months > 1 ? 'months' : 'month'}`;
            default:
                return 'less than month';
        }
    }

    getAnimalsAtPage(page) {
        const start = (page - 1) * this.itemsPerPage;
        return this.animals.slice(start, start + this.itemsPerPage);
    }
    getPagesCount() {
        return Math.ceil(this.animals.length / this.itemsPerPage);
    }

    // getAnimalsAtPage(page) {
    //     return this.pagination.getPageElements(page);
    // }
    // getPagesCount() {
    //     return this.pagination.getItemsCount();
    // }
    // getCurrentPage() {
    //     return this.pagination.currentPage;
    // }
}

