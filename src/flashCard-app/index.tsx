import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ExcalidrawApp from "../excalidraw-app";
import "./assets/styles/main.css";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import SideNavBar from "./components/SideNavBar/SideNavBar";
import HomePage from "./components/HomePage/HomePage";

const onClick = () => {
  const ele = document.getElementById("sideDrawer_main");
  if (ele?.classList.contains("sideDrawer_main-visible")) {
    ele.classList.remove("sideDrawer_main-visible");
  } else {
    ele!.classList.add("sideDrawer_main-visible");
  }
};

const FlashCard = () => {
  useEffect(() => {
    const svgUrl = window.localStorage.getItem("fc")!;
    const img = document.getElementById("fc") as HTMLImageElement;
    if (img) {
      img.src = svgUrl;
    }

  }, [])
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/excalidraw" exact>
          <div style={{ display: "flex" }}>
            <ExcalidrawApp />
            <SideNavBar onClick={onClick} />
            <SideDrawer onClick={onClick} />
          </div>
        </Route>
        <Route path="/preview" exact>
          <div>
            <img id="fc" src="" />
          </div>
        </Route>
      </Switch>
    </Router>
  );
};

export default FlashCard;
