import HeaderComponent from "../../components/header/header";

import React from "react";

const Header = () => {
  return (
    <div className="header">
      <HeaderComponent isUserSignedIn={true} userName={"Faiza"} />
    </div>
  );
};

export default Header;
