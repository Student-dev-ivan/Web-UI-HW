import { ModelMovies } from './ModelMovies.js';
import { ViewMovies } from './ViewMovies.js';


export class ContorllerMovies {
    constructor() {
        this.model = new ModelMovies();
        this.view = new ViewMovies();
        this.view.addSearchBtnListener(this.handleSearchBtnClick.bind(this));
        this.view.addDefaultBtnListener(this.handleDefaultBtnClick.bind(this));
        this.view.addInputListener(this.handleEnterPress.bind(this));
    }

    handleSearchBtnClick() {
        const text = this.view.getInputText();
        if (text !== '') {
            this.getMovies(text);
        }
    }

    handleEnterPress(event) {
        const text = this.view.getInputText();
        if (text !== '' && event.keyCode === 13) {
            this.getMovies(text);
        }
    }
    handleDefaultBtnClick() {
        this.getMovies();
    }
    getMovies(queryString = 'avengers') {
        this.model.getMovies(queryString).then(data => this.view.renderAllMovies(data.results));
    }

}