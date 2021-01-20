import React from "react";
import ReactDOM from "react-dom";
import FlashCardIndex from "./flashCard-app";

import "./excalidraw-app/pwa";
import "./excalidraw-app/sentry";

window.__EXCALIDRAW_SHA__ = process.env.REACT_APP_GIT_SHA;

ReactDOM.render(<FlashCardIndex />, document.getElementById("root"));
