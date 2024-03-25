const apiKey = "bd3cd4d2";
let searchElement = document.getElementById("search");
let mainContainer = document.getElementById("main-container");
let detailsModal = document.getElementById("modal");
let loadingModal = document.getElementById("loading");

searchElement.addEventListener("input", (e) => {
    displayMoviemovieDetails(e.target.value);
})

async function getMoviemovieDetails(searchQuery) {
    let response = await fetch(`https://www.omdbapi.com/?s=${searchQuery}&page=1&apikey=${apiKey}`);
    let moviemovieDetails = await response.json();
    return moviemovieDetails;
}


//debounce implementation with 0.1s delay
function debounce(callback, delay = 100) {
    let timeout;

    return (searchQuery) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            callback(searchQuery);
        }, delay)
    }
}

let displayMoviemovieDetails = debounce(async (searchQuery) => {
    try {
        let moviemovieDetails = await getMoviemovieDetails(searchQuery);
        let movieArray = moviemovieDetails.Search;
        loadMoviemovieDetails(movieArray);
    } catch (error) {
        console.log("Error fetching movie movieDetails:", error);
    }
})






function loadMoviemovieDetails(movieArray) {
    mainContainer.innerHTML = "";
    for (let movie of movieArray) {
        let movieContainer = document.createElement("div");
        movieContainer.classList = "movie-container";
        movieContainer.innerHTML = `
            <img src="${movie.Poster}" alt="poster">
            <p class="title">${movie.Title}</p>
            <p class="year">${movie.Year}</p>
            <button onclick="showDetails('${movie.imdbID}')">Show Details</button>
        `
        mainContainer.appendChild(movieContainer);
    }
}

async function showDetails(id) {
    loadingModal.showModal();
    let response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`);
    let movieDetails = await response.json();
    console.log(movieDetails);

    detailsModal.innerHTML = `
        <button onclick="closeDetails()"><i class="fi fi-ss-cross-circle"></i></button>
        <div class="movie-poster">
            <img src=${movieDetails.Poster} alt="Movie Poster">
        </div>
        <div class="movie-details">
        <h2>${movieDetails.Title}</h2>
        <p class="basic-details">${movieDetails.Year}  &#x2022; ${movieDetails.Country}  &#x2022; Rating- <span
                class="rating">${movieDetails.imdbRating}</span>/10 </p>

        <div class="details-item">
            <p><strong>Actors: </strong>${movieDetails.Actors}</p>
            <p><strong>Director(s): </strong>${movieDetails.Director}</p>
            <p><strong>Writers: </strong>${movieDetails.Writer}</p>
        </div>

        <div class="details-item">
            <p><strong>Genre: </strong>${movieDetails.Genre}</p>
            <p><strong>Release Date: </strong>${movieDetails.DVD}</p>
            <p><strong>Box Office: </strong>${movieDetails.BoxOffice}</p>
            <p><strong>Movie Runtime: </strong>${movieDetails.Runtime}</p>
        </div>

        <p class="plot">${movieDetails.Plot}</p>
        <p class="awards"> <i class="fi fi-ss-award"></i> ${movieDetails.Awards}</p>
      </div>
    `
    loadingModal.close();
    detailsModal.style.display = "flex";
    detailsModal.showModal();
}


function closeDetails() {
    detailsModal.style.display = "none";
    detailsModal.close();
}



