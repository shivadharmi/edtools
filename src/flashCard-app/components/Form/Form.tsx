import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Form.css";

interface Props {
  isSignUp: boolean;
  onClick: (
    formData: {
      name?: string;
      email: string;
      password: string;
      confirmPassword?: string;
    },
    errorHandler: (message: string) => void,
  ) => void;
}

const Form: React.FC<Props> = ({ onClick, isSignUp }) => {
  const initialFormData = isSignUp
    ? {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      }
    : {
        email: "",
        password: "",
      };
  const [formData, setFormData] = useState(initialFormData);

  const [err, setError] = useState<null | string>(null);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const errorHandler = (message: string) => {
    setError(message);
    setFormData((prev) => {
      if (prev.confirmPassword) {
        return {
          ...prev,
          name: "",
          password: "",
          confirmPassword: "",
        };
      }
      return {
        ...prev,
        password: "",
      };
    });
    const tId = setTimeout(() => {
      clearTimeout(tId);
      setError(null);
    }, 2000);
  };

  return (
    <div className="form_container">
      <form className="form" autoComplete="off">
        <h2 className="heading">EDTOOLS</h2>
        {err !== null ? <p className="error">{err}</p> : null}
        {isSignUp ? (
          <div className="form_element">
            <label>NAME</label>
            <input
              type="text"
              onChange={onChangeHandler}
              placeholder="ENTER FULL NAME"
              name="name"
              value={formData.name}
            />
          </div>
        ) : null}
        <div className="form_element">
          <label>EMAIL ADDRESS</label>
          <input
            type="email"
            onChange={onChangeHandler}
            placeholder="ENTER EMAIL"
            name="email"
            value={formData.email}
          />
        </div>
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
        {isSignUp ? (
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
        ) : null}
        <div className="signup_info">
          <span>
            {isSignUp ? "Already have an account?" : "New to edtools ?"}{" "}
            {isSignUp ? (
              <Link to={"/login"}>LOGIN</Link>
            ) : (
              <Link to="/signup">SIGN UP</Link>
            )}
          </span>
        </div>
        <button
          className="form_button"
          onClick={async (e) => {
            e.preventDefault();
            if (isSignUp) {
              if (formData.password !== formData.confirmPassword) {
                setError("Password did not match");
                return;
              }
            }
            onClick(formData, errorHandler);
          }}
        >
          {isSignUp ? "Sign Up" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Form;
