//import React, { useState } from "react";
import { useState, useEffect } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

//3897926e
const API_URL = "http://www.omdbapi.com?apikey=3897926e";

// const movie1 = {
//   Title: "The Amazing Spiderman 2 Webb Cut",
//   Year: "2021",
//   imdbID: "tt18351128",
//   Type: "movie",
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BYzYzZDViNWYtNWViMS00NDMxLThlN2YtZjFkOWMwODkzNzhiXkEyXkFqcGdeQXVyMTUwMzM4NzU0._V1_SX300.jpg",
// };

const App = () => {
  // function sayHello() {
  //   alert("You clicked me!");

  const [movies, setMovies] = useState([]);
  const [SearchTerm, setSearchTerm] = useState("");
  //asynch means Data is transfered without any regularity / take sometime to fetch movies
  //title is accepted as a serach term
  //then these search movies are serached from the given API URL
  //then once we get the response we have to get these data from it
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    //console.log(data);
    //setMovies(data.Search);
    const serachMovies = data.Search;
    const numAscending = [...serachMovies].sort((a, b) => a.Year - b.Year);
    //console.log(numAscending);
    setMovies(numAscending);
  };

  useEffect(() => {
    searchMovies();
  }, []);

  return (
    <div className="app">
      <h1>Movie Island</h1>
      <div className="search">
        <input
          placeholder="search for movies"
          value={SearchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(SearchTerm)}
        />
      </div>
      <button className="btn" onClick={() => console.log("hi")}>
        <h2> Sort by year</h2>
      </button>
      {/* <div className="btn" onClick={() => sayHello}>
        <h2> Sort by year</h2>
      </div> */}

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
            // <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2> No movies found</h2>
        </div>
      )}
    </div>
  );
};
export default App;
//{from line 53} here we check below the search bar if there is any movies after giving a serach value,
//if there is no movies in the array, therfor display 'No movies found'
