import React, { useState, useEffect } from "react";
import { fetchHomepage } from "../../hooks/fetchHomepage";
import { Button, LikeButton, Tool } from "../../components";
import { Rate } from "../Forms/Rate";
import { Link } from "react-router-dom";

export const MovieCard = ({ movies, rank, type, isAboutCard }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [showRate, setShowRate] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const data = await fetchHomepage(
          `https://api.themoviedb.org/3/${type === 'movie' ? "movie" : "tv"}/${movies.movieId}`
        );
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };

    if (movies.movieId) {
      fetchMovie();
    }
  }, [movies.movieId]);

  // Calculate average rating
  const calculateAverageRating = () => {
    const {
      cinematography = 0,
      characters = 0,
      climax = 0,
      ending = 0,
      overall = 0,
      starting = 0,
      visual = 0,
      plot = 0,
      soundtrack = 0,
      story = 0,
      characterDevelopment = 0,
      other = 0,
    } = movies;

    return (
      (cinematography +
        characters +
        climax +
        ending +
        overall +
        starting +
        visual +
        plot +
        soundtrack +
        story +
        characterDevelopment +
        other) /
      12
    ).toFixed(1);
  };

  const average = calculateAverageRating();

  // Toggle function for expanding/collapsing
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleRateClick = () => {
    setShowRate(true);
  };

  const handleCloseRate = () => {
    setShowRate(false);
  };

  return (
    <>
      {showRate && (
        <Rate m={movie} onClose={handleCloseRate} isAboutCard={isAboutCard} />
      )}
      {loading ? (
        <div className="w-full flex">
          <div
            className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden bg-gray-300 animate-pulse"
            title="Loading image"
          ></div>
          <div className="text-white w-full bg-transparent rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="mb-8">
              <div className="bg-gray-300 h-6 w-3/4 mb-2 animate-pulse"></div>
              <div className="bg-gray-300 h-4 w-full animate-pulse mb-1"></div>
              <div className="bg-gray-300 h-4 w-5/6 animate-pulse"></div>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-4 animate-pulse"></div>
              <div className="text-sm">
                <div className="bg-gray-300 h-4 w-20 animate-pulse mb-1"></div>
                <div className="bg-gray-300 h-4 w-16 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full lg:flex">
          <Link
            to={`/${movie.id}${type === "tv" ? "/tv/" : "/"}detail`}
            className="h-48 xl:block hidden lg:h-auto lg:w-64 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`,
            }}
            title={movie.title}
          ></Link>
          <Link
            to={`/${movie.id}${type === "tv" ? "/tv/" : "/"}detail`}
            className="w-full xl:hidden justify-end mb-[-100px] flex"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt=""
              className="h-80 z-[1]"
            />
          </Link>

          <div className="text-white  bg-transparent rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="mb-8">
              <p className="text-sm text-grey-dark flex items-center">
                {movie.tagline}
              </p>
              <div className="text-white relative w-full flex justify-between font-bold text-xl mb-2">
                {type === "movie" ? movie.title : movie.name}
                <div className="flex absolute right-0 z-[5] items-center space-x-2">
                  <div className="relative">
                    {/* Butterfly Wings */}
                    <div className="absolute top-0 left-0 bg-[#000] h-8 w-8 rounded-full transform -translate-x-2 -translate-y-2"></div>
                    <div className="absolute top-0 right-0 bg-[#000] h-8 w-8 rounded-full transform translate-x-2 -translate-y-2"></div>
                    <div className="absolute bottom-0 left-0 bg-[#000] h-8 w-8 rounded-full transform -translate-x-2 translate-y-2"></div>
                    <div className="absolute bottom-0 right-0 bg-[#000] h-8 w-8 rounded-full transform translate-x-2 translate-y-2"></div>
                    {/* Butterfly Body */}
                    <div className="relative bg-[#e0324b] text-black rounded-full h-16 w-16 flex items-center justify-center">
                      {rank + 1}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-grey-darker min-h-40  text-base">
                {movie.overview}

                {/* Conditionally render tools based on expanded state */}
                {expanded && (
                  <div className="w-full flex flex-wrap gap-1 m-4">
                    <Tool
                      but={`Cinematography : ${movies.cinematography}`}
                      text="The visual appeal and camera work of the movie/TV series."
                    />
                    <Tool
                      but={`Story : ${movies.story}`}
                      text="How engaging and well-written was the story?"
                    />
                    <Tool
                      but={`Character Development : ${movies.characterDevelopment}`}
                      text="the character arc?"
                    />
                    <Tool
                      but={`Plot : ${movies.plot}`}
                      text="Was the sequence of events exciting and coherent?"
                    />
                    <Tool
                      but={`Ending : ${movies.ending}`}
                      text="How satisfying was the ending?"
                    />
                    <Tool
                      but={`Starting : ${movies.starting}`}
                      text="Did the beginning capture your interest?"
                    />
                    <Tool
                      but={`Climax : ${movies.climax}`}
                      text="Rate the most intense moment of the story."
                    />
                    <Tool
                      but={`Characters : ${movies.characters}`}
                      text="Were the characters well-developed and believable?"
                    />
                    <Tool
                      but={`Soundtrack : ${movies.soundtrack}`}
                      text="How well did the music enhance the scenes?"
                    />
                    <Tool
                      but={`Visual Effects : ${movies.visual}`}
                      text="How realistic and well-integrated were the visual effects?"
                    />
                    <Tool
                      but={`Overall Rating : ${movies.overall}`}
                      text="Your overall score for the movie/TV series"
                    />
                    <Tool
                      but={`Other People's Rating : ${movies.other}`}
                      text="This is others' rating."
                    />
                  </div>
                )}
              </p>
              {/* Toggle expand button */}
              <button
                onClick={toggleExpand}
                style={{
                  boxShadow:
                    "inset 0 2px 4px 0 rgba(2, 6, 23, 0.3), inset 0 -2px 4px 0 rgba(203, 213, 225)",
                }}
                className="inline-flex cursor-pointer items-center gap-1 rounded border border-slate-300 bg-transparent px-4 py-2 font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:opacity-100"
              >
                {expanded ? "Less info" : "More info"}
              </button>
            </div>
            <div className="flex items-center">
              <div className="text-sm justify-between items-center w-full flex flex-wrap gap-8">
                <div className="flex gap-8">
                  <button onClick={handleRateClick} >
                    <LikeButton text="Rerate Now" />
                  </button>
                </div>
                <Button text={average} rate={true} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
