import { useEffect, useState } from "react";
import F from "../../assets/404.svg";
import { fetchHomepage } from "../../hooks/fetchHomepage";
import Example from "../Search/example";
import { Footer } from "../../components";

export const MovieList = () => {
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const movieResults = await fetchHomepage(
          `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${currentPage}`
        );

        setMovies(movieResults.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const totalPages = 100;
    const pageNumbers = [];
    const maxButtons = 5;

    if (currentPage > maxButtons) {
      pageNumbers.push(
        <button
          key={1}
          className={`join-item btn btn-square ${
            currentPage === 1 ? "btn-secondary" : ""
          }`}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      );
      if (currentPage > maxButtons + 1) {
        pageNumbers.push(<span key="dots1" className="btn btn-square">...</span>);
      }
    }

    const startPage = Math.max(currentPage - Math.floor(maxButtons / 2), 1);
    const endPage = Math.min(startPage + maxButtons - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`join-item btn btn-square ${currentPage === i ? 'btn-primary' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages - maxButtons) {
      if (currentPage < totalPages - maxButtons - 1) {
        pageNumbers.push(<span key="dots2" className="btn btn-square">...</span>);
      }
      pageNumbers.push(
        <button
          key={totalPages}
          className={`join-item btn btn-square ${currentPage === totalPages ? 'btn-primary' : ''}`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  if (loading) {
    return (
      <span className="loading absolute top-[30%] left-[40%] loading-ring w-56"></span>
    );
  }

  if (error) {
    return (
      <div className="mt-[50%] xl:mt-24">
        <div>Error: {error}</div>
        <div className="flex justify-center">
          <img
            src={F}
            className="xl:w-1/2 text-center self-center"
            alt="Error"
          />
        </div>
      </div>
    );
  }
  return (
    <div>
      <h1>Now Playing Movies</h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {movies.length > 0 ? (
          movies.map((result) => (
            <div key={result.id} className="p-2">
              <Example movie={result} />
            </div>
          ))
        ) : (
          <p className="text-center">No results found</p>
        )}
      </div>
      <div className="w-full flex justify-center">
        {movies.length > 0 && <div className="join">{renderPagination()}</div>}
      </div>
      <Footer />
    </div>
  );
};
