import React from "react";
import "./header.style.scss";
import { Link } from "react-router-dom";
import mainLogo from "../../assets/trivia-quiz.png";
import { auth } from "../../firebase/firebase.utils";

const getFirstName = (userName) => {
  if (!userName) {
    return;
  }

  const firstName = userName.split(" ")[0];
  return firstName && firstName.toUpperCase();
};
const HeaderComponent = ({ userName, isUserSignedIn, setCurrentUser }) => {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src={mainLogo} alt="fireSpot" width="60" height="60" />
      </Link>

      <div className="title">
        WELCOME {isUserSignedIn ? getFirstName(userName) : ""}
      </div>
      <div className="options-container">
        <Link className="option" to="/leaderboard">
          SCORE BOARD
        </Link>

        {userName ? (
          <div
            className="option"
            onClick={() => {
              auth.signOut();
              setCurrentUser({});
            }}
          >
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        )}
      </div>
    </header>
  );
};

export default HeaderComponent;
