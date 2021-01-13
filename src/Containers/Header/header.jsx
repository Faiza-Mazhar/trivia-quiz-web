import HeaderComponent from "../../Components/Header/header";

import React from "react";

const Header = ({ isUserSignedIn, userName }) => {
  return (
    <header className="header-container">
      <HeaderComponent isUserSignedIn userName={userName} />
    </header>
  );
};

export default Header;
