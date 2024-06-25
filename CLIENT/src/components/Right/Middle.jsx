export const Middle = () => {
  return (
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
  );
};
