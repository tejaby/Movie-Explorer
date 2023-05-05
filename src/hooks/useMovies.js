import { useState, useRef, useMemo, useCallback } from "react";
import { searchMovies } from "../services/movies";
import responseMovies from "../assets/response.json";
import noResponse from "../assets/error.json";

export const useMovies = ({ data, sort }) => {
  const [movies, SetMovies] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previousSearch = useRef(data);

  const getMovies = useCallback(async ({ data }) => {
    if (data === previousSearch.current) return;
    try {
      setLoading(true);
      setError(null);
      previousSearch.current = data;
      const res = await searchMovies({ data });
      SetMovies(res);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const sortMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) =>
          a.title.localeCompare(b.title, "es", { sensitivity: "accent" })
        )
      : movies;
  }, [sort, movies]);

  return { movies: sortMovies, getMovies, Loading };
};
