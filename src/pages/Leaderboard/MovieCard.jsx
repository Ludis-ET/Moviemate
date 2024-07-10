import { useState, useEffect } from "react";
import { fetchHomepage } from "../../hooks/fetchHomepage";
import { Button, DeleteButton, LikeButton } from "../../components";

export const MovieCard = ({ movies }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const data = await fetchHomepage(
          `https://api.themoviedb.org/3/movie/${movies.movieId}`
        );
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };

    if (movies.movieId) {
      fetchMovie();
    }
  }, [movies.movieId]);
  return (
    <>
      {loading ? (
        <div
          className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden bg-gray-300 animate-pulse"
          title="Loading image"
        ></div>
      ) : (
        <div className="w-full lg:flex">
          <div
            className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`,
            }}
            title={movie.title}
          ></div>
          <div className="text-white bg-transparent rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="mb-8">
              <p className="text-sm text-grey-dark flex items-center">
                {movie.tagline}
              </p>
              <div className="text-white font-bold text-xl mb-2">
                {movie.title}
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-sm h-32 pl-8 justify-between items-center w-full flex flex-wrap  gap-8">
                <Button text={movies.rate.toFixed(1)} rate={true} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
