import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  onClick: (
    email: string,
    setIsSending: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
  message: string | null;
}

const SendVerificationLink: React.FC<Props> = ({ onClick, message }) => {
  // const [err, setError] = useState<null | string>(null);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(value);
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
          <p>{message}</p> <Link to="/">Home</Link>
        </div>
      ) : (
        <form className="form" autoComplete="off">
          <h2 className="heading">EDTOOLS</h2>
          {/* {err !== null ? <p className="error">{err}</p> : null} */}
          <div className="form_element">
            <label>SEND EMAIL VERIFICATION LINK</label>
            <input
              type="email"
              onChange={onChangeHandler}
              placeholder="ENTER EMAIL"
              name="email"
              value={formData}
            />
          </div>
          <button
            className="form_button"
            onClick={async (e) => {
              e.preventDefault();
              setIsSending(true);
              onClick(formData, setIsSending);
            }}
          >
            SEND
            {isSending ? (
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

export default SendVerificationLink;
