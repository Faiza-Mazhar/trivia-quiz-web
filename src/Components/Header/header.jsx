import React from "react";
import "./header.style.scss";
import mainLogo from "../../assets/trivia-quiz.png";
const HeaderComponent = ({ userName, isUserSignedIn }) => {
  return (
    <div className="header">
      <div className="logo">
        <img src={mainLogo} alt="fireSpot" width="60" height="60" />
      </div>
      <div className="title">Welcome {isUserSignedIn ? userName : ""}</div>
      <div className="options-container">
        <div className="option"> Leader Board</div>
        <div className="option">Sign In</div>
      </div>
    </div>
  );
};

export default HeaderComponent;
