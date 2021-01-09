import HeaderComponent from "../../Components/Header/header";

import React from "react";

const Header = () => {
  return (
    <header className="header-container">
      <HeaderComponent isUserSignedIn userName={"Faiza"} />
    </header>
  );
};

export default Header;
