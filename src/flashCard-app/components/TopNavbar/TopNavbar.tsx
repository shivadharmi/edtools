import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";
import Logout from "../Form/Logout";

import "./TopNavbar.css";

interface Props {
  onClick: () => void;
}

const TopNavbar: React.FC<Props> = ({ onClick }) => {
  return (
    <nav className="navbar">
      <div className="navbar_main">
        <div className="logo">
          <img src={"/images/logo.png"} alt="Logo" />
        </div>
        <div className="spacer"></div>
        <ul className="navbar_items">
          <li className="nav_item">
            <Link to="/">HOME</Link>
          </li>
          {isAuthenticated() ? (
            <>
              <li className="nav_item">
                <Link to="/excalidraw">EXCALIDRAW FC</Link>
              </li>
              <li className="nav_item">
                <Link to="/list">FC LIST</Link>
              </li>
              <li className="nav_item">
                <Link to="/create-basic-fc">CREATE BASIC FC</Link>
              </li>
            </>
          ) : null}
          <li className="nav_item">
            {isAuthenticated() ? <Logout /> : <Link to="/login">Login</Link>}
          </li>
        </ul>
        <div
          className="ham_icon"
          style={{ margin: "0 8px", cursor: "pointer" }}
          onClick={onClick}
        >
          <img
            style={{ width: "25 px", height: "18px", padding: "3px" }}
            src={"/images/menu.svg"}
            alt="Hamberger menu"
          />
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
