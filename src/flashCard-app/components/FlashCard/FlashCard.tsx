import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import "./FlashCard.css";
import "../../components/Form/Form.css";
import { useParams } from "react-router-dom";
import { firebaseDb } from "../../utils/firebase";
import { getDataLS } from "../../utils/auth";

const FlashCard = () => {
  const [tab, setTab] = useState(1);
  const initialFormData = {
    EXFCSetName: "",
    EXFCSetSubjects: "",
    EXFCSetDescription: "",
    EXFCFrontPage: "",
    EXFCBackPage: "",
    EXFCTitle: "",
    FCSetId: "",
    isImage: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  // const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (getDataLS("link")) {
      setFormData((prev) => {
        return {
          ...prev,
          EXFCBackPage: decodeURIComponent(getDataLS("link")!),
          isImage: true,
        };
      });
    }
  }, []);

  const [err, setError] = useState<null | string>(null);
  const [isCreating, setIsCreating] = useState(false);
  const onChangeHandler = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
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
    setFormData(prev =>{
      return{ ...initialFormData, EXFCBackPage: prev.EXFCBackPage }
    });
    const tId = setTimeout(() => {
      clearTimeout(tId);
      setError(null);
    }, 2000);
  };

  const saveDataToDb = async (data: typeof formData) => {
    const refToFCSets = firebaseDb.ref(`flashCards/${getDataLS("userId")}`);
    if (tab === 1) {
      const FCSetKey = refToFCSets.push().key;
      if (FCSetKey) {
        refToFCSets
          .child("sets")
          .child(FCSetKey)
          .set({
            EXFCSetName: data.EXFCSetName,
            EXFCSetSubjects: data.EXFCSetSubjects,
            EXFCSetDescription: data.EXFCSetDescription,
          })
          .then(async (res) => {
            if (res) {
              errorHandler(res.message);
            } else {
              (await refToFCSets.child("cards").child(FCSetKey).push())
                .set({
                  EXFCTitle: data.EXFCTitle,
                  EXFCFrontPage: data.EXFCFrontPage,
                  EXFCBackPage: data.EXFCBackPage,
                  isImage: data.isImage,
                })
                .then((res) => {
                  if (res) {
                    errorHandler(res.message);
                  } else {
                    window.location.assign("/list");
                    setIsCreating(false);
                  }
                });
            }
          });
      }
    } else {
      const ref = firebaseDb.ref(
        `flashCards/${getDataLS("userId")}/cards/${data.FCSetId}`,
      );
      const response = await (await ref.push()).set({
        EXFCTitle: data.EXFCTitle,
        EXFCFrontPage: data.EXFCFrontPage,
        EXFCBackPage: data.EXFCBackPage,
        isImage: data.isImage,
      });
      if (response) {
        errorHandler(response.message);
      } else {
        window.location.assign("/");
      }
    }
  };

  const [FCSetsData, setFCSetsData] = useState<
    | {
        FCkey: string;
        FCvalue: string;
      }[]
    | null
  >(null);

  useEffect(() => {
    firebaseDb
      .ref(`flashCards/${getDataLS("userId")}/sets`)
      .once("value")
      .then((snapshot) => {
        const modifiedData: {
          FCkey: string;
          FCvalue: string;
        }[] = [];
        const data = snapshot.val();
        if (data) {
          Object.keys(data).forEach((key, index) => {
            if (index === 0) {
              setFormData((prev) => {
                return {
                  ...prev,
                  FCSetId: key,
                };
              });
            }
            modifiedData.push({
              FCkey: key,
              FCvalue: data[key].EXFCSetName as string,
            });
          });
        }
        setFCSetsData(modifiedData);
      });
  }, [tab]);

  const renderOptions = (FCData: typeof FCSetsData) => {
    return FCData?.map((fdata, index) => {
      return (
        <option key={index} value={fdata.FCkey}>
          {fdata.FCvalue}
        </option>
      );
    });
  };
  return (
    <Layout>
      <div className="createEFCP_wrapper">
        <form className="form" autoComplete="off">
          <div className="EFCP_action_buttons">
            <button
              onClick={(e) => {
                e.preventDefault();
                setTab(1);
              }}
            >
              Create New FC Set
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setTab(2);
              }}
            >
              Add to Existing FC Set
            </button>
          </div>

          {err !== null ? <p className="error">{err}</p> : null}

          {tab === 1 ? (
            <>
              <h2 className="heading">Create a New FlashCard Set</h2>
              <div className="form_element">
                <label>SET TITLE</label>
                <input
                  type="text"
                  onChange={onChangeHandler}
                  placeholder="ENTER TITLE"
                  name="EXFCSetName"
                  value={formData.EXFCSetName}
                />
              </div>
              <div className="form_element">
                <label>SUBJECTS(OPTIONAL, COMMA SEPERATED)</label>
                <input
                  type="text"
                  onChange={onChangeHandler}
                  placeholder="ENTER SUBJECTS"
                  name="EXFCSetSubjects"
                  value={formData.EXFCSetSubjects}
                />
              </div>
              <div className="form_element">
                <label>DESCRIPTION</label>
                <textarea
                  rows={4}
                  onChange={onChangeHandler}
                  placeholder="ENTER DESCRIPTION"
                  name="EXFCSetDescription"
                  value={formData.EXFCSetDescription}
                />
              </div>
            </>
          ) : (
            <>
              <h2 className="heading">Select FlashCard Set</h2>
              <div className="form_element">
                <label>SELECT SET</label>
                {FCSetsData ? (
                  <>
                    {FCSetsData?.length === 0 ? (
                      <p>No FlashCard Card sets Create One</p>
                    ) : (
                      <select
                        name="FCSetId"
                        onChange={onChangeHandler}
                        value={formData.FCSetId}
                      >
                        {renderOptions(FCSetsData)};
                      </select>
                    )}
                  </>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </>
          )}

          <h2 className="heading">Create flashCards</h2>
          <div className="form_element">
            <label>FLASHCARD TITLE</label>
            <input
              type="text"
              onChange={onChangeHandler}
              placeholder="ENTER TITLE"
              name="EXFCTitle"
              value={formData.EXFCTitle}
            />
          </div>
          <div className="form_element">
            <label>Front Page</label>
            <textarea
              rows={4}
              cols={4}
              onChange={onChangeHandler}
              placeholder="ENTER CONTENT"
              name="EXFCFrontPage"
              value={formData.EXFCFrontPage}
            />
          </div>
          <div className="form_element">
            <label>Back Page</label>
            {getDataLS('link') ? (
              <input
                type="text"
                onChange={onChangeHandler}
                placeholder=""
                name="EXFCBackPage"
                value={formData.EXFCBackPage}
                readOnly
              />
            ) : (
              <textarea
                rows={4}
                onChange={onChangeHandler}
                placeholder="ENTER CONTENT"
                name="EXFCBackPage"
                value={formData.EXFCBackPage}
              />
            )}
          </div>
          <button
            className="form_button"
            onClick={async (e) => {
              e.preventDefault();
              setIsCreating(true);
              await saveDataToDb(formData);
            }}
          >
            Create Flash Card
            {isCreating ? (
              <img
                height="15px"
                width="20px"
                src="/images/25.svg"
                alt="Spinner"
              />
            ) : null}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default FlashCard;
