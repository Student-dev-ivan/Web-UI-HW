
export class ModelMovies {
    constructor() {
        this.apiKey = '0bd14df227c10c215a2d59315152fc88';
        this.searchLink = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=`;
    }

    getMovies(queryString = '') {
        return fetch(this.searchLink + queryString)
            .then(res => res.json());
    }
}