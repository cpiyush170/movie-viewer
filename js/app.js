let form = document.querySelector('#form')
let search = document.querySelector('#query')

// api endpoint
let url = `https://www.omdbapi.com/?i=tt1277953&apikey=88902668`

// picking dom elements
let movieName = document.querySelector('#movieName')
let plot = document.querySelector('#plot')
let img = document.querySelector('img')
let actors = document.querySelector('#cast')
let director = document.querySelector('#director')
let writer = document.querySelector('#writer')
let genre = document.querySelector('#genre')
let rating = document.querySelector('#rating')
let boxOffice = document.querySelector('#boxOffice')
let language = document.querySelector('#language')
let released = document.querySelector('#released')
let year = document.querySelector('#year')


getMovie(url).catch(err => console.log("Unable to fetch data..", err))

async function getMovie(url) {

  showSpinner() // show spinner
  img.style.display = "none"
  document.querySelector('.movie-description').style.display = "none"
  let response = await fetch(url)

  let data = await response.json()
  console.log(data)

  // if movie is not found....
  if (data.Response === "False") {
    alert(data.Error)
    img.style.display = "block"
    document.querySelector('.movie-description').style.display = "block"
    hideSpinner()
  }
  else {
    img.src = data.Poster;
    movieName.innerHTML = data.Title
    plot.innerHTML = data.Plot;
  
    insertData(actors, data.Actors)
    insertData(director, data.Director)
    insertData(writer, data.Writer)

    insertData(genre, data.Genre)
    insertData(rating, data.imdbRating)
    insertData(boxOffice, data.BoxOffice)

    insertData(language, data.Language)
    insertData(released, data.Released)
    insertData(year, data.Year)
  }
}

function insertData(el, data) {
  let nextSibling = el.nextElementSibling
  nextSibling.textContent = data;
}

// search by title
form.addEventListener('submit', async(e) => {
  e.preventDefault();
  let query = search.value;

  // if search input is blank...
  if (query == "") alert("Please enter a movie name.")
  else
  {
    let searchAPI = `http://www.omdbapi.com/?t=${query}&type="movie"&apikey=88902668`
    getMovie(searchAPI)
    search.value = ""
  }
})

img.addEventListener('load', () => {
  hideSpinner();
  img.style.display = "block"
  document.querySelector('.movie-description').style.display = "block"

})





function showSpinner() {
  document.getElementById('spinner').style.display = "block"
}
function hideSpinner() {
 document.getElementById('spinner').style.display = "none"
}

