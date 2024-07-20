import { LeadMovie } from "./LeadMovie";
import { LeadTv } from "./LeadTv";
import { Footer } from "../../components";

export const Leaderboard = () => {
  return (
    <>
      <div className="flex w-full justify-center items-center gap-2">
        <button className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] text-[#333] hover:text-[#06B6D4] h-9 rounded-md px-3">
          <i className="fa fa-film lucide lucide-rocket text-cyan-500 dark:text-cyan-400"></i>
          Movies
        </button>
        <button className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] text-[#333] hover:text-[#06B6D4] h-9 rounded-md px-3">
          <i className="fa fa-video lucide lucide-rocket text-cyan-500 dark:text-cyan-400"></i>
          Tv Series
        </button>
      </div>

      <div>
        <LeadMovie />
      </div>
      <Footer />
    </>
  );
};
