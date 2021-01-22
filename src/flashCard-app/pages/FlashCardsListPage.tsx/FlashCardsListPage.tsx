import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { getDataLS } from "../../utils/auth";
import { firebaseDb } from "../../utils/firebase";
import FCSetListItem from "./FCSetListItem";
import "./FlashCardsListPage.css";

const FlashCardsListPage = () => {
  const [FCData, setFCData] = useState<
    | {
        key: string;
        value: {
          EXFCSetName: string;
          EXFCSetSubjects: string;
          EXFCSetDescription: string;
        };
      }[]
    | null
  >(null);

  const getFCSetsData = () => {
    const ref = firebaseDb.ref(`flashCards/${getDataLS("userId")}/sets`);
    ref.once("value").then((snapshot) => {
      const dataArray: {
        key: string;
        value: {
          EXFCSetName: string;
          EXFCSetSubjects: string;
          EXFCSetDescription: string;
        };
      }[] = [];
      const data = snapshot.val();
      if (data) {
        Object.keys(data).forEach((key) => {
          dataArray.push({
            key,
            value: data[key],
          });
        });
      }
      setFCData(dataArray);
    });
  };

  const renderFCSetListItem = (
    data: {
      key: string;
      value: {
        EXFCSetName: string;
        EXFCSetSubjects: string;
        EXFCSetDescription: string;
      };
    }[],
    deleteFCSetsHandler: (
      FCSetId: string,
      setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    ) => void,
  ) => {
    return data.map((val) => {
      return (
        <FCSetListItem
          key={val.key}
          FCSetId={val.key}
          FCSetTitle={val.value.EXFCSetName}
          deleteFCSetsHandler={deleteFCSetsHandler}
        />
      );
    });
  };

  useEffect(() => {
    getFCSetsData();
  }, []);

  const deleteFCSetsHandler = (
    FCSetId: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setIsLoading(true);
    const ref = firebaseDb.ref(
      `flashCards/${getDataLS("userId")}/sets/${FCSetId}`,
    );
    ref
      .remove()
      .then(() => {
        setIsLoading(false);
        getFCSetsData();
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  return (
    <Layout>
      <div className="FCList_wrapper">
        <div className="FCList_container">
          <h2>FlashCard Sets</h2>
          {FCData ? (
            <>
              {FCData.length === 0 ? (
                <p>
                  NO FLASH SETS{" "}
                  <Link to="/create-excali-fc">Create Excalidraw FC</Link>{" "}
                  <Link to="/create-basic-fc">Create Basic FC</Link>
                </p>
              ) : (
                renderFCSetListItem(FCData, deleteFCSetsHandler)
              )}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default FlashCardsListPage;
