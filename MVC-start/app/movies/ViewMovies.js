export class ViewMovies {
    constructor() {
        this.domMovies = document.querySelector('.movies');
        this.searchButton = document.querySelector('.btn__search');
        this.defaultButton = document.querySelector('.btn__default');
        this.input = document.querySelector('.form-control');
    }
    renderAllMovies(allMovies) {
        let moviesStr = '';
        allMovies.forEach(item => {
            moviesStr += this.renderMovie(item);
        });
        this.domMovies.innerHTML = moviesStr;
    }
    renderMovie(movie) {
        return `<div class="card mb-3 position-relative" style="width: 18rem;">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" height=400px; alt="no image : (">
        <div class="card-body">
          <h5 class="card-title">${movie.original_title}</h5>
          <p class="card-text">${movie.overview.length > 90 ? movie.overview.substring(0, 90) + '...' : movie.overview}</p>
          <a href="https://www.themoviedb.org/movie/${movie.id}" class="btn btn-primary">Open</a>
        </div>
      </div>`;
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