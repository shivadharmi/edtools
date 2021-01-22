import React from "react";
import Form from "../../components/Form/Form";
import Layout from "../../components/Layout/Layout";
import { setAuthData } from "../../utils/auth";
import { firebaseAuth } from "../../utils/firebase";

const onClickHandler = (
  formData: {
    email: string;
    password: string;
    confirmPassword?: string;
  },
  errorHandler: (message: string) => void,
  setIsLogging: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  firebaseAuth
    .signInWithEmailAndPassword(formData.email, formData.password)
    .then((user) => {
      if (user) {
        if (user.user?.emailVerified) {
          setAuthData(user.user.uid);
          window.location.pathname = "/list";
        } else {
          errorHandler("Please verify email verification link.");
        }
        setIsLogging(false);
      }
    })
    .catch((err) => {
      setIsLogging(false);
      errorHandler(err.message);
    });
};

const LoginPage = () => {
  return (
    <Layout>
      <Form onClick={onClickHandler} isSignUp={false} />
    </Layout>
  );
};

export default LoginPage;
