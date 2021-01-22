import React from "react";
import { Link } from "react-router-dom";
import { removeAuthData } from "../../utils/auth";
import { firebaseAuth } from "../../utils/firebase";

const Logout = () => {
  const logoutHandler = async () => {
    firebaseAuth
      .signOut()
      .then(() => {
        removeAuthData();
        window.location.pathname = "/";
      })
      .catch(() => {
        removeAuthData();
        window.location.pathname = "/";
      });
  };
  return (
    <Link to="#" onClick={logoutHandler}>
      LOGOUT
    </Link>
  );
};

export default Logout;
