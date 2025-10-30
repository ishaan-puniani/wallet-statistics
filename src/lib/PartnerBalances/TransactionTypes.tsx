import axios from "axios";
import React, { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { API_HOST } from "../../constants";
import { ViewsWrapper } from "../Achievement/UserAchievements";
export interface ITransactionType {
  userId: string;
  currency: string;
  credentials: any;
  showRaw: boolean
}
const TransactionType = (props: ITransactionType) => {
  // const [loading, setLoading] = useState(false);
  const [transactionData, setTransactionData] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      const fetchBalance = await axios.post(
        `${props.credentials.API_HOST || API_HOST}/tenant/${props.credentials.application_id}/get-transaction-type-autocomplete?filter[userId]=${props.userId}`,
        {
          ...props.credentials,
        }
      );
      if (fetchBalance.data) {
        const items = fetchBalance.data;
        setTransactionData(items);
      }
      // setLoading(false);
    };
    fetchData();
  }, [props.userId, props.currency]);

  return (
    <>
      <h2>Transaction Types : {props.userId}</h2>
      {/* {loading && <h1>Loading</h1>} */}
      {props.showRaw ? <>
        <div className="card">
          <SyntaxHighlighter language="javascript" style={docco}>
            {JSON.stringify(transactionData, null, 2)}
          </SyntaxHighlighter>
        </div>
      </> : <>
        <ViewsWrapper>
          {transactionData?.map((record: { id: string; label: string }) => (
            <div className="card">
              <div>
                <p>
                  <strong>id</strong> : {record.id}
                </p>
                <p>  <strong>label</strong> : {record.label}</p>
              </div>
            </div>
          ))}
        </ViewsWrapper></>}
    </>
  );
};

export default TransactionType;
