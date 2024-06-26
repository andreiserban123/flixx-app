const global = {
  currentPage: window.location.pathname,
};

async function displayPopularMovies() {
  const { results } = await fetchAPIData("movie/popular");
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `<a href="movie-details.html?id=${movie.id}">
            <img
              src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>`;
    document.querySelector("#popular-movies").appendChild(div);
  });
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}
function removeSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

//Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  showSpinner();
  const API_KEY = "fbd9fe6a705fd0559bc28e0cc80b4477";
  const API_URL = `https://api.themoviedb.org/3/`;
  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  removeSpinner();
  return data;
}

// HighlitghtActive LINK
function highlitghtActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}
// Init App
function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displayPopularMovies();
      break;
    case "/shows.html":
      console.log("Shows");
      break;
    case "/movie-details.html":
      console.log("Movie details");
      break;
    case "/tv-details.html":
      console.log("Tv details");
      break;
    case "/search.html":
      console.log("Search");
      break;
    default:
      break;
  }

  highlitghtActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
