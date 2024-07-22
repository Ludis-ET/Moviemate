import { Route, Routes } from "react-router-dom";
import { Middle, Results, List, Movie, MovieList, TvList, Leaderboard, Series } from "../pages";
import { Header } from "../pages/Home/Header";
import { Rate } from "../pages/Forms/Rate";

export const AllRoutes = () => {
  return (
    <div className="ml-0 xl:ml-52 h-screen w-full xl:w-[85%] px-4 md:px-8 lg:px-20">
      <Header />
      <Routes>
        <Route path="/" exact element={<Middle />} />
        <Route path="/search" element={<Results />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/tvs" element={<TvList />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/about-to" element={<List />} />
        <Route path="/:id/detail" element={<Movie />} />
        <Route path="/:id/tv/detail" element={<Series />} />
        {/* <Route
          path="/movies/popular"
          element={<MovieList api="movie/popular" />}
        />
        <Route
          path="/movies/upcoming"
          element={<MovieList api="movie/upcoming" />}
        />
        <Route
          path="/movies/top"
          element={<MovieList api="movie/top_rated" />}
        />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
};
