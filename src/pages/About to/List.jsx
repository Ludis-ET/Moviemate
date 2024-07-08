import { AboutCard } from "./AboutCard";
import { useAuth } from "../../context/AuthContext";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";

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
  if (loading || movies.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-ring w-56"></span>
      </div>
    );
  }

  return (
    <div className="w-full mt-4 flex gap-8 flex-wrap">
      {movies
        .filter((m) => m.userId === currentUser.uid)
        .map((m) => (
          <AboutCard key={m.id} movies={m} />
        ))}
    </div>
  );
};
