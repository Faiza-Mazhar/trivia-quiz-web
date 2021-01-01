import HeaderComponent from "../../Components/Header/header";

import React from "react";

const imageUrl = "../../assets/trivia-quiz.png";

const Header = () => {
  return (
    <div className="header">
      <HeaderComponent imageUrl={imageUrl} isUserSignedIn userName={"Name"} />
    </div>
  );
};

export default Header;
