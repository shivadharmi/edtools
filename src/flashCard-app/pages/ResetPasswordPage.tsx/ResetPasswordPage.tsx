import React, { useState } from "react";
import SendVerificationLink from "../../components/Form/SendVerificationLink";
import Layout from "../../components/Layout/Layout";
import { firebaseAuth } from "../../utils/firebase";

const ResetPasswordPage = () => {
  const [message, setMessage] = useState<string | null>(null);
  const onClick = (
    email: string,
    setIsSending: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    firebaseAuth
      .sendPasswordResetEmail(email)
      .then(() => {
        setMessage("Verification email has been sent sucessfully.");
        setIsSending(false);
      })
      .catch((err) => {
        setMessage(err.message);
        setIsSending(false);
      });
  };

  return (
    <Layout>
      <SendVerificationLink onClick={onClick} message={message} />
    </Layout>
  );
};

export default ResetPasswordPage;
