import React, { useRef } from "react";
import { MovieCard } from "./MovieCard";

export const Movies = () => {
  const scrollRef = useRef(null);

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
        <p>Popular Movies</p>
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
        className="w-full flex gap-6 overflow-x-hidden  transition-[2s]"
        style={{ scrollBehavior: "smooth" }}
        ref={scrollRef}
      >
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </main>
    </div>
  );
};