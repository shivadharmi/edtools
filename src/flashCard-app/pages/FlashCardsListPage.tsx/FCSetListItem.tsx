import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firebaseDb } from "../../utils/firebase";
import { getDataLS } from "../../utils/auth";

interface Props {
  FCSetId: string;
  FCSetTitle: string;
}

const FCSetListItem: React.FC<Props> = ({ FCSetId, FCSetTitle }) => {
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

  useEffect(() => {
    const ref = firebaseDb.ref(
      `flashCards/${getDataLS("userId")}/cards/${FCSetId}`,
    );
    ref.once("value").then((snapshot) => {
      const dataArray: {
        key: string;
        value: {
          EXFCFrontPage: string;
          EXFCBackPage: string;
          EXFCTitle: string;
          isImage: boolean;
        };
      }[] = [];
      const data = snapshot.val();
      if (data) {
        Object.keys(data).forEach((key) => {
          dataArray.push({ key, value: data[key] });
        });
        setFCData(dataArray);
      }
    });
  }, [FCSetId]);

  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="FCList_set_wrapper">
      <div className="FCList_set">
        <p>{FCSetTitle}</p>
        <img
          id="FCList_arrow"
          src={isVisible ? "/images/up-arrow.svg" : "/images/down-arrow.svg"}
          alt="arrow"
          onClick={(e) => {
            setIsVisible((prevState) => !prevState);
          }}
        />
      </div>
      {isVisible ? (
        <div className="FCList_card">
          {FCData
            ? FCData?.map((data) => {
                return (
                  <Link key={data.key} to={`list/${FCSetId}/${data.key}`}>
                    {data.value.EXFCTitle}
                  </Link>
                );
              })
            : null}
        </div>
      ) : null}
    </div>
  );
};

export default FCSetListItem;
