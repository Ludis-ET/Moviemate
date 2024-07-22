import { Slideshow } from "./SlideShow";
import { Movies } from "./Movies";
import { Series } from "./Series";
import { Footer } from "../../components";
import Ludis from "../../assets/ludis.jpg";

export const Middle = () => {
  return (
    <div>
      <Slideshow />
      <Movies
        url="https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
        title="Top Rated Movies"
      />
      <div className="container mx-auto px-4 py-8">
        <div className="xl:flex xl:items-center xl:justify-center">
          <div className="xl:w-1/2 xl:flex xl:items-center xl:justify-center">
            <figure>
              <img src={Ludis} className="w-full xl:w-80" alt="Movie" />
            </figure>
          </div>
          <div className="xl:w-1/2">
            <div className="card-body p-4 xl:p-8">
              <h2 className="card-title text-2xl font-bold mb-4">
                I am Ludis, a Software Engineer and Fullstack Developer
              </h2>
              <p className="mb-4">
                This project is developed using React, Tailwind CSS, Firebase,
                and the TMDB API. It's open-source and aims to provide a
                seamless and engaging experience for users to rate and explore
                movies and TV series.
              </p>
              <p className="mb-4">
                Click the button below to get the source code
              </p>
              <div className="card-actions flex justify-end">
                <a
                  href="https://github.com/ludis-et/moviemate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-dark"
                >
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Series />
      <Footer />
    </div>
  );
};
