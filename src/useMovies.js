import { useState, useEffect } from "react";

const key = "fd36d2ef";

export const useMovies = (query /*, callback*/) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // could be a normal event handler
  useEffect(() => {
    //callback?.(); // will only be called if the callback exists
    const controller = new AbortController(); // browser API

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `https://www.omdbapi.com/?i=tt3896198&apikey=${key}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error("Something went wrong with fetching movies...");
        }

        const data = await res.json();
        if (data.Response === "False") {
          throw new Error("Movie not found...");
        }

        setMovies(data.Search);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();

    return () => {
      // For each new key stroke, the controller will abort the previous request.
      // Cancel current request when a new one comes in.
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
};
