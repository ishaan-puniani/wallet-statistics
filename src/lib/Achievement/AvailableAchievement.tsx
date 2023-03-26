import axios from "axios";
import React, { useEffect, useState } from "react";
import "./available_achievement.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { API_HOST } from "../../constants";
export interface Achievements {
  showRaw?: boolean;
  credentials?: any;
}
const AvailableAchievement = (props: Achievements) => {
  const [loading, setLoading] = useState(false);
  const [achievement, setAchievement] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchBalance = await axios.post(
        // `${API_HOST}/tenant/${props.credentials.application_id}/get-current-balances-for-transaction-types?filter[userId]=${props.userId}&filter[currency]=${props.currency}`,
        `${API_HOST}/tenant/${props.credentials.application_id}/get-achievement?limit=100&offset=0`,
        {
          ...props.credentials,
        }
      );
      if (fetchBalance.data) {
        const items = fetchBalance.data.rows;
        setAchievement(items);
        console.log(items);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  console.log(achievement);
  return (
    <>
      {loading && <h1>Loading</h1>}
      <div className="available-achievement-wrapper">
        {achievement?.map((rec) =>
          props.showRaw ? (
            <>
              <div className="card">
                <SyntaxHighlighter language="javascript" style={docco}>
                  {JSON.stringify(rec, null, 2)}
                </SyntaxHighlighter>
              </div>
            </>
          ) : (
            <>
              <div className="container">
                <div className="image-container">
                  {/* <img src={rec?.iconLink} alt="icon" /> */}
                  <img
                    src={rec?.iconLink}
                    style={{ width: "44px" }}
                    alt="icon"
                  />
                </div>
                <div className="text-container">
                  <h2 className="available-achievement-title">
                    {rec?.title}{" "}
                    <span className="available-achievement-identifier">
                      {rec?.identifier.replace(/[_]/gi, " ")}
                    </span>
                  </h2>
                  {/* <h3 className="subtitle">{rec.subTitle}</h3>
                                <p className="description">{rec?.description}</p> */}
                  <h3 className="available-achievement-subtitle">
                    {rec?.subTitle}
                  </h3>
                  <p className="available-achievement-description">
                    {rec?.description}
                  </p>
                  <p className="available-achievement-2col">
                    <strong>Is Active</strong>
                    <span>: {rec?.isActive === true ? "Yes" : "No"}</span>
                  </p>
                  <p className="available-achievement-2col">
                    <strong>Target</strong>
                    <span>: {rec?.target !== null ? rec?.target : 0}</span>
                  </p>
                  <p className="available-achievement-2col">
                    <strong>Transaction Reward</strong>
                    <span>
                      :{" "}
                      {rec?.transactionReward !== null
                        ? rec?.transactionReward
                        : 0}
                    </span>
                  </p>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </>
  );
};

export default AvailableAchievement;
