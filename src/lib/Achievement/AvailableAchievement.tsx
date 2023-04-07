import axios from "axios";
import React, { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { API_HOST } from "../../constants";
import styled from 'styled-components';
export interface AchievementsFilter {
  showRaw?: boolean;
  credentials?: any;
}
const AvailableAchievement = (props: AchievementsFilter) => {
  // const [loading, setLoading] = useState(false);
  const [achievement, setAchievement] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
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
      // setLoading(false);
    };
    fetchData();
  }, []);
  console.log(achievement);
  return (
    <>
      {/* {loading && <h1>Loading</h1>} */}
      <AvailableAchievementWrapper>
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
                    src={!rec?.iconLink ? 'https://i.ibb.co/LQCZTwN/5718718.png' : rec?.iconLink}
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
      </AvailableAchievementWrapper>
    </>
  );
};


const AvailableAchievementWrapper = styled.div`
  // width: 500px;
  margin-bottom: 10px;
  padding: 15px;
  // background-color: #f1efef;
  @media screen and (max-width: 768px) {
      max-width:100%;
      padding: 10px;
    margin: 5px;
    }
    @media screen and (max-width: 425px) {
      max-width:92%;
    }
    @media screen and (max-width: 320px) {
      max-width:100%;
      margin:0;
    }
.container {
  display: flex;
  align-items: flex-start;
  margin-bottom: 5px;
  padding: 20px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
  background: #FFFFFF;
    box-shadow: 0px 2px 9px rgba(50, 71, 92, 0.06), 0px 4px 9px 1px rgba(50, 71, 92, 0.04), 0px 2px 6px 4px rgba(50, 71, 92, 0.02);
  @media screen and (max-width: 425px) {
    padding: 10px;
    flex-direction: column;
    gap: 15px;
  }
}

.image-container {
  margin-right: 1rem;
}

.text-container {
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px){
    width: 300px;
      word-wrap: break-word;
  }
}

.available-achievement-title {
  font-size: 18px;
  margin: 0;
  margin-bottom: 10px;
  
  @media screen and (max-width: 425px) {
    display: flex;
    flex-direction: column;
    gap:5px;
    font-size:16px;
    width: 300px;
    word-wrap: break-word;
  }
  @media screen and (max-width: 425px) {
  width:250px
  }

}
.available-achievement-identifier {
  font-size: 11px;
  color: #656565;
  @media screen and (max-width: 768px){
    display: block;
  }
  @media screen and (max-width: 425px) {
  width:250px
  }
}
.available-achievement-subtitle {
  font-size: 1rem;
  margin: 0;
  font-weight: 100;
  margin-bottom: 5px;
}
.available-achievement-description {
  margin: 0;
}
.available-achievement-2col {
  margin: 0;
  margin-top: 10px;
  width: 400px;
  display: grid;
  grid-template-columns: 40% 30%;
  font-size: 14px;
  
  @media screen and (max-width: 425px) {
    width:100%;
    grid-template-columns: 50% 45%;
  }
  @media screen and (max-width: 768px){
    width:100%
  }
}


`;
export default AvailableAchievement;
