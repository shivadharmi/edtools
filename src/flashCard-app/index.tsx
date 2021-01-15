import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./assets/styles/main.css";
import HomePage from "./pages/HomePage/HomePage";
import ExcalidrawPage from "./pages/ExcalidrawPage/ExcalidrawPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { isAuthenticated } from "./utils/auth";
import CreateExcaliFlashCardPage from "./pages/CreateExcaliFlashCardPage/CreateExcaliFlashCardPage";

const FlashCard = () => {
  useEffect(() => {
    const svgUrl = window.localStorage.getItem("link")!;
    const img = document.getElementById("fc") as HTMLImageElement;
    if (img) {
      img.src = svgUrl;
    }
  }, []);
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/excalidraw" exact>
          <ExcalidrawPage />
        </Route>
        <Route path="/preview" exact>
          <div>
            <img id="fc" src="" />
          </div>
        </Route>
        <Route path="/signup" exact>
          {isAuthenticated() ? <Redirect to="/" /> : <SignUpPage />}
        </Route>
        <Route path="/login" exact>
          {isAuthenticated() ? <Redirect to="/" /> : <LoginPage />}
        </Route>
        <Route path="/create-excali-fc" exact>
          {isAuthenticated()}
          {isAuthenticated() ? (
            <CreateExcaliFlashCardPage />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
      </Switch>
    </Router>
  );
};

export default FlashCard;
