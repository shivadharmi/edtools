import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import "./CreateExcaliFlashCardPage.css";
import "../../components/Form/Form.css";

const CreateExcaliFlashCardPage = () => {
  const initialFormData = {
    flashCardName: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const [err, setError] = useState<null | string>(null);

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = event.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <Layout>
      <div className="createEFCP">
        <div className="createEFCP_wrapper">
          <form className="form" autoComplete="off">
            <h2 className="heading">Create a New FlashCard Set</h2>
            {err !== null ? <p className="error">{err}</p> : null}
            <div className="form_element">
              <label>SET TITLE</label>
              <input
                type="text"
                onChange={onChangeHandler}
                placeholder="ENTER TITLE"
                name="flashCardName"
                value={formData.flashCardName}
              />
            </div>
            <div className="form_element">
              <label>SUBJECTS(OPTIONAL, COMMA SEPERATED)</label>
              <input
                type="password"
                onChange={onChangeHandler}
                placeholder="Enter SUBJECTS"
                name="password"
                value={""}
              />
            </div>
            <div className="form_element">
              <label>DESCRIPTION</label>
              <textarea
                rows={4}
                onChange={onChangeHandler}
                placeholder="ENTER DESCRIPTION"
                name="confirmPassword"
                value={""}
              />
            </div>
            <button
              className="form_button"
              onClick={async (e) => {
                e.preventDefault();
                // onClick(formData, errorHandler);
              }}
            >
              Create Flash Card
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateExcaliFlashCardPage;
