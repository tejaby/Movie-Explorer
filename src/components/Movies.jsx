const RenderMovies = ({ movies }) => {
  return (
    <ul className="movies">
      {movies.map((movie) => (
        <li className="movie" key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.year}</p>
          <img src={movie.poster} alt="" />
        </li>
      ))}
    </ul>
  );
};

const RenderNotMovies = () => {
  return <p>Movie Not Found</p>;
};

export const Movies = ({ movies }) => {
  const hasMovies = movies?.length > 0;
  return hasMovies ? <RenderMovies movies={movies} /> : <RenderNotMovies />;
};
