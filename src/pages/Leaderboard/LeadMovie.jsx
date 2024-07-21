import { useAuth } from "../../context/AuthContext";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";
import F from '../../assets/rate.svg'

export const LeadMovie = () => {
  const { db, currentUser } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const aboutRef = collection(db, "leaderboard");

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const data = await getDocs(aboutRef);
        const res = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setMovies(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, [db]);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-ring w-56"></span>
      </div>
    );
  }

  if (
    movies.length === 0 ||
    movies.filter((m) => m.userId === currentUser.uid).length === 0
  ) {
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
    <div className=" py-8 mt-4 flex gap-8 flex-wrap w-full">
      {movies
        .filter((m, index) => m.userId === currentUser.uid)
        .map((m, index) => (
          <MovieCard key={m.id} movies={m} type={m.type} rank={index} />
        ))}
    </div>
  );
};
