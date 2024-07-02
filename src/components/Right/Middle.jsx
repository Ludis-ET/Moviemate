import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { fetchHomepage } from "../../hooks/fetchHomepage";
import { formatDistanceToNow } from "date-fns";
import Empty from "../../assets/emp.svg";

export const Middle = () => {
  const { currentUser } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toogle, setToogle] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetchHomepage(
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"
        );
        setMovies(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(true);
      }
    };

    fetchMovies();
  }, [toogle]);
  const click = () => {
    setLoading(true);
    setToogle(!toogle);
    console.log("yes");
  };

  return (
    <div className="w-full mt-4 bg-transparent rounded-lg sm:p-8">
      <div className="flex items-center justify-between">
        <h5 className="text-xl mb-4 font-bold leading-none text-gray-900 dark:text-white">
          {currentUser ? "Start Rating Now" : "Recent Movies"}
        </h5>
        <i className="fa fa-refresh cursor-pointer" onClick={click}></i>
      </div>
      <div className="flow-root">
        {currentUser ? (
          <div className="p-12">
            <img src={Empty} alt="" />
          </div>
        ) : (
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {loading || movies === undefined
              ? [1, 2, 3].map(() => (
                  <li className="p-2">
                    <div className="flex items-center animate-pulse">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded bg-gray-300 dark:bg-gray-700"></div>
                      </div>
                      <div className="flex-1 min-w-0 ms-4">
                        <div className="h-4 bg-gray-300 rounded w-3/4 dark:bg-gray-700 mb-2"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/2 dark:bg-gray-700"></div>
                      </div>
                      <div className="inline-flex items-center gap-1 text-base font-semibold text-gray-300 dark:text-gray-700">
                        <div className="w-6 h-6 bg-gray-300 rounded-full dark:bg-gray-700"></div>
                        <div className="w-6 h-4 bg-gray-300 rounded dark:bg-gray-700"></div>
                      </div>
                    </div>
                  </li>
                ))
              : movies.slice(0, 8).map((m) => (
                  <li className="p-2">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          className="w-16 h-16 rounded"
                          src={`https://image.tmdb.org/t/p/w500/${m.poster_path}`}
                          alt="Neil image"
                        />
                      </div>
                      <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {m.original_title}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {formatDistanceToNow(m.release_date)} ago
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-1 text-base font-semibold text-gray-900 dark:text-white">
                        <i className="fa fa-star"></i>{" "}
                        {m.vote_average.toFixed(1)}
                      </div>
                    </div>
                  </li>
                ))}
          </ul>
        )}
      </div>
    </div>
  );
};
