import React from "react";
import usaFlag from "../Img/usaFlag.png";

function Header() {
  return (
    <div className="header">
      <h1>
        Country Census <span className="header-subtitle">(America)</span>
      </h1>
      <img src={usaFlag} className="header-img" alt="img" />
    </div>
  );
}

export default Header;
