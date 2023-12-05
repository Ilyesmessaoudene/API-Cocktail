// Titles: https://omdbapi.com/?s=thor&page=1&apikey=fc1fef96
// details: http://www.omdbapi.com/?i=tt3896198&apikey=fc1fef96

const API_KEY = "fc1fef96"

const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

// load movies from API
async function loadMovies(searchTerm){
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=${API_KEY}`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    //console.log(data);
    if(data.Response == "True") displayMovieList(data.Search);
}

function findMovies(){
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displayMovieList(movies){
    searchList.innerHTML = "";
    // alternative à une boucle for ?
    for(let movie of movies) {
        //console.log(movie)
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movie.imdbID; // setting movie id in  data-id
        movieListItem.classList.add('search-list-item');
        if(movie.Poster != "N/A")
        moviePoster = movie.Poster;
    else 
        moviePoster = "image_not_found.png";

        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem);


    }

    // for(let idx = 0; idx < movies.length; idx++){
    //     let movieListItem = document.createElement('div');
    //     movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in  data-id
    //     movieListItem.classList.add('search-list-item');
    //     if(movies[idx].Poster != "N/A")
    //         moviePoster = movies[idx].Poster;
    //     else 
    //         moviePoster = "image_not_found.png";

    //     movieListItem.innerHTML = `
    //     <div class = "search-item-thumbnail">
    //         <img src = "${moviePoster}">
    //     </div>
    //     <div class = "search-item-info">
    //         <h3>${movies[idx].Title}</h3>
    //         <p>${movies[idx].Year}</p>
    //     </div>
    //     `;
    //     searchList.appendChild(movieListItem);
    // }
    loadMovieDetails();
}

// on récupère les infos d'un film par son id
function loadMovieDetails(){
    // on récupère tous les films affichés
    const searchListMovies = searchList.querySelectorAll('.search-list-item');

    // pour chaque film on écoute le click
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            // console.log(movie.dataset.id);
            // on cache le container d'affichage des films et on vide l'input
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";

            // on fait une requête à l'API en utilisant l'id imdbID du film
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=${API_KEY}`);
            const movieDetails = await result.json();
            //console.log(movieDetails);

            // on passe le résultat à la fonction displayMovieDetails
            displayMovieDetails(movieDetails);
        });
    });
}

function displayMovieDetails(details){
    resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
    </div>
    `;
}


window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.classList.add('hide-search-list');
    }
});