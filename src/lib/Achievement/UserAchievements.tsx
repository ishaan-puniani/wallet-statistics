import axios from "axios";
import React, { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { API_HOST } from "../../constants";
import styled from 'styled-components';
export interface UserAchievementsFilter {
  achieverId?: string;
  credentials?: any;
  showRaw?: boolean;
}
const UserAchievement = (props: UserAchievementsFilter) => {
  const [loading, setLoading] = useState(false);
  const [achievement, setAchievement] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchBalance = await axios.post(
        // `${API_HOST}/tenant/${props.credentials.application_id}/get-current-balances-for-transaction-types?filter[userId]=${props.userId}&filter[currency]=${props.currency}`,
        `${API_HOST}/tenant/${props.credentials.application_id}/user-achievements/get-active/${props.achieverId}`,
        {
          ...props.credentials,
        }
      );
      if (fetchBalance.data) {
        const items = fetchBalance.data;
        setAchievement(items);
        console.log(items);
      }
      setLoading(false);
    };
    fetchData();
  }, [props.achieverId]);
  console.log(achievement)
  return (
    <>
      <ViewsWrapper>
      {loading && <h1 className="no-data">Loading</h1>}
      {!loading && achievement?.length === 0 ? (
            <div className="no-data">No data</div>
      ) : null}
        {props.showRaw ? <>
          {achievement?.map((rec) => (
            <>
              <div className="card">
                <SyntaxHighlighter language="javascript" style={docco}>
                  {JSON.stringify(rec, null, 2)}
                </SyntaxHighlighter>
              </div>
            </>
          ))}
        </> : <>
          <div className="container-of-user-achievement">
            {achievement?.map(rec => <>
              <div className="container">
                <div className="image-container">
                  {/* <img src={rec?.iconLink} alt="icon" /> */}
                  <img
                    src={rec?.iconLink !== null ? 'https://i.ibb.co/PYv269v/6839254.png' : rec?.iconLink}
                    style={{ width: "44px" }}
                    alt="icon"
                  />
                </div>
                <div className="text-container">
                  <div className="level-and-title-container">
                    <div className="title-and-subTitle-container">
                      <h2 className="available-achievement-title">
                        {rec?.achievement?.title}
                      </h2>
                      {rec?.achievement?.subTitle && <>
                        <h4 className="user-achievement-subtitle">
                          {rec?.achievement?.subTitle}
                        </h4>
                      </>}
                    </div>
                    {rec?.levelOrderNumber !== null && <>
                      <h4 className="user-achievement-level">
                        <span>Level: </span><span>{rec?.levelOrderNumber}</span>
                      </h4>
                    </>}
                  </div>
                  {/* <h3 className="available-achievement-identifier">
                    {rec?.identifier.replace(/[_]/gi, " ")}
                  </h3> */}

                  <p className="available-achievement-2col">
                    <strong>Identifier
                    </strong>
                    <span>: {rec?.achievement?.identifier}</span>
                  </p>
                  <p className="available-achievement-2col">
                    <strong>Progress</strong>
                    <span>: {rec?.progress !== null ? rec?.progress : 0}</span>
                  </p>
                  <p className="available-achievement-2col">
                    <strong>Progress Pct</strong>
                    <span>
                      :{" "}
                      {rec?.progressPct !== null
                        ? rec?.progressPct
                        : 0}
                    </span>
                  </p>
                </div>
              </div>
            </>)}
          </div>
        </>}
      </ViewsWrapper>
    </>
  );
};
export const ViewsWrapper = styled.div`
 .no-data {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  display: flex;
  flex-wrap: wrap;
.card {
  max-width: 350px;
  padding: 15px;
  width: 100%;
  margin: 10px;
  border: 1px solid black;
  border-radius: 10px;
}

.card-content {
  font-size: 14px;
  letter-spacing: 0.5px;
  line-height: 1.5;
}

//For user achievement container
.container-of-user-achievement{
  width: 100%;
  margin: 10px;
}
.title-and-subTitle-container{
  width: 100%;
}
.container {
  display: flex;
  align-items: flex-start;
  margin-bottom: 5px;
  padding: 20px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
  background: #FFFFFF;
    box-shadow: 0px 2px 9px rgba(50, 71, 92, 0.06), 0px 4px 9px 1px rgba(50, 71, 92, 0.04), 0px 2px 6px 4px rgba(50, 71, 92, 0.02);
  @media screen and (max-width: 426px) {
    padding: 10px;
    flex-direction: column;
    gap: 15px;
  }
}
.level-and-title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 426px){
    flex-direction: column;
  }
}
.level-and-title-container h4{
  margin:0px;
  display: flex;
  gap: 5px;
  font-size: 14px;
  @media screen and (max-width:426px){
    width: 100%;
    margin-top: 8px;
  }
}
.level-and-title-container h2{
  margin:0px;
  @media screen and (max-width: 321px){
      flex-direction: column;
  }
}
.user-achievement-subtitle{
  color:gray;
  font-size: 14px;
}
.image-container {
  margin-right: 1rem;
}

.text-container {
  width: 88%;
    word-wrap: break-word;
  @media screen and (max-width: 769px){
    width: 300px;
      word-wrap: break-word;
  }
  @media screen and (max-width: 326px){
    width: 100%;
      word-wrap: break-word;
  }
  
}

.available-achievement-title {
  font-size: 18px;
  margin: 0;
  margin-bottom: 4px;
  width: 88%;
    word-wrap: break-word;
  @media screen and (max-width: 426px) {
    font-size:16px;
  }
  
}
.available-achievement-identifier {
  font-size: 11px;
  color: #656565;
  margin: 0;
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
  width: 100%;
  display: grid;
  grid-template-columns: 40% 60%;
  font-size: 14px;
  
  @media screen and (max-width: 426px) {
    width:100%;
    grid-template-columns: 40% 60%;
  }
  @media screen and (max-width: 769px){
    width:100%
  }
  @media screen and (max-width:426px){
    grid-template-columns: 100%;
  }
}


`
export default UserAchievement;
