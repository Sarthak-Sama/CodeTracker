//Leaderboard Page

import React, { useContext, useEffect, useState } from "react";
import Leaderboard from "../components/Leaderboard";
import TopCards from "../components/TopCards";
import axios from "../utils/axios";
import { PropagateLoader } from "react-spinners";

function Homepage({ formatTime }) {
  const [leaderboardData, setLeaderboardData] = useState(null);
  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get("/api/leaderboard");
      setLeaderboardData(response.data.data);
    } catch (error) {
      console.log("Error fetching the leaderboard: ", error);
    }
  };
  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <>
      {leaderboardData && leaderboardData.length > 0 ? (
        <div>
          <div className="xl:scale-100 scale-80">
            <TopCards
              rank1={leaderboardData[0] || null}
              rank2={leaderboardData[1] || null}
              rank3={leaderboardData[2] || null}
              formatTime={formatTime}
            />
          </div>

          <Leaderboard dataArray={leaderboardData} formatTime={formatTime} />
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <PropagateLoader color="#212529" className="scale-[0.75]" />
        </div>
      )}
    </>
  );
}

export default Homepage;
