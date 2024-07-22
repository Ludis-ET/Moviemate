import { useAuth } from "../../context/AuthContext";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";
import F from "../../assets/rate.svg";
import "./refresh.css";

export const LeadTv = () => {
  const { db, currentUser } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const aboutRef = collection(db, "leaderboard");

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const data = await getDocs(aboutRef);
        const res = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        const filteredMovies = res.filter(
          (m) => m.userId === currentUser.uid && m.type === "tv"
        );

        const sortedMovies = filteredMovies
          .map((movie) => {
            const {
              cinematography = 0,
              characters = 0,
              climax = 0,
              ending = 0,
              overall = 0,
              starting = 0,
              visual = 0,
              plot = 0,
              soundtrack = 0,
              story = 0,
              characterDevelopment = 0,
              other = 0,
            } = movie;

            const averageRating = (
              (cinematography +
                characters +
                climax +
                ending +
                overall +
                starting +
                visual +
                plot +
                soundtrack +
                story +
                characterDevelopment +
                other) /
              12
            ).toFixed(1);

            return { ...movie, averageRating: parseFloat(averageRating) };
          })
          .sort((a, b) => b.averageRating - a.averageRating);

        setMovies(sortedMovies);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [db, currentUser.uid, refresh]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-ring w-56"></span>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div>
        <div className="text-3xl text-white text-center mt-8">Start Rating</div>
        <div className="flex justify-center">
          <img src={F} className="w-1/2 text-center self-center" alt="" />
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 mt-4 flex gap-8 flex-wrap w-full">
      <button
        type="button"
        class="button outline-none"
        onClick={() => setRefresh(!refresh)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-arrow-repeat"
          viewBox="0 0 16 16"
        >
          <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"></path>
          <path
            fill-rule="evenodd"
            d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
          ></path>
        </svg>
        Refresh
      </button>

      {movies.map((m, index) => (
        <MovieCard key={m.id} movies={m} type={m.type} rank={index} />
      ))}
    </div>
  );
};
