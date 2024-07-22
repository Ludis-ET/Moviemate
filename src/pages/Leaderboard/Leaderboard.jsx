import { LeadMovie } from "./LeadMovie";
import { LeadTv } from "./LeadTv";
import { Footer } from "../../components";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import L from '../../assets/login.svg'

export const Leaderboard = () => {
  const { currentUser } = useAuth()
  const [movie, setSwitch] = useState(true);
  if (!currentUser) {
    return (
      <div>
        <div className="text-3xl text-white text-center">Login First</div>
        <div className="flex justify-center">
          <img src={L} className="w-1/2 text-center self-center" alt="" />
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="flex w-full justify-center items-center gap-2">
        <button
          onClick={() => setSwitch(true)}
          className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] text-[#333] hover:text-[#06B6D4] h-9 rounded-md px-3"
        >
          <i className="fa fa-film lucide lucide-rocket text-cyan-500 dark:text-cyan-400"></i>
          Movies
        </button>
        <button
          onClick={() => setSwitch(false)}
          className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] text-[#333] hover:text-[#06B6D4] h-9 rounded-md px-3"
        >
          <i className="fa fa-video lucide lucide-rocket text-cyan-500 dark:text-cyan-400"></i>
          Tv Series
        </button>
      </div>

      <div>{movie ? <LeadMovie /> : <LeadTv />}</div>
      <Footer />
    </>
  );
};
