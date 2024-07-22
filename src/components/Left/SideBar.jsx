import { useState } from "react";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

export const SideBarLeft = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        data-drawer-target="cta-button-sidebar"
        data-drawer-toggle="cta-button-sidebar"
        aria-controls="cta-button-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg xl:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="cta-button-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }  bg-[#e0324b]  xl:bg-transparent xl:translate-x-0 transition-transform duration-300 ease-in-out`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 text-gray-500 dark:text-gray-400"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M6 4a1 1 0 011.707-.707l5 5a1 1 0 010 1.414l-5 5A1 1 0 016 14V4z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <Link to="/" className="flex items-center ps-2.5 mb-5">
            <img src={Logo} className="h-6 me-3 sm:h-7" alt="Flowbite Logo" />
            <span
              className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white"
              style={{ fontFamily: "Lobster, cursive" }}
            >
              Moviemate
            </span>
          </Link>

          <ul className="space-y-2 mt-12 font-medium">
            <li>
              <Link
                to="/"
                onClick={toggleSidebar}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fa fa-home"></i>
                <span className="ms-3">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/about-to"
                onClick={toggleSidebar}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fa-solid fa-umbrella-beach"></i>
                <span className="ms-3">About to</span>
              </Link>
            </li>
            <li>
              <Link
                to="/movies"
                onClick={toggleSidebar}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fa-solid fa-film"></i>
                <span className="ms-3">Movies</span>
              </Link>
            </li>
            <li>
              <Link
                to="/tvs"
                onClick={toggleSidebar}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fa-solid fa-tv"></i>
                <span className="ms-3">Tv Series</span>
              </Link>
            </li>
            <li>
              <Link
                to="/leaderboard"
                onClick={toggleSidebar}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fa-brands fa-usps"></i>
                <span className="ms-3">LeaderBoard</span>
              </Link>
            </li>
          </ul>
          <div
            id="dropdown-cta"
            className="p-4 mt-20 rounded-lg bg-[#e03248]"
            role="alert"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="bg-orange-100 text-[#24282a] text-sm font-semibold me-2 px-2.5 py-0.5 rounded">
                V 1.0
              </span>
            </div>
            <p className="mb-3 text-sm text-white dark:text-white-400">
              This is v1.0. There will be updates, especially using AI models,
              as the project evolves. Stay tuned for future enhancements and
              improvements!
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
