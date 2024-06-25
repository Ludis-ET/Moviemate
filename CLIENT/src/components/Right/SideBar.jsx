import { useState } from "react";

export const SideBarRight = () => {
  const [showMockup, setShowMockup] = useState(false);
  const [showSignin, setShowSignin] = useState(true);

  const toggleView = () => {
    setShowSignin(!showSignin);
  };

  const handleClick = () => {
    setShowMockup(!showMockup);
  };
  return (
    <>
      <aside className="fixed right-0 top-0 w-96 h-screen p-4 bg-transparent">
        <header className="text-center">
          {/* <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="w-8 h-8 rounded-full"
                src="/docs/images/people/profile-picture-1.jpg"
                alt="Neil image"
              />
            </div>
            <div className="flex-1 min-w-0 ms-4">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Neil Sims
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                email@windster.com
              </p>
            </div>
          </div> */}
          <div className="">
            <button
              className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
              onClick={handleClick}
            >
              Signin
            </button>
            <div
              className={`mockup-phone top-24 left-1 absolute border-primary transition-transform duration-500 ${
                showMockup ? "transform scale-100" : "transform scale-0"
              }`}
            >
              <div className="camera"></div>
              <div className="display">
                <div
                  className="artboard artboard-demo phone-1 p-4"
                  style={{ background: "linear-gradient(#e0324b, #24282a)" }}
                >
                  {showSignin ? (
                    <div className="signin">
                      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
                      <form>
                        <input
                          type="email"
                          placeholder="Email"
                          className="input input-bordered w-full mb-4"
                        />
                        <input
                          type="password"
                          placeholder="Password"
                          className="input input-bordered w-full mb-4"
                        />
                        <button className="btn btn-primary w-full">
                          Sign In
                        </button>
                      </form>
                      <p className="mt-4">
                        Don't have an account?{" "}
                        <button className="text-blue-500" onClick={toggleView}>
                          Sign Up
                        </button>
                      </p>
                    </div>
                  ) : (
                    <div className="signup">
                      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                      <form>
                        <input
                          type="text"
                          placeholder="Username"
                          className="input input-bordered w-full mb-4"
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          className="input input-bordered w-full mb-4"
                        />
                        <input
                          type="password"
                          placeholder="Password"
                          className="input input-bordered w-full mb-4"
                        />
                        <button className="btn btn-primary w-full">
                          Sign Up
                        </button>
                      </form>
                      <p className="mt-4">
                        Already have an account?{" "}
                        <button className="text-blue-500" onClick={toggleView}>
                          Sign In
                        </button>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="ml-[-40px]">
          <div className="w-full mt-4 bg-transparent rounded-lg sm:p-8">
            <div className="flex items-center justify-between">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Latest Rated
              </h5>
              <a
                href="#"
                className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                View all
              </a>
            </div>
            <div className="flow-root">
              <ul
                role="list"
                className="divide-y divide-gray-200 dark:divide-gray-700"
              >
                <li className="p-2">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="w-16 h-16 rounded"
                        src="https://imgs.search.brave.com/LGtrCe19S-FNMbp5cURboFwZSh-y4z0XSPO4MjfvA3Q/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zMy5h/bWF6b25hd3MuY29t/L25pZ2h0amFycHJv/ZC9jb250ZW50L3Vw/bG9hZHMvc2l0ZXMv/MjM4LzIwMjMvMDgv/MjMxNTE0MTAvcFdI/ZjRraE9sb05WZkN4/c2NzWEZqM2pqNmdQ/LmpwZw"
                        alt="Neil image"
                      />
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        The Wolf of Wall Street
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        Movie
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-1 text-base font-semibold text-gray-900 dark:text-white">
                      <i className="fa fa-star"></i> 10
                    </div>
                  </div>
                </li>
                <li className="p-2">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="w-16 h-16 rounded"
                        src="https://imgs.search.brave.com/LGtrCe19S-FNMbp5cURboFwZSh-y4z0XSPO4MjfvA3Q/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zMy5h/bWF6b25hd3MuY29t/L25pZ2h0amFycHJv/ZC9jb250ZW50L3Vw/bG9hZHMvc2l0ZXMv/MjM4LzIwMjMvMDgv/MjMxNTE0MTAvcFdI/ZjRraE9sb05WZkN4/c2NzWEZqM2pqNmdQ/LmpwZw"
                        alt="Neil image"
                      />
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        The Wolf of Wall Street
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        Movie
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-1 text-base font-semibold text-gray-900 dark:text-white">
                      <i className="fa fa-star"></i> 10
                    </div>
                  </div>
                </li>
                <li className="p-2">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="w-16 h-16 rounded"
                        src="https://imgs.search.brave.com/LGtrCe19S-FNMbp5cURboFwZSh-y4z0XSPO4MjfvA3Q/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zMy5h/bWF6b25hd3MuY29t/L25pZ2h0amFycHJv/ZC9jb250ZW50L3Vw/bG9hZHMvc2l0ZXMv/MjM4LzIwMjMvMDgv/MjMxNTE0MTAvcFdI/ZjRraE9sb05WZkN4/c2NzWEZqM2pqNmdQ/LmpwZw"
                        alt="Neil image"
                      />
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        The Wolf of Wall Street
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        Movie
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-1 text-base font-semibold text-gray-900 dark:text-white">
                      <i className="fa fa-star"></i> 10
                    </div>
                  </div>
                </li>
                {/* Repeat similar blocks for other items */}
              </ul>
            </div>
          </div>
          <div className="w-full max-w-md bg-transparent rounded-lg sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Favorite Genre
              </h5>
            </div>
            <div className="flow-root my-4 text-white">
              <p>Horror</p>
              <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                <div
                  className="bg-[#e0324b] text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                  style={{ width: "45%" }}
                >
                  45%
                </div>
              </div>
            </div>
            <div className="flow-root my-4 text-white">
              <p>Horror</p>
              <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                <div
                  className="bg-[#e0324b] text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                  style={{ width: "45%" }}
                >
                  45%
                </div>
              </div>
            </div>
            <div className="flow-root my-4 text-white">
              <p>Horror</p>
              <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                <div
                  className="bg-[#e0324b] text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                  style={{ width: "45%" }}
                >
                  45%
                </div>
              </div>
            </div>
            <div className="flow-root my-4 text-white">
              <p>Horror</p>
              <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                <div
                  className="bg-[#e0324b] text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                  style={{ width: "45%" }}
                >
                  45%
                </div>
              </div>
            </div>
          </div>
        </main>
      </aside>
    </>
  );
};
