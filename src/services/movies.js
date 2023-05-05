export const searchMovies = async ({ data }) => {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=7197d9bd&s=${data}`
    );
    const json = await response.json();

    const movies = json.Search;

    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    }));
  } catch (e) {
    throw new Error("Error al buscar la pelicula");
  }
};
