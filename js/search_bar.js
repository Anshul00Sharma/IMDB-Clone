// console.log("this is search_bar");
// console.log(sessionStorage.getItem("detailed_content_id"));

const movieSearchBox = document.getElementById("movie-search-box");
const searchList = document.getElementById("search-list");
// const resultGrid = document.getElementById("result-grid");
const search_elem = document.querySelector("body");

search_elem.addEventListener("click", () => {
  // console.log(search_elem);

  searchList.classList.add("hide-search-list");
});

// load movies from API
async function loadMovies(searchTerm) {
  const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fc1fef96`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  console.log(data.Search);
  if (data.Response == "True") displayMovieList(data.Search);
}

function findMovies() {
  let searchTerm = movieSearchBox.value.trim();
  // console.log(searchTerm);
  if (searchTerm.length > 0) {
    searchList.classList.remove("hide-search-list");
    loadMovies(searchTerm);
  } else {
    searchList.classList.add("hide-search-list");
  }
}

function displayMovieList(movies) {
  searchList.innerHTML = "";
  for (let data of movies) {
    let movieListItem = document.createElement("div");
    // movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in  data-id
    // movieListItem.classList.add("search-list-item");
    if (data.Poster != "N/A") moviePoster = data.Poster;
    else moviePoster = "image_not_found.png";

    movieListItem.innerHTML = `<div class="search-list-item id="${data.imdbID}" onclick="viewContentSearch('${data.imdbID}')">
                        <div class="search-item-thumbnail">
                            <img src="${moviePoster}">
                        </div> 
                        <div class="search-item-info">
                            <h3>${data.Title}</h3>
                            <p>${data.Year}</p>
                        </div>
                    </div>`;

    searchList.appendChild(movieListItem);
  }
}
function viewContentSearch(id) {
  console.log("this is id" + id);
  sessionStorage.setItem("detailed_content_id", id);
  window.location.href = "http://127.0.0.1:5500/content_details.html";
  //   console.log(sessionStorage.getItem("detailed_content_id"));
}
