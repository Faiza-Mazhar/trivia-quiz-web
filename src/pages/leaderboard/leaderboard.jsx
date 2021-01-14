import React, { useState, useEffect } from "react";
import "./leaderboard.style.scss";
import ScoresLayout from "../../Containers/ScoresLayout/scores-layout";
import InformationLabel from "../../Components/InformationLabel/information-label";
import { Link } from "react-router-dom";

import { auth, getUserScores } from "../../firebase/firebase.utils.js";

const LeaderBoard = () => {
  const [userScores, setScore] = useState(null);

  useEffect(() => {
    !userScores &&
      auth.onAuthStateChanged((user) => {
        user &&
          getUserScores(user.uid).then((scores) => {
            setScore(scores);
          });
      });
  }, [userScores]);

  return (
    <div className="leaderboard">
      {userScores ? (
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
