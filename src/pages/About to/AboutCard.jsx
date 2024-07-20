import { useState, useEffect } from "react";
import { fetchHomepage } from "../../hooks/fetchHomepage";
import { Button, DeleteButton, LikeButton } from "../../components";
import {
  collection,
  deleteDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export const AboutCard = ({ movieData, setMovies }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const { db, currentUser } = useAuth();

  const RemoveAboutTo = async () => {
    setButtonLoading(true);
    try {
      const q = query(
        collection(db, "about-to"),
        where("movieId", "==", Number(movieData.movieId)),
        where("userId", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      setMovies((prevMovies) =>
        prevMovies.filter((item) => item.movieId !== movieData.movieId)
      );
      toast.success("Removed from About To successfully.");
    } catch (error) {
      toast.error("Failed to update About To.");
      console.error("Error updating About To:", error);
    } finally {
      setButtonLoading(false);
    }
  };

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        let data;
        if (movieData.type === "movie") {
          data = await fetchHomepage(
            `https://api.themoviedb.org/3/movie/${movieData.movieId}`
          );
        } else {
          data = await fetchHomepage(
            `https://api.themoviedb.org/3/tv/${movieData.movieId}`
          );
        }
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    if (movieData.movieId && movieData.type) {
      fetchMovie();
    }
  }, [movieData.movieId, movieData.type]);

  return (
    <>
      {loading ? (
        <div className="w-full flex">
          <div
            className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden bg-gray-300 animate-pulse"
            title="Loading image"
          ></div>
          <div className="text-white w-full bg-transparent rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="mb-8">
              <div className="bg-gray-300 h-6 w-3/4 mb-2 animate-pulse"></div>
              <div className="bg-gray-300 h-4 w-full animate-pulse mb-1"></div>
              <div className="bg-gray-300 h-4 w-5/6 animate-pulse"></div>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-4 animate-pulse"></div>
              <div className="text-sm">
                <div className="bg-gray-300 h-4 w-20 animate-pulse mb-1"></div>
                <div className="bg-gray-300 h-4 w-16 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
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
                {movieData.type === "tv" ? movie.name : movie.title}
              </div>
              <p className="text-grey-darker text-base min-h-32">
                {movie.overview}
              </p>
            </div>
            <div className="flex items-center">
              <div className="text-sm justify-between items-center w-full flex flex-wrap gap-8">
                <Button text={movie.vote_average.toFixed(1)} rate={true} />
                <div className="flex gap-8">
                  <LikeButton />
                  <button onClick={RemoveAboutTo} disabled={buttonLoading}>
                    <DeleteButton />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
