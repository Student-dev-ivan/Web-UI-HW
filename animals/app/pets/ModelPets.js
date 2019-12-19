export class ModelPets {
    constructor() {
        // this.dbLink = 'https://student-dev-ivan.github.io/Web-UI-HW/animals/animals-en-general.json';
        this.dbLink = 'https://maksv21.github.io/softserve/demo2/database/animals_en.json';

        this.animals = null;
    }
    getPets() {
        return this.animals = fetch(this.dbLink)
            .then(res => res.json())
            .then(res => {
                const now = new Date();
                res.forEach(animal => animal.age = this.calculateAge(now, animal.birth_date));
                return res;
            });
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
}

