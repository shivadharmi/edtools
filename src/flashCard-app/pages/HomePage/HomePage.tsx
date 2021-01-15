import React from "react";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import "./HomePage.css";
import Footer from "../../components/Footer/Footer";
import SideDrawer from "../../components/SideDrawer/SideDrawer";

const onClick = () => {
  const ele = document.getElementById("sideDrawer_main");
  if (ele?.classList.contains("sideDrawer_main-visible")) {
    ele.classList.remove("sideDrawer_main-visible");
  } else {
    ele!.classList.add("sideDrawer_main-visible");
  }
};

const HomePage = () => {
  return (
    <div className="homepage">
      <TopNavbar onClick={onClick} />
      <main className="main_content">
        <div className="hero_section">
          <div>
            <h1>Educational tools built with Reactjs and Typescript.</h1>
          </div>
          <img src={"/images/draw.svg"} alt="Draw svg" />
        </div>
      </main>
      <Footer />
      <div className="hideSideDrawer">
        <SideDrawer onClick={onClick} />
      </div>
    </div>
  );
};

export default HomePage;
