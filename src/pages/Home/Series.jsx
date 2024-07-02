import React, { useRef, useState, useEffect } from "react";
import { fetchHomepage } from "../../hooks/fetchHomepage";
import { MovieCard } from "./MovieCard";

export const Series = () => {
  const scrollRef = useRef(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetchHomepage(
          "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1"
        );
        setMovies(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(true);
      }
    };

    fetchMovies();
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -240,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 240,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="overflow-hidden">
      <header className="text-white text-2xl flex justify-between m-2">
        <p>Top Rated Tv Series</p>
        <div className="flex gap-2">
          <i
            className="fa fa-arrow-left py-2 cursor-pointer hover:bg-opacity-10 bg-gray-900 bg-opacity-50 rounded-full px-2"
            onClick={scrollLeft}
          ></i>
          <i
            className="fa fa-arrow-right py-2 cursor-pointer hover:bg-opacity-10 bg-gray-900 bg-opacity-50 rounded-full px-2"
            onClick={scrollRight}
          ></i>
        </div>
      </header>
      <main
        className="w-full flex gap-6 overflow-x-hidden transition-[2s]"
        style={{ scrollBehavior: "smooth" }}
        ref={scrollRef}
      >
        {loading || movies === undefined
          ? [1, 2, 3].map(() => (
              <div className="w-60 h-80 bg-gray-700 animate-pulse rounded-lg"></div>
            ))
          : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </main>
    </div>
  );
};
