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
import CreateExcaliFlashCardPage from "../flashCard-app/pages/CreateExcaliFlashCardPage/CreateExcaliFlashCardPage";
import CreateBasicFlashCardPage from "./pages/CreateBasicFlashCardPage/CreateBasicFlashCardPage";
import FlashCardsListPage from "./pages/FlashCardsListPage.tsx/FlashCardsListPage";
import FlashCardPreviewPage from "./pages/FlashCardPreviewPage/FlashCardPreviewPage";
import ResetPasswordPage from "./pages/ResetPasswordPage.tsx/ResetPasswordPage";
import PasswordVerificationLinkPage from "./pages/PasswordVerificationLinkPage.tsx/PasswordVerificationLinkPage";

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
            <CreateExcaliFlashCardPage />
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
        <Route path="/create-excali-fc/" exact>
          {isAuthenticated() ? (
            <CreateExcaliFlashCardPage />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route path="/reset-password" exact>
          <ResetPasswordPage />
        </Route>
        <Route path="/verify/reset-password/link/" exact>
          <PasswordVerificationLinkPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default FlashCardIndex;
