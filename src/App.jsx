import { useState, useEffect, useCallback } from "react";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";
import debounce from "just-debounce-it";

import "./App.css";

function App() {
  const [sort, setSort] = useState(false);
  const { data, setData, error } = useSearch();
  const { movies, getMovies, Loading } = useMovies({ data, sort });

  const debounceGetMovies = useCallback(
    debounce((data) => {
      console.log(data);
      getMovies({ data });
    }, 500),
    []
  );

  const handleChange = (e) => {
    const newData = e.target.value;
    setData(newData);
    debounceGetMovies(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({data})
    getMovies({ data });
  };

  const handleSort = () => {
    setSort(!sort);
  };

  // useEffect(() => {
  //   console.log("first")
  // },[getMovies])

  return (
    <div className="page">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Mario Bros, Transformers..."
          value={data}
          onChange={handleChange}
        />
        <div className="sort">
          <label>Ordenar</label>
          <input type="checkbox" onChange={handleSort} value={sort} />
        </div>
        <input type="submit" />
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <main>{Loading ? <p>Loading...</p> : <Movies movies={movies} />}</main>
    </div>
  );
}

export default App;
