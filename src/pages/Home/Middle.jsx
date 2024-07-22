import { Slideshow } from "./SlideShow";
import { Movies } from "./Movies";
import { Series } from "./Series";
import { Footer } from "../../components";
import Ludis from "../../assets/ludis.jpg";

export const Middle = () => {
  return (
    <div>
      <Slideshow />
      <Movies url="https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1" title='Top Rated Movies' />
      <div className="m-16 card card-side bg-transparent shadow-2xl">
        <figure>
          <img src={Ludis} className="w-80" alt="Movie" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            I am Ludis, a Software Engineer and Fullstack Developer
          </h2>
          <p>
            This project is developed using React, Tailwind CSS, Django, Django
            JWT, and the TMDB API. It's open-source.
          </p>
          <p>Click the button below to get the source code</p>
          <div className="card-actions justify-end">
            <a
              href="https://github.com/ludis-et/moviemate"
              target="_blank"
              className="btn btn-dark"
            >
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
      </div>
      <Series />
      <Footer />
    </div>
  );
};
