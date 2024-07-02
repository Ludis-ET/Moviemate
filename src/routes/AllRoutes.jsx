import { Route, Routes } from "react-router-dom";
import { Middle, Results, List } from "../pages";
import { Header } from "../pages/Home/Header";

export const AllRoutes = () => {
  return (
    <div className="md:ml-52 h-screen md:w-[65%] px-20">
      <Header />
      <Routes>
        <Route path="/" exact element={<Middle />} />
        <Route path="/search" element={<Results />} />
        <Route path="/about-to" element={<List />} />
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
