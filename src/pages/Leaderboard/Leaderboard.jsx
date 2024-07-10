import { LeadMovie } from "./LeadMovie";
import { LeadTv } from "./LeadTv";
import { Footer } from "../../components";

export const Leaderboard = () => {
  return (
    <>
    <div className="flex">
      <LeadMovie />
      <LeadMovie />
    </div>
    <Footer />
    </>
  );
};
