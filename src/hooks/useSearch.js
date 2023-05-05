import { useState, useEffect, useRef } from "react";

export const useSearch = () => {
  const [data, setData] = useState("");
  const [error, setError] = useState(null);
  const firstInput = useRef(true);

  useEffect(() => {
    if (firstInput.current) {
      firstInput.current = data === "";
      return;
    }

    if (data === "") {
      setError("No se puede buscar una pelicula vacia");
      return;
    }

    if (data.length < 3) {
      setError("La busqueda debe tener al menos 3 caracteres");
      return;
    }

    setError(null);
  }, [data]);

  return { data, setData, error };
};
