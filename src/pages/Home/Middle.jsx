import { Header } from "./Header";
import { Slideshow } from "./SlideShow";
import { Movies } from "./Movies";
import { Series } from "./Series";
import Ludis from "../../assets/ludis.jpg";

export const Middle = () => {
  return (
    <div>
      <Header />
      <Slideshow />
      <Movies />
      <div className="m-16 card card-side bg-transparent shadow-2xl">
        <figure>
          <img src={Ludis} alt="Movie" />
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
      <footer className="footer footer-center bg-transparent mt-12 text-base-content rounded p-10">
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover">Whishlist</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">About to</a>
          <a className="link link-hover">Leaderboard</a>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a href="" className="fab fa-github fa-2x"></a>
            <a href="" className="fab fa-telegram fa-2x"></a>
            <a href="" className="fab fa-instagram fa-2x"></a>
          </div>
        </nav>
        <aside>
          <p>
            Copyright © ${new Date().getFullYear()} - All right reserved by
            Ludis
          </p>
        </aside>
      </footer>
    </div>
  );
};
