import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Link
      to={`/${movie.id}/detail`}
      className="relative flex justify-center items-center h-96 w-56 rounded-2xl bg-cover bg-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`,
      }}
    >
      <span className="w-56 h-2 rounded-br-xl rounded-bl-xl"></span>
    </Link>
  );
};
