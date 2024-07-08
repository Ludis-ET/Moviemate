import React, { useState, useEffect } from "react";
import { fetchHomepage } from "../../hooks/fetchHomepage";
import { format } from "date-fns";

export const Slideshow = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetchHomepage(
          "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
        );
        setMovies(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(true);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 9000);

    return () => clearInterval(interval);
  }, [movies]);

  let slides = [];

  if (movies) {
    slides = movies.map((movie) => ({
      image: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
      text: movie.title,
      overview: movie.overview,
      release_date: movie.release_date,
      vote_av: movie.vote_average.toFixed(1),
      vote_count: movie.vote_count,
    }));
  }
  console.log(slides.length);

  return loading || slides.length === 0 ? (
    <div className="relative w-full h-96 overflow-hidden rounded-md animate-pulse bg-gray-200">
      <div className="absolute inset-0 w-full h-full flex justify-between items-end">
        <div className="w-full h-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
          <div className="w-1/2 flex gap-2">
            <span className="rounded-lg bg-gray-300 p-1"></span>
            <span className="rounded-lg bg-gray-300 p-1"></span>
            <span className="rounded-lg bg-gray-300 p-1"></span>
          </div>

          <div className="flex justify-between mt-[28%] w-full">
            <div className="w-1/2">
              <div className="h-6 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-center gap-0">
              <div className="bg-gray-300 py-2 px-4 w-32 rounded self-end my-4"></div>
              <div className="bg-gray-300 border-gray-300 py-2 px-4 rounded self-end my-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="relative w-full h-96 overflow-hidden rounded-md">
      <img
        src={slides[currentIndex].image}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 w-full h-full flex justify-between items-end">
        <div className="w-full h-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
          <div className="w-1/2 flex gap-2">
            <span className="rounded-lg bg-gradient-to-t from-[#e0324b] to-transparent backdrop-blur-lg p-1 text-white">
              {format(
                new Date(slides[currentIndex].release_date),
                "MMMM dd, yyyy"
              )}
            </span>
            <span className="rounded-lg bg-gradient-to-t from-[#e0324b] to-transparent backdrop-blur-lg p-1 text-white">
              {slides[currentIndex].vote_count} person
            </span>
            <span className="rounded-lg bg-gradient-to-t from-[#e0324b] to-transparent backdrop-blur-lg p-1 text-white">
              {slides[currentIndex].vote_av} <i className="fa fa-star"></i>
            </span>
          </div>

          <div className="flex justify-between mt-[28%] w-full">
            <div className="w-1/2">
              <div className="text-lg font-bold">
                {slides[currentIndex].text}
              </div>
              <div className="text-sm mt-2">
                {slides[currentIndex].overview.slice(0, 100)}...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
