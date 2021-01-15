import React from "react";
import TopNavbar from "../TopNavbar/TopNavbar";
import SideDrawer from "../SideDrawer/SideDrawer";
import Footer from "../Footer/Footer";
import "./Layout.css";

const onClick = () => {
  const ele = document.getElementById("sideDrawer_main");
  if (ele?.classList.contains("sideDrawer_main-visible")) {
    ele.classList.remove("sideDrawer_main-visible");
  } else {
    ele!.classList.add("sideDrawer_main-visible");
  }
};

interface Props {}

const Layout: React.FC<Props> = (props) => {
  return (
    <div className="main_container">
      <TopNavbar onClick={onClick} />
      <SideDrawer onClick={onClick} />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
