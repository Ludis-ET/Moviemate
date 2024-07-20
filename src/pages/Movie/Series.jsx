import { useState, useEffect } from "react";
import { fetchHomepage } from "../../hooks/fetchHomepage";
import { useParams } from "react-router-dom";
import { Button } from "../../components";
import { format } from "date-fns";
import { Movies } from "../Home/Movies";
import { Footer } from "../../components";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

export const Series = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isInAboutTo, setIsInAboutTo] = useState(false);
  const { db, currentUser } = useAuth();

    useEffect(() => {
      const checkAboutToStatus = async () => {
        if (id && currentUser) {
          const q = query(
            collection(db, "about-to"),
            where("movieId", "==", Number(id)),
            where("userId", "==", currentUser.uid)
          );
          const querySnapshot = await getDocs(q);
          setIsInAboutTo(!querySnapshot.empty);
        }
      };

      checkAboutToStatus();
    }, [id, currentUser, db]);

  const addOrRemoveAboutTo = async () => {
    setButtonLoading(true);
    const currentTime = new Date();
    const aboutToData = {
      movieId: Number(id),
      time: currentTime.toISOString(),
      userId: currentUser.uid,
      type: "tv",
    };

    try {
      if (isInAboutTo) {
        const q = query(
          collection(db, "about-to"),
          where("movieId", "==", Number(id)),
          where("userId", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
        toast.success("Removed from About To successfully.");
      } else {
        await addDoc(collection(db, "about-to"), aboutToData);
        toast.success("Added to About To successfully.");
      }
      setIsInAboutTo(!isInAboutTo);
    } catch (error) {
      toast.error("Failed to update About To.");
      console.error("Error updating About To:", error);
    } finally {
      setButtonLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const data = await fetchHomepage(
          `https://api.themoviedb.org/3/tv/${id}`
        );
        const img = await fetchHomepage(
          `https://api.themoviedb.org/3/tv/${id}/images`
        );
        setMovie(data);
        setImages(img.posters);
      } catch (error) {
        setLoading(false);
        toast.error("Error fetching movie data.");
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovie();
    }
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (images.length + 1));
    }, 10000);

    return () => clearInterval(interval);
  }, [images.length]);

  const slides = [
    {
      image: movie?.backdrop_path
        ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
        : null,
    },
    ...images.map((img) => ({
      image: `https://image.tmdb.org/t/p/w500/${img.file_path}`,
    })),
  ];

  if (loading || movie === null) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-ring w-56"></span>
      </div>
    );
  }
  return (
    <main className="profile-page">
      <Toaster />
      <section className="relative block h-500-px">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: `url("${
              slides[currentIndex] && slides[currentIndex].image
                ? slides[currentIndex].image
                : "https://imgs.search.brave.com/Up5OWJDsaXV9kx91YCA1K4hIg1C-I3nIlHl_6DiXM_k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTEz/Mjc5MTk2Mi9waG90/by9oYXBweS1hdC10/aGUtbW92aWVzLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1i/cU5RcnpQelhDV3p3/TkUwSDIyUU14dkxU/c1VJb0NVRWRUWWdF/U0JmYjZFPQ"
            }")`,
          }}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-50 bg-black"
          ></span>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style={{ transform: "translateZ(0px)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-transparent fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </section>
      <section className="relative py-16 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-[#24282a] text-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <img
                      alt="profile"
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                          : "https://via.placeholder.com/500x750?text=No+Image+Available"
                      }
                      className="shadow-xl rounded-2xl h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <Button text={movie.vote_average.toFixed(1)} rate={true} />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-white">
                        {movie.number_of_seasons}
                      </span>
                      <span className="text-sm text-white">Seasons</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-white">
                        {movie.adult ? "Yes" : "no"}
                      </span>
                      <span className="text-sm text-white">Adultry</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-white">
                        {movie.number_of_episodes}
                      </span>
                      <span className="text-sm text-white">Episodes</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-white">
                  {movie.name}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-white font-bold uppercase">
                  {movie.tagline}
                </div>
                <div className="text-sm leading-normal mt-0 mb-2 text-white ">
                  {movie.status}
                </div>
                <div className="text-sm leading-normal mt-0 mb-2 text-white font-bold uppercase">
                  {/* {format(new Date(movie.release_date), "MMMM dd, yyyy")} */}
                </div>
                <div className="mb-2 flex flex-wrap gap-4 justify-center text-white mt-10">
                  {movie.genres.map((g) => (
                    <button class="bg-red-950 text-red-400 border border-red-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                      <span class="bg-red-400 shadow-red-400 absolute -top-[150%] left-0 inline-flex w-80 h-80 rounded-full opacity-30 transition-all duration-500 group-hover:top-[25%]"></span>
                      <span class="flex items-center gap-2 text-inherit transition group-hover:scale-90">
                        <span class="relative -ml-2 inline-block h-3 w-3 rotate-45 rounded-sm bg-gradient-to-tr from-red-200 to-red-500 shadow-[0_0_4px_#0005,0_1px_2px_#0003,0_2px_4px_#0002] transition duration-500 group-hover:scale-125 group-hover:rotate-[225deg]"></span>
                        <span class="transition-colors duration-200 group-hover:text-white">
                          {g.name}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
                <div className="mb-2 text-white">
                  {movie.vote_count} people voted it
                </div>
                <div className="mb-2 ">
                  <button
                    onClick={addOrRemoveAboutTo}
                    className={`group group-hover:before:duration-500 pr-24 group-hover:after:duration-1000 after:duration-500 hover:border-red-300  duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-2 hover:before:top-8 hover:before:right-16 hover:after:scale-150 hover:after:blur-none hover:before:-bottom-8 hover:before:blur-none hover:bg-red-300 hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-red-900 relative bg-red-800 h-16 w-64 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-red-400 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-[#333] after:right-8 after:top-3 after:rounded-full after:blur ${
                      buttonLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={buttonLoading}
                  >
                    {buttonLoading ? (
                      <div
                        class="loader border-t-2 rounded-full border-gray-500 bg-white animate-spin
aspect-square w-8 flex justify-center items-center text-yellow-700"
                      ></div>
                    ) : isInAboutTo ? (
                      "Remove from About To"
                    ) : (
                      "Add to About To"
                    )}
                  </button>
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-white text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-white">
                      {movie.overview}
                    </p>
                  </div>
                </div>
              </div>

              <div className="">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Seasons</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {movie.seasons.slice(1).map((m) => (
                      <tr key={m.id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask h-52 w-36">
                                <img
                                  src={`https://image.tmdb.org/t/p/w500/${m.poster_path}`}
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          {m.name}
                          <br />
                          <span className="badge badge-ghost badge-sm">
                            {format(new Date(m.air_date), "MMMM dd, yyyy")}
                          </span>
                        </td>
                        <td>{m.episode_count} episodes</td>
                        <th>
                          <button className="btn btn-ghost btn-xs">
                            {m.vote_average} / 10
                          </button>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr></tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Movies
        url={`https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1`}
        title="Recommendations"
      />
      <Footer />
    </main>
  );
};
