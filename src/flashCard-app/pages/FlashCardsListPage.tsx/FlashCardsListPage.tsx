import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { getDataLS } from "../../utils/auth";
import { firebaseAuth, firebaseDb } from "../../utils/firebase";
import FCSetListItem from "./FCSetListItem";
import "./FlashCardsListPage.css";

const renderFCSetListItem = (
  data: {
    key: string;
    value: {
      EXFCSetName: string;
      EXFCSetSubjects: string;
      EXFCSetDescription: string;
    };
  }[],
) => {
  return data.map((val) => {
    return (
      <FCSetListItem
        key={val.key}
        FCSetId={val.key}
        FCSetTitle={val.value.EXFCSetName}
      />
    );
  });
};

const FlashCardsListPage = () => {
  const [FCData, setFCData] = useState<
    {
      key: string;
      value: {
        EXFCSetName: string;
        EXFCSetSubjects: string;
        EXFCSetDescription: string;
      };
    }[]
    | null
  >(null);

  useEffect(() => {
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
  }, []);
  return (
    <Layout>
      <div className="FCList_wrapper">
        <div className="FCList_container">
          <h2>FlashCard Sets</h2>
          {FCData ? <>{FCData.length === 0 ?<p>NO FLASH SETS <Link to="/create-excali-fc">Create Excalidraw FC</Link> <Link to="/create-basic-fc">Create Basic FC</Link></p>:renderFCSetListItem(FCData)}</> : <p>Loading...</p>}
        </div>
      </div>
    </Layout>
  );
};

export default FlashCardsListPage;
