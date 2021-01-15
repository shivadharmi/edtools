import React from "react";
import { Link } from "react-router-dom";
import { firebaseAuth } from "../../utils/firebase";

const Logout = () => {
  const logoutHandler = () => {
    firebaseAuth.signOut();
    window.location.pathname = "/";
  };
  return (
    <Link to="#" onClick={logoutHandler}>
      Logout
    </Link>
  );
};

export default Logout;
