
window.addEventListener('load', () => {
   SwRegister()
})
async function SwRegister() {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('./sw.js')

        } catch (error) {
            console.log('Error al registrar Sw');
        }
    }
}
const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
var option = document.getElementById('options')
//obtener peliculas
getMovies(APIURL+1);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    const movies =respData.results 
    showMovies(movies);
}

function showMovies(movies) {
    movies.sort( ((a, b) => b.vote_average - a.vote_average) )
    // clear main
    main.innerHTML = "";

    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <img
                src="${IMGPATH + poster_path}"
                alt="NOT FOUND"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                    vote_average
                )}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Sinopsis:</h3>
                ${overview}
            </div>
        `;
        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);

        search.value = "";
    }else{
        alert('¡CAMPO VACIO, ESCRIBE ALGO ANTES DE BUSCAR!')
    }
    option.value=1
});

function home() {
    alert(location.origin)
}
function changePage() {
    const value = option.value
    getMovies(APIURL+value)
}
