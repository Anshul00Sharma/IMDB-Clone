const apiKey = "d21b963e";
const topMoviesCard = document.querySelector("#topMovies .slider");
const topSeriesCard = document.querySelector("#topSeries .slider");
const favoriteCard = document.querySelector("#favorite .slider");

let topMovies = [
  "Top Gun Maverick",
  "Doctor Strange",
  "Morbius",
  "Fantastic Beasts",
  "Everything Everywhere All At Once",
  "The Batman",
  "Sonic the Hedgehog 2",
  "Nobody",
  "Spider-Man No Way Home",
  "The Bad Guys",
];
let topSeries = [
  "Stranger Things",
  "The Boys",
  "Better Call Saul",
  "The Lincoln Lawyer",
  "Love, Death & Robots",
  "Game of Thrones",
  "Ozark",
  "Barry",
  "Bosch: Legacy",
  "Breaking Bad",
];
// console.log(topMovies);

// load movies from API

for (let movie of topMovies) {
  loadMoviesApi(movie, displayTopMovies, "t");
}
for (let movie of topSeries) {
  loadMoviesApi(movie, displayTopSeries, "t");
}

async function loadMoviesApi(searchTerm, displayFunction, type) {
  searchTerm = searchTerm.replaceAll(" ", "+");
  //   console.log(searchTerm);

  const URL = `https://www.omdbapi.com/?${type}=${searchTerm}&y=&plot=short&r=json&apikey=${apiKey}`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  //   console.log(data);

  if (data.Response == "True") displayFunction(data);
}

function displayTopMovies(data) {
  topMoviesCard.innerHTML += `<div class=" card">
                        <div class="face face1" id="${data.imdbID}" onclick="viewContent(${data.imdbID})">
                            <div class="content">
                                <div class="icon">
                                <img src=${data.Poster} alt="">
                                
                                </div>
                            </div>
                        </div>
                        <div class="face face2">
                            <div class="content">
                                <h4 class="rating-like-button"><strong>⭐${data.imdbRating}</strong>

                                    <label class="like">
                                        <input onclick="likeButton(${data.imdbID})" class="fav"type="checkbox" />
                                        <div class="hearth" />
                                    </label>
                                </h4>
                                <h3 class="card-title">${data.Title}
                                </h3>
                                <div><span class="card-trailer"><i class="fa-solid fa-play"></i> Trailer</span>
                                    <span class="card-info"> <i class="fa-solid fa-circle-info"></i></span>
                                </div>

                            </div>
                        </div>
            </div>`;
}
function displayTopSeries(data) {
  topSeriesCard.innerHTML += `<div class=" card">
                        <div class="face face1" id="${data.imdbID}" onclick="viewContent(${data.imdbID})">
                            <div class="content">
                                <div class="icon">
                                <img src=${data.Poster} alt="">
                                
                                </div>
                            </div>
                        </div>
                        <div class="face face2">
                            <div class="content">
                                <h4 class="rating-like-button"><strong>⭐${data.imdbRating}</strong>

                                    <label class="like">
                                        <input onclick="likeButton(${data.imdbID})"class="fav" type="checkbox" />
                                        <div class="hearth" />
                                    </label>
                                </h4>
                                <h3 class="card-title">${data.Title}
                                </h3>
                                <div><span class="card-trailer"><i class="fa-solid fa-play"></i> Trailer</span>
                                    <span class="card-info"> <i class="fa-solid fa-circle-info"></i></span>
                                </div>

                            </div>
                        </div>
            </div>`;
}
function displayFavorites(data) {
  favoriteCard.innerHTML += `<div class=" card">
                        <div class="face face1" id="${data.imdbID}" onclick="viewContent(${data.imdbID})">
                            <div class="content">
                                <div class="icon">
                                <img src=${data.Poster} alt="">
                                
                                </div>
                            </div>
                        </div>
                        <div class="face face2">
                            <div class="content">
                                <h4 class="rating-like-button"><strong>⭐${data.imdbRating}</strong>

                                    <label class="like">
                                        <input onclick="likeButton(${data.imdbID})"class="fav" type="checkbox" />
                                        <div class="hearth" />
                                    </label>
                                </h4>
                                <h3 class="card-title">${data.Title}
                                </h3>
                                <div><span class="card-trailer"><i class="fa-solid fa-play"></i> Trailer</span>
                                    <span class="card-info"> <i class="fa-solid fa-circle-info"></i></span>
                                </div>

                            </div>
                        </div>
            </div>`;
}
function viewContent(id) {
  console.log("this is id" + id);
  sessionStorage.setItem("detailed_content_id", id.id);
  window.location.href = "http://127.0.0.1:5500/content_details.html";
  //   console.log(sessionStorage.getItem("detailed_content_id"));
}

// Favorite

function likeButton(id) {
  if (id != undefined) {
    let isLikeChecked = document
      .querySelector(`#${id.id}`)
      .parentElement.querySelector(".fav").checked;
    let localFavorites = localStorage.getItem("favorites");
    if (localFavorites == null) {
      favoriteList = [];
    } else {
      favoriteList = JSON.parse(localFavorites);
      favoriteList = [...new Set(favoriteList)];
    }

    if (isLikeChecked) {
      favoriteList.push(id.id);
      console.log("added " + id.id);
      localStorage.setItem("favorites", JSON.stringify(favoriteList));
      loadFavorite();
    } else {
      if (favoriteList.length != 0) {
        let idIndex = favoriteList.indexOf(id.id);
        console.log(idIndex);
        if (idIndex != undefined) {
          favoriteList.splice(idIndex, 1);
          localStorage.setItem("favorites", JSON.stringify(favoriteList));
          console.log("removed " + id.id);
          loadFavorite();
        }
      }
    }
  }
}
function loadFavorite() {
  favoriteCard.innerHTML = "";
  let localFavorites = localStorage.getItem("favorites");
  if (localFavorites != null) {
    favoriteList = JSON.parse(localFavorites);
    for (let card of favoriteList) {
      loadMoviesApi(card, displayFavorites, "i");
    }
  }
}

loadFavorite();
