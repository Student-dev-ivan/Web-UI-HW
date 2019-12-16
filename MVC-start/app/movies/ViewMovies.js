import { Templater } from '../share/Templater.js'

export class ViewMovies {
    constructor() {
        this.domMovies = document.querySelector('.movies');
        this.searchButton = document.querySelector('.btn__search');
        this.defaultButton = document.querySelector('.btn__default');
        this.input = document.querySelector('.form-control');
        this.templater = new Templater('app/movies/templateMovie.dp180');
    }
    renderAllMovies(allMovies) {
        let moviesStr = '';
        allMovies.forEach(item => {
            moviesStr += this.renderMovie(item);
        });
        this.domMovies.innerHTML = moviesStr;
    }
    prepareMovieData(movie) {
        return Object.entries(movie).map(el => {
            if (el[0] === 'overview') {
                return {
                    name: el[0],
                    value: el[1].length > 90 ? el[1].substring(0, 90) + '...' : el[1]
                }
            }
            return {
                name: el[0],
                value: el[1]
            }
        });
    }
    renderMovie(movie) {
        return this.templater.getHTML(this.prepareMovieData(movie));
    }

    addSearchBtnListener(searchFunc) {
        this.searchButton.addEventListener('click', searchFunc);
    }

    addDefaultBtnListener(searchFunc) {
        this.defaultButton.addEventListener('click', searchFunc);
    }

    addInputListener(searchFunc) {
        this.input.addEventListener('keypress', searchFunc);
    }

    getInputText() {
        return this.input.value;
    }
}