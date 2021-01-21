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
import { isAuthenticated, getDataLS } from "./utils/auth";
import CreateExcaliFlashCardPage from "../flashCard-app/pages/CreateExcaliFlashCardPage/CreateExcaliFlashCardPage";
import CreateBasicFlashCardPage from "./pages/CreateBasicFlashCardPage/CreateBasicFlashCardPage";
import FlashCardsListPage from "./pages/FlashCardsListPage.tsx/FlashCardsListPage";
import FlashCardPreviewPage from "./pages/FlashCardPreviewPage/FlashCardPreviewPage";

const FlashCardIndex = () => {
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
        <Route path="/create-excali-fc" exact>
          {isAuthenticated() ? (
            <>{getDataLS("link") ? <CreateExcaliFlashCardPage /> : <>{alert("No excalidraw Link found")}<Redirect to="/" /></>}</>
          ) : (
              <Redirect to="/" />
            )}
        </Route>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/excalidraw" exact>
          <ExcalidrawPage />
        </Route>
        <Route path="/signup" exact>
          {isAuthenticated() ? <Redirect to="/" /> : <SignUpPage />}
        </Route>
        <Route path="/login" exact>
          {isAuthenticated() ? <Redirect to="/" /> : <LoginPage />}
        </Route>
        <Route path="/create-basic-fc" exact>
          {isAuthenticated() ? (
            <CreateBasicFlashCardPage />
          ) : (
              <Redirect to="/" />
            )}
        </Route>
        <Route path="/list" exact>
          {isAuthenticated() ? <FlashCardsListPage /> : <Redirect to="/" />}
        </Route>
        <Route path="/list/:setId/:fcId" exact>
          {isAuthenticated() ? <FlashCardPreviewPage /> : <Redirect to="/" />}
        </Route>
        <Route path="/create-excali-fc/:id" exact>
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

export default FlashCardIndex;
