import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firebaseDb } from "../../utils/firebase";
import { getDataLS } from "../../utils/auth";

interface Props {
  FCSetId: string;
  FCSetTitle: string;
  deleteFCSetsHandler: (
    FCSetId: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
}

export const DeleteIconBlock: React.FC<{
  FCkey: string;
  deleteHandler: (
    FCKey: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
}> = ({ FCkey, deleteHandler }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="FCList_card_item_del">
      <img
        onClick={() => deleteHandler(FCkey, setIsLoading)}
        src="/images/trash_red.svg"
        height="15px"
        width="15px"
        alt="delete"
      />
      {isLoading ? (
        <img
          src="/images/25_white.svg"
          height="15px"
          width="15px"
          alt="spinner"
        />
      ) : null}
    </div>
  );
};

const FCSetListItem: React.FC<Props> = ({
  FCSetId,
  FCSetTitle,
  deleteFCSetsHandler,
}) => {
  const [FCData, setFCData] = useState<
    | {
        key: string;
        value: {
          EXFCFrontPage: string;
          EXFCBackPage: string;
          EXFCTitle: string;
          isImage: boolean;
        };
      }[]
    | null
  >(null);

  const getFCData = () => {
    const ref = firebaseDb.ref(
      `flashCards/${getDataLS("userId")}/cards/${FCSetId}`,
    );
    const dataArray: {
      key: string;
      value: {
        EXFCFrontPage: string;
        EXFCBackPage: string;
        EXFCTitle: string;
        isImage: boolean;
      };
    }[] = [];
    ref
      .once("value")
      .then((snapshot) => {
        const data = snapshot.val();
        if (data) {
          Object.keys(data).forEach((key) => {
            dataArray.push({ key, value: data[key] });
          });
        }
        setFCData(dataArray);
      })
      .catch((err) => {
        errorHandler(err.message);
        setFCData(null);
      });
  };

  useEffect(() => {
    getFCData();
  }, [FCSetId, getFCData]);

  const [err, setError] = useState<string | null>(null);

  const deleteFCHandler = (
    FCId: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setIsLoading(true);
    const ref = firebaseDb.ref(
      `flashCards/${getDataLS("userId")}/cards/${FCSetId}/${FCId}`,
    );
    ref
      .remove()
      .then(() => {
        setIsLoading(false);
        getFCData();
      })
      .catch((err) => {
        setIsLoading(false);
        errorHandler(err.message);
      });
  };

  const errorHandler = (message: string) => {
    setError(message);
    const tId = setTimeout(() => {
      setError(null);
      clearTimeout(tId);
    }, 1500);
  };

  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="FCList_set_wrapper">
      <div className="FCList_set">
        <div style={{ display: "flex" }}>
          <p>{FCSetTitle}</p>
          <DeleteIconBlock
            FCkey={FCSetId}
            deleteHandler={deleteFCSetsHandler}
          />
        </div>
        <img
          id="FCList_arrow"
          src={isVisible ? "/images/up-arrow.svg" : "/images/down-arrow.svg"}
          alt="arrow"
          onClick={(e) => {
            setIsVisible((prevState) => !prevState);
          }}
        />
      </div>
      {err ? <p>{err}</p> : null}
      {isVisible ? (
        <div className="FCList_card">
          {FCData ? (
            <>
              {FCData.length === 0 ? (
                <p>FLASH CARD NOT YET CREATED</p>
              ) : (
                FCData?.map((data) => {
                  return (
                    <div key={data.key} className="FCList_card_item">
                      <Link to={`list/${FCSetId}/${data.key}`}>
                        {data.value.EXFCTitle}
                      </Link>
                      <DeleteIconBlock
                        FCkey={data.key}
                        deleteHandler={deleteFCHandler}
                      />
                    </div>
                  );
                })
              )}
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default FCSetListItem;
