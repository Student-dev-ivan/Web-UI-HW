export class ModelSearch {
    getSelectedSpecies() {
        return sessionStorage.getItem('speceies') || '';
    }

    getEnteredBreed() {
        return sessionStorage.getItem('breed') || '';
    }

    updateSelectedSpecies(species) {
        sessionStorage.setItem('speceies', species);
    }

    updateEnteredBreed(breed) {
        sessionStorage.setItem('breed', breed);
    }
}