import { useState, useEffect } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

const key = "fd36d2ef";

const MovieDetails = ({ selectedId, onCloseMovie, onAddWatched }) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  };

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${key}&i=${selectedId}`
      );

      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    };
    getMovieDetails();
  }, [selectedId]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating
                maxRating={10}
                size={24}
                onSetRating={setUserRating}
              />
              {userRating > 0 && (
                <button className="btn-add" onClick={handleAdd}>
                  Add to list
                </button>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
