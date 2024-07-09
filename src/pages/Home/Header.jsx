import { useNavigate } from "react-router-dom";
import { Top } from "../../components/Right/Top";

export const Header = () => {
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchTerm = formData.get("search");
    navigate(`/search?name=${searchTerm}`);
    event.target.reset();
  };

  return (
    <div className="bg-transparent flex justify-between items-center h-20 overflow-hidden">
      <form className="w-[75%]" onSubmit={handleSearch}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            name="search"
            className="block w-full p-4 ps-10 text-sm outline-none text-gray-900 border border-[#e0324b] rounded-lg bg-gray-50 bg-opacity-50 focus:ring-[#4c2a36] focus:border-[#4c2a36] dark:bg-gray-700 dark:bg-opacity-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Movie & Tv Series"
            autoComplete="off"
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-[#e0324b] hover:bg-[#4c2a36] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>
      <Top />
    </div>
  );
};
