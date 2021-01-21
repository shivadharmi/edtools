import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { getDataLS } from "../../utils/auth";
import { firebaseDb } from "../../utils/firebase";

import "./FlashCardPreviewPage.css";

const FlashCardPreviewPage = () => {
  const { setId, fcId } = useParams<{ setId: string; fcId: string }>();
  const [data, setData] = useState<{
    EXFCFrontPage: string;
    EXFCBackPage: string;
    EXFCTitle: string;
    isImage: boolean;
  } | null>(null);
  const [isBackVisible, setIsBackVisible] = useState(false);
  useEffect(() => {
    const ref = firebaseDb.ref(
      `flashCards/${getDataLS("userId")}/cards/${setId}/${fcId}`,
    );
    ref.once("value").then((snapshot) => {
      const fcdata = snapshot.val();
      if (fcdata) {
        setData(fcdata);
      }
    });
  }, [setId, fcId]);

  const flipHandler = () => {
    setIsBackVisible((prev) => !prev);
  };

  return (
    <Layout>
      <div className="wrapper">
        <div className="container">
          {data ? (
            <>
              <h2>{data?.EXFCTitle}</h2>
              {isBackVisible ? (
                <div className="back" onClick={flipHandler}>
                  {data?.isImage ? (
                    <img src={data.EXFCBackPage} alt={data.EXFCTitle} />
                  ) : (
                    <p className="FC_content">{data?.EXFCBackPage}</p>
                  )}
                </div>
              ) : (
                <div className="front" onClick={flipHandler}>
                  <p className="FC_content">{data?.EXFCFrontPage}</p>
                </div>
              )}
              <p>Click on the card to flip</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default FlashCardPreviewPage;
