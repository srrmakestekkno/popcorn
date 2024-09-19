import WatchedMovie from "./WatchedMovie";

/* presentational component */
const WatchedMoviesList = ({ watched, onDeleteWatched }) => {
  return (
    <ul className="list list-movies">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
};

export default WatchedMoviesList;
