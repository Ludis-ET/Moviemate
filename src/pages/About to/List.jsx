import { AboutCard } from "./AboutCard";
import { useAuth } from "../../context/AuthContext";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import F from "../../assets/about.svg";
import L from "../../assets/login.svg";
import { Footer } from "../../components";

export const List = () => {
  const { db, currentUser } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const aboutRef = collection(db, "about-to");

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

  // Function to remove a movie from the list
  const handleRemoveMovie = (movieId) => {
    setMovies((prevMovies) =>
      prevMovies.filter((movie) => movie.id !== movieId)
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-ring w-56"></span>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="mt-[50%] xl:mt-24">
        <div className="text-3xl text-white text-center">Login First</div>
        <div className="flex justify-center">
          <img src={L} className="xl:w-1/2 text-center self-center" alt="" />
        </div>
      </div>
    );
  }

  if (
    movies.length === 0 ||
    movies.filter((m) => m.userId === currentUser.uid).length === 0
  ) {
    return (
      <div className="mt-[50%] xl:mt-24">
        <div className="text-3xl text-white text-center">Add Something</div>
        <div className="flex justify-center">
          <img src={F} className="xl:w-1/2 text-center self-center" alt="" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-4 flex gap-8 flex-wrap">
      <Toaster />
      <div>
        {movies.filter((m) => m.userId === currentUser.uid).length} movies about
        to rate
      </div>

      {movies
        .filter((m) => m.userId === currentUser.uid)
        .map((m) => (
          <AboutCard key={m.id} movieData={m} onRemove={handleRemoveMovie} />
        ))}
      <Footer />
    </div>
  );
};
