import React, { useState, useEffect } from "react";
import "./leaderboard.style.scss";
import ScoresLayout from "../../Containers/ScoresLayout/scores-layout";
import InformationLabel from "../../Components/InformationLabel/information-label";
import { Link } from "react-router-dom";

import { getUserScores } from "../../firebase/firebase.utils.js";

const LeaderBoard = () => {
  const [userScores, setScore] = useState(null);

  useEffect(() => {
    getUserScores().then((scores) => {
      setScore(scores);
    });
  }, [userScores]);

  return (
    <div className="leaderboard">
      {Array.isArray(userScores) ? (
        <ScoresLayout scores={userScores} />
      ) : (
        <div>
          <InformationLabel
            information={"PLEASE SIGN IN TO SEE YOUR SCOREBOARD"}
          />
          <div className="link">
            <Link className="option" to="/signin">
              SIGN IN
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderBoard;
