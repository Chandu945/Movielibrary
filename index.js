const movies = [{ title: "The Shawshank Redemption", genre: "Drama" },
{ title: "The Godfather", genre: "Crime" },
{ title: "The Godfather: Part II", genre: "Crime" },
{ title: "The Dark Knight", genre: "Action" },
{ title: "12 Angry Men", genre: "Drama" },
{ title: "Schindler's List", genre: "Drama" },
{ title: "The Lord of the Rings: The Return of the King", genre: "Adventure" },
{ title: "Pulp Fiction", genre: "Crime" },
{ title: "The Good, the Bad and the Ugly", genre: "Western" },
{ title: "Fight Club", genre: "Drama" },
{ title: "Forrest Gump", genre: "Drama" },
{ title: "Inception", genre: "Action" },
{ title: "The Lord of the Rings: The Fellowship of the Ring", genre: "Adventure" },
{ title: "Star Wars: Episode V - The Empire Strikes Back", genre: "Action" },
{ title: "The Lord of the Rings: The Two Towers", genre: "Adventure" },
{ title: "The Matrix", genre: "Action" },
{ title: "Goodfellas", genre: "Crime" },
{ title: "One Flew Over the Cuckoo's Nest", genre: "Drama" },
{ title: "Seven Samurai", genre: "Adventure" },
{ title: "Se7en", genre: "Crime" },
{ title: "City of God", genre: "Crime" },
{ title: "The Silence of the Lambs", genre: "Thriller" },
{ title: "It's a Wonderful Life", genre: "Drama" },
{ title: "Life is Beautiful", genre: "Comedy" },
{ title: "The Usual Suspects", genre: "Crime" },
{ title: "Léon: The Professional", genre: "Action" },
{ title: "Spirited Away", genre: "Animation" },
{ title: "Saving Private Ryan", genre: "Drama" },
{ title: "Interstellar", genre: "Adventure" },
{ title: "The Green Mile", genre: "Drama" },
{ title: "The Prestige", genre: "Drama" },
{ title: "The Intouchables", genre: "Comedy" },
{ title: "The Lion King", genre: "Animation" },
{ title: "The Pianist", genre: "Drama" },
{ title: "The Departed", genre: "Crime" },
{ title: "Whiplash", genre: "Drama" },
{ title: "Gladiator", genre: "Action" }
]

let storedMovies = []
localStorage.setItem("moviesList",JSON.stringify(movies))
storedMovies = JSON.parse(localStorage.getItem("moviesList"))

const searchmovie = document.getElementById("title")
const searchgenre = document.getElementById("genre")
const printMovies = document.getElementById("results")
const printgenrecount = document.getElementById("count")
const drop = document.getElementById("drop")
let movieresult = []
let count ;
let btn = document.getElementById("search").addEventListener("click", function (event) {
    if(searchmovie.value.length > 0 && drop.value == "title"){
        movieresult = searchByTitle(searchmovie.value)
    }else if(searchgenre.value.length > 0 && drop.value == "genre"){
        movieresult = searchByGenre(searchgenre.value)
    }else if(searchmovie.value.length > 0 && searchgenre.value.length > 0 && drop.value == "both"){
        movieresult = searchbytitleandgenre(searchmovie.value,searchgenre.value)
    }
    displayResults(movieresult)
    count = countByGenre(movieresult)
    displayCount(count)
})

function searchbytitleandgenre(titl , genre){
    let moviebytitle = storedMovies.filter(movie => movie.title.toLowerCase().includes(titl.toLowerCase().trim()))
    return moviebytitle.filter(movie => movie.genre.toLowerCase().includes(genre.toLowerCase().trim()))
}

function displayCount(count){
    let arr = []
    for(let [key,value] of count){
        arr.push([key , value])
    }
    printgenrecount.innerHTML = ''
    arr.map(value => printgenrecount.innerHTML +=`<li>${value[0]}-${value[1]}</li>`)
}

function searchByTitle(input){
    return storedMovies.filter(movie => movie.title.toLowerCase().includes(input.toLowerCase().trim()))
}

function searchByGenre(input){
    return storedMovies.filter(movie => movie.genre.toLowerCase().includes(input.toLowerCase().trim()))
}

function displayResults(movieresult){
    printMovies.innerHTML = ''
    movieresult.map(movie => printMovies.innerHTML += `<li>${movie.title} (${movie.genre})</li>`)
}

function sortByTitle(){
    let result = movieresult.sort((a,b)=> a.title.localeCompare(b.title))
    displayResults(result)
}

function sortByGenre(){
    let result = movieresult.sort((a,b)=> a.genre.localeCompare(b.genre))
    displayResults(result)
}

function countByGenre(movieresult){
    let set = new Map()
    for(let i = 0 ; i < movieresult.length ; i++){
        if(set.has(movieresult[i].genre)){
            set.set(movieresult[i].genre,set.get(movieresult[i].genre)+1)
        }else{
            set.set(movieresult[i].genre , 1)
        }
    }
    return set
}