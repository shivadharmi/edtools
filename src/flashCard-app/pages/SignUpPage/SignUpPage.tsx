import React from "react";
import Form from "../../components/Form/Form";
import Layout from "../../components/Layout/Layout";
import "./SignUpPage.css";
import { firebaseAuth } from "../../utils/firebase";
import { setAuthData } from "../../utils/auth";

const onClickHandler = (
  formData: {
    email: string;
    password: string;
    confirmPassword?: string;
  },
  errorHandler: (message: string) => void,
) => {
  firebaseAuth
    .createUserWithEmailAndPassword(formData.email, formData.password)
    .then((user) => {
      const userId = firebaseAuth.currentUser?.uid!;
      setAuthData(userId);
      window.location.pathname = "/";
    })
    .catch((err) => {
      errorHandler(err.message);
    });
};
const SignUpPage = () => {
  return (
    <Layout>
      <Form onClick={onClickHandler} isSignUp={true} />
    </Layout>
  );
};

export default SignUpPage;
