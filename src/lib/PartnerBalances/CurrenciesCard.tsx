import axios from "axios";
import React, { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { API_HOST } from "../../constants";
import { ViewsWrapper } from "../Achievement/UserAchievements";
export interface ICurrencies {
  userId: string;
  currency: string;
  credentials: any;
  showRaw: boolean
}
const CurrenciesCard = (props: ICurrencies) => {
  // const [loading, setLoading] = useState(false);
  const [currencyData, setCurrencyData] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      const fetchBalance = await axios.post(
        `${API_HOST}/tenant/${props.credentials.application_id}/get-currency-autocomplete?filter[userId]=${props.userId}`,

        {
          ...props.credentials,
        }
      );
      if (fetchBalance.data) {
        const items = fetchBalance.data;
        setCurrencyData(items);
      }
      // setLoading(false);
    };
    fetchData();
  }, [props.userId, props.currency]);

  return (
    <>
      <h2>Currency : {props.userId}</h2>
      {/* {loading && <h1>Loading</h1>} */}
      {props.showRaw ? <>

        <div className="card">
          <SyntaxHighlighter language="javascript" style={docco}>
            {JSON.stringify(currencyData, null, 2)}
          </SyntaxHighlighter>
        </div>
      </> : <>
        <ViewsWrapper>
          {currencyData?.map((record: { id: string; label: string }, idx: React.Key) => (
            <div className="card" key={idx}>
              <div>
                <p>
                  <strong>id</strong> : {record.id}
                </p>
                <p>
                  <strong>label</strong> : {record.label}
                </p>
              </div>
            </div>
          ))}
        </ViewsWrapper></>}
    </>
  );
};

export default CurrenciesCard;
