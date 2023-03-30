import axios from "axios";
import React, { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { API_HOST } from "../../constants";
import { styled } from "@storybook/theming";
export interface UserAchievementsFilter {
  achieverId?: string;
  credentials?: any;
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

  return (
    <>
      {loading && <h1>Loading</h1>}
      <ViewsWrapper>
        {achievement?.map((rec) => (
          <>
            <div className="card">
              <SyntaxHighlighter language="javascript" style={docco}>
                {JSON.stringify(rec, null, 2)}
              </SyntaxHighlighter>
            </div>
          </>
        ))}
      </ViewsWrapper>
    </>
  );
};
export const ViewsWrapper = styled.div`
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

`
export default UserAchievement;
