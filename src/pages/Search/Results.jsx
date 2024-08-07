import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import F from "../../assets/404.svg";
import { fetchHomepage } from "../../hooks/fetchHomepage";
import Example from "./example";

export const Results = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("name");
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const movieResults = await fetchHomepage(
          `https://api.themoviedb.org/3/search/movie?query=${searchTerm}`
        );
        const tvResults = await fetchHomepage(
          `https://api.themoviedb.org/3/search/tv?query=${searchTerm}`
        );

        const combinedData = [...movieResults.results, ...tvResults.results];

        combinedData.sort((a, b) => b.vote_average - a.vote_average);

        setMovies(combinedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (searchTerm) {
      fetchMovies();
    }
  }, [searchTerm]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-ring w-56"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-[50%] xl:mt-24">
        <div>Error: {error}</div>
        <div className="flex justify-center">
          <img
            src={F}
            className="xl:w-1/2 text-center self-center"
            alt="Error"
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Search Results for "{searchTerm}"</h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {movies.length > 0 ? (
          movies.map((result) => (
            <div key={result.id} className="p-2">
              <Example movie={result} />
            </div>
          ))
        ) : (
          <p className="text-center">No results found</p>
        )}
      </div>
    </div>
  );
};
