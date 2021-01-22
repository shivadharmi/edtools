import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Form.css";

interface Props {
  onClick: (
    password: string,
    setIsVerifying: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
  message: string | null;
  email?: string;
}

const CreateNewPassword: React.FC<Props> = ({ onClick, message, email }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const initialFormData = {
    password: "",
    confirmPassword: "",
    email: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const style = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    color: "#000",
  };

  return (
    <div className="form_container">
      {message ? (
        <div style={{ position: "absolute", ...style }}>
          <span>{message}</span> <Link to="/">Home</Link>
        </div>
      ) : (
        <form className="form" autoComplete="off">
          <h2 className="heading">EDTOOLS</h2>
          <p>Create Password for email {email}</p>
          <div className="form_element">
            <label>PASSWORD</label>
            <input
              type="password"
              onChange={onChangeHandler}
              placeholder="ENTER PASSWORD"
              name="password"
              value={formData.password}
            />
          </div>
          <div className="form_element">
            <label>CONFIRM PASSWORD</label>
            <input
              type="password"
              onChange={onChangeHandler}
              placeholder="CONFIRM PASSWORD"
              name="confirmPassword"
              value={formData.confirmPassword}
            />
          </div>
          <button
            className="form_button"
            onClick={async (e) => {
              e.preventDefault();
              setIsVerifying(true);
              if (
                formData.password.trim() === formData.confirmPassword.trim()
              ) {
                onClick(formData.password, setIsVerifying);
              } else {
                setIsVerifying(false);
              }
            }}
          >
            RESET PASSWORD
            {isVerifying ? (
              <img
                height="15px"
                width="20px"
                src="/images/25.svg"
                alt="spinner"
              />
            ) : null}
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateNewPassword;
