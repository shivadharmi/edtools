import React from "react";
import ExcalidrawApp from "../../../excalidraw-app";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import SideDrawer from "../../components/SideDrawer/SideDrawer";

const onClick = () => {
  const ele = document.getElementById("sideDrawer_main");
  if (ele?.classList.contains("sideDrawer_main-visible")) {
    ele.classList.remove("sideDrawer_main-visible");
  } else {
    ele!.classList.add("sideDrawer_main-visible");
  }
};
const ExcalidrawPage = () => {
  return (
    <div style={{ display: "flex" }}>
      <ExcalidrawApp />
      <SideNavBar onClick={onClick} />
      <SideDrawer onClick={onClick} />
    </div>
  );
};

export default ExcalidrawPage;
