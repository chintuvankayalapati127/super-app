import { useState ,useEffect} from "react";
import "./Movies.css";
import axios from "axios";

function Movies() {

   const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const categories =
 JSON.parse(localStorage.getItem("categories")) || [];
 const searchTerm = categories[0] || "Avengers";
    
      useEffect(() => {
        axios
        .get(
            `https://www.omdbapi.com/?s=${searchTerm}&apikey=d1c6e84d`
        )
         .then((res) => {
          setMovies(res.data.Search || []);
         })
         .catch((err) => {
          console.log(err);
           });
       }, [searchTerm]);


  return (
    <div className="movies-container">
      <h1>🎬 Movie Recommendations</h1>


      <div className="movies-grid">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="movie-card"
            onClick={() => setSelectedMovie(movie)}
          >
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="modal">
          <div className="modal-content">
                  <img src={selectedMovie.Poster} alt={selectedMovie.Title} style={{ width: "100%", borderRadius: "10px" }} />
            <h2>{selectedMovie.Title}</h2>
            <p>Year:{selectedMovie.Year}</p>
           
           <button onClick={() => {
           localStorage.setItem(
             "movie",
            selectedMovie.Title
          );
        setSelectedMovie(null);
         }}
       >
          Close
     </button>
          
          </div>
        </div>
      )}
    </div>
  );
}

export default Movies;