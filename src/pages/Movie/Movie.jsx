import { useState, useEffect } from "react";
import { fetchHomepage } from "../../hooks/fetchHomepage";
import { useParams } from "react-router-dom";
import { Button } from "../../components";

export const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const data = await fetchHomepage(
          `https://api.themoviedb.org/3/movie/${id}`
        );
        const img = await fetchHomepage(
          `https://api.themoviedb.org/3/movie/${id}/images`
        );
        setMovie(data);
        setImages(img.posters);
      } catch (error) {
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
                        22
                      </span>
                      <span className="text-sm text-white">Friends</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-white">
                        10
                      </span>
                      <span className="text-sm text-white">Photos</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-white">
                        89
                      </span>
                      <span className="text-sm text-white">Comments</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-white">
                  Jenna Stones
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-white font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-white"></i>
                  Los Angeles, California
                </div>
                <div className="mb-2 text-white mt-10">
                  <i className="fas fa-briefcase mr-2 text-lg text-white"></i>
                  Solution Manager - Creative Tim Officer
                </div>
                <div className="mb-2 text-white">
                  <i className="fas fa-university mr-2 text-lg text-white"></i>
                  University of Computer Science
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-white text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-white">
                      An artist of considerable range, Jenna the name taken by
                      Melbourne-raised, Brooklyn-based Nick Murphy writes,
                      performs and records all of his own music, giving it a
                      warm, intimate feel with a solid groove structure. An
                      artist of considerable range.
                    </p>
                    <a href="#pablo" className="font-normal text-pink-500">
                      Show more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
