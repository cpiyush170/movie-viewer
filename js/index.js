let form = document.querySelector('#form')
let search = document.querySelector('#query')

let api = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=4521e644363f8e2210ba3dfdf418d085&language=en-US&page=1"

let img_path = "https://image.tmdb.org/t/p/w500"
let images = document.querySelectorAll('img')

getMovies(api).catch((e)=> console.log("unable to fetch..", e))
async function getMovies(searchAPI) {

  
  showSpinner() // show spinner
  images.forEach(image => {
    image.style.display = "none"
  })

  let response = await fetch(searchAPI)
  let data = await response.json()
  if (data.Response === "False") {
    alert(data.Error)
    img.style.display = "block"
    hideSpinner()
  }
  else {
    console.log(data)
    let movies = data.results
    // for each image element in dom set image from a api response
    for (let i = 0; i < images.length; i++) {
      images[i].src = img_path + movies[i].poster_path
    }
  }
}
  



// event listener for searching movies by name
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let query = search.value;
  let searchAPI = `https://api.themoviedb.org/3/search/movie?api_key=4521e644363f8e2210ba3dfdf418d085&query=${query}`

  if (query) {
    document.getElementById("defaultText").style.display = "none";
    document.getElementById("searchText").style.display = "block";
    getMovies(searchAPI)
    search.value = ''
  }
  else 
  {
    alert("Please enter a movie name..")
  }
  
})

images.forEach(image => {
  image.addEventListener('load', () => {
    hideSpinner();
    image.style.display = "block"
  
  })
})





function showSpinner() {
  document.getElementById('spinner').style.display = "block"
}
function hideSpinner() {
 document.getElementById('spinner').style.display = "none"
}

