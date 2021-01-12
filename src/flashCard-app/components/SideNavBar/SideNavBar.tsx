import React from "react";
import "./SideNavBar.css";
interface Props {
  onClick: () => void;
}

const SideNavBar: React.FC<Props> = ({ onClick }) => {
  return (
    <div className="sideNavBar">
      <div style={{ margin: "2px", cursor: "pointer" }} onClick={onClick}>
        <img
          style={{ width: "22 px", height: "18px", padding: "3px" }}
          src={"/images/menu.svg"}
          alt="Hamberger menu"
        />
      </div>
    </div>
  );
};

export default SideNavBar;
