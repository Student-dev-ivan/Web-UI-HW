import { Pagination } from "./Pagination.js";

export class ModelPets {
    constructor() {
        // this.dbLink = 'https://student-dev-ivan.github.io/Web-UI-HW/animals/animals-en-general.json';
        this.dbLink = 'https://maksv21.github.io/softserve/demo2/database/animals_en.json';
        this.itemsPerPage = 30;
        this.animals;
    }
    getCurrentPage() {
        return Number(sessionStorage.getItem('currentPage')) || 1;
    }
    updateCurrentPageNumber(pageNumber) {
        sessionStorage.setItem('currentPage', pageNumber);
    }
    getPetById(id) {
        return JSON.parse(sessionStorage.getItem('animals')).find(animal => animal.id === id);
    }
    // filterPets(species) {
    //     // this.animals = this.getPets(breed).then(animals => animals.filter(animal => animal.species === species));

    //     const storageAnimals = JSON.parse(sessionStorage.getItem('animals'));
    //     this.animals = species === 'allPets' ?
    //         storageAnimals :
    //         storageAnimals.filter(animal => animal.species === species);
    // }
    filterPets(animals, species) {
        return species === 'all' ? animals : animals.filter(animal => animal.species === species);
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
    sortAnimals({ field, order }) {
        this.animals.sort((animal1, animal2) => {
            if (field === 'price') {
                return order === 'asc' ? animal1[field] - animal2[field] : animal2[field] - animal1[field];
            }
            return order === 'asc' ? animal2[field] - animal1[field] : animal1[field] - animal2[field];
        });
    }
    async getPets(breed = '', species = '') {
        const storageAnimals = sessionStorage.getItem('animals');
        if (!storageAnimals) {
            return fetch(this.dbLink)
                .then(res => res.json())
                .then(res => {
                    const now = Date.now();
                    res.forEach(animal => animal.age = this.calculateAge(now, animal.birth_date));
                    res.sort(() => Math.random() - Math.random());
                    this.animals = res;
                    sessionStorage.setItem('animals', JSON.stringify(res));
                    return this.animals;
                });
        } else {
            let tmpAnimals;

            if (breed !== '') {
                tmpAnimals = JSON.parse(storageAnimals).filter(animal => animal.breed.toLowerCase().includes(breed.toLowerCase()));
                this.animals = this.filterPets(tmpAnimals, species);
            } else {
                tmpAnimals = JSON.parse(storageAnimals);
                this.animals = this.filterPets(tmpAnimals, species);
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
        // const years = Math.floor((now.valueOf() - birthDate) / 1000 / 60 / 60 / 24 / 365);
        // const months = Math.floor((now.valueOf() - birthDate) / 1000 / 60 / 60 / 24 / 30) % 12;
        const tmp = new Date(now - birthDate);
        const years = tmp.getFullYear() - 1970;
        const months = tmp.getMonth();
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

