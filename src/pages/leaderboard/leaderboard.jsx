import React, { useState, useEffect } from "react";
import "./leaderboard.style.scss";
import ScoresLayout from "../../Containers/ScoresLayout/scores-layout";

import { auth, getUserScores } from "../../firebase/firebase.utils.js";

const LeaderBoard = () => {
  const [userScores, setScore] = useState(null);

  useEffect(() => {
    !userScores &&
      auth.onAuthStateChanged((user) => {
        getUserScores(user.uid).then((scores) => {
          setScore(scores);
        });
      });
  }, [userScores]);

  return (
    <div className="leaderboard">
      <ScoresLayout scores={userScores} />
    </div>
  );
};

export default LeaderBoard;
