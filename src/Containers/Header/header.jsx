import HeaderComponent from "../../Components/Header/header";

import React from "react";

const Header = () => {
  return (
    <header className="header">
      <HeaderComponent isUserSignedIn={true} userName={"Faiza"} />
    </header>
  );
};

export default Header;
