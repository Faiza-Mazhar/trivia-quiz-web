import React from "react";
import "./header.style.scss";
import { Link } from "react-router-dom";
import mainLogo from "../../assets/trivia-quiz.png";
const HeaderComponent = ({ userName, isUserSignedIn }) => {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src={mainLogo} alt="fireSpot" width="60" height="60" />
      </Link>

      <div className="title">Welcome {isUserSignedIn ? userName : ""}</div>
      <div className="options-container">
        <Link className="option" to="/leaderboard">
          Leader Board
        </Link>

        <Link className="option" to="/signin">
          Sign In
        </Link>
      </div>
    </header>
  );
};

export default HeaderComponent;
