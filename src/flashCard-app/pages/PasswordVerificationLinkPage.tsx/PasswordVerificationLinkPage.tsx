import React, { useEffect, useState } from "react";
import qs from "query-string";
import CreateNewPassword from "../../components/Form/CreateNewPassword";
import Layout from "../../components/Layout/Layout";
import { firebaseAuth } from "../../utils/firebase";

function PasswordVerificationLinkPage() {
  const [message, setMessage] = useState<string | null>(null);
  const [value, setValue] = useState<null | { email: string; code: string }>(
    null,
  );
  useEffect(() => {
    const parsed = qs.parse(window.location.search);
    if (parsed) {
      firebaseAuth
        .verifyPasswordResetCode(parsed.oobCode as string)
        .then((value) => {
          if (value) {
            setValue({ email: value, code: parsed?.oobCode as string });
          }
        })
        .catch((err) => {
          setMessage(err.message);
        });
    }
  }, []);

  const onClick = (
    password: string,
    setIsVerifying: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    firebaseAuth
      .confirmPasswordReset(value?.code!, password)
      .then(() => {
        setIsVerifying(false);
        setMessage("Password Reset Completed");
      })
      .catch((err) => {
        setIsVerifying(false);
        setMessage(err.message);
      });
  };
  return (
    <Layout>
      {
        <CreateNewPassword
          onClick={onClick}
          message={message}
          email={value?.email}
        />
      }
    </Layout>
  );
}

export default PasswordVerificationLinkPage;
