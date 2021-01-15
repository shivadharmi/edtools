import React from "react";
import { Link } from "react-router-dom";
import "./SideDrawer.css";
import { isAuthenticated } from "../../utils/auth";
import Logout from "../Form/Logout";
interface Props {
  onClick: () => void;
}

const SideDrawer: React.FC<Props> = ({ onClick }) => {
  return (
    <nav id="sideDrawer_main" className="sideDrawer_main">
      <div style={{ margin: "2px" }}>
        <img
          onClick={onClick}
          style={{
            width: "22px",
            height: "18px",
            padding: "3px",
            cursor: "pointer",
          }}
          src={"/images/close.svg"}
          alt="Hamberger menu"
        />
      </div>
      <ul className="nav_items">
        <li className="nav_item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav_item">
          <Link to="/excalidraw">Excalidraw FlashCard</Link>
        </li>
        <li className="nav_item">
          {isAuthenticated() ? <Logout /> : <Link to="/login">Login</Link>}
        </li>
      </ul>
    </nav>
  );
};

export default SideDrawer;
