import { AboutCard } from "./AboutCard";
import { useAuth } from "../../context/AuthContext";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";

export const List = () => {
  const { db } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const aboutRef = collection(db, "about-to");

  useEffect(() => {
    const getMovies = async () => {
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
  }, [aboutRef]);

  if (loading) {
    return (
      <>
        <span className="loading absolute top-[30%] left-[40%] loading-ring w-56"></span>
      </>
    );
  }

  return (
    <div className="w-full mt-4 flex gap-8 flex-wrap">
      {movies.map((m) => (
        <AboutCard key={m.id} movies={m} />
      ))}
    </div>
  );
};
