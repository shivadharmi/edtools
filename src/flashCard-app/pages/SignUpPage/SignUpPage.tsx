import React from "react";
import Form from "../../components/Form/Form";
import Layout from "../../components/Layout/Layout";
import "./SignUpPage.css";
import { firebaseAuth, firebaseDb } from "../../utils/firebase";
import { setAuthData } from "../../utils/auth";

const onClickHandler = (
  formData: {
    name?: string;
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
      firebaseDb.ref(`users/${userId}`).set(
        {
          name: formData.name,
          email: formData.email,
        },
        (err) => {
          if (err) {
            errorHandler(err.message);
          } else {
            setAuthData(userId);
            window.location.pathname = "/";
          }
        },
      );
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
