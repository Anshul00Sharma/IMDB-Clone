const content_id = sessionStorage.getItem("detailed_content_id");
const resultGrid = document.getElementById("result-grid");
const apiKey = "d21b963e";

async function loadMovies(content_id) {
  //   content_id = searchTerm.replaceAll(" ", "+");
  //   console.log(searchTerm);

  const URL = `https://www.omdbapi.com/?i=${content_id}&y=&plot=short&r=json&apikey=${apiKey}`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  //   console.log(data);

  if (data.Response == "True") displayMovieDetails(data);
}
function displayMovieDetails(details) {
  resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${
          details.Poster != "N/A" ? details.Poster : "image_not_found.png"
        }" alt = "movie poster">
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
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${
          details.Awards
        }</p>
    </div>
    `;
}
loadMovies(content_id);
