export const MovieCard = ({ movie }) => {
  return (
    <>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt=""
        className="w-60 cursor-pointer h-80 rounded-lg"
      />
    </>
  );
};
