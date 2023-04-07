
import styled from 'styled-components';
import axios from "axios";
import React, { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { API_HOST } from "../../constants";
export interface IPartnerBalancesProps {
  credentials?: any;
  userId?: string;
  currency?: "COINS" | "USD";
  amountType?: "amount" | "virtual";
  showRaw?: boolean
}

const PartnerBalances = (props: IPartnerBalancesProps) => {
  // const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      const fetchBalance = await axios.post(
        `${API_HOST}/tenant/${props.credentials.application_id}/get-current-balances-for-transaction-types?filter[userId]=${props.userId}&filter[currency]=${props.currency}`,
        {
          ...props.credentials,
        }
      );
      if (fetchBalance.data) {
        console.log(fetchBalance.data);
        setBalance(fetchBalance.data);
      }
      // setLoading(false);
    };
    fetchData();
  }, [props.userId, props.currency]);
  return (
    <>
      <h2>Partner Balances {props.userId}</h2>

      {/* {loading && <h1>Loading</h1>} */}
      {props.showRaw ? <>
        <div className="card">
          <SyntaxHighlighter language="javascript" style={docco}>
            {JSON.stringify(balance, null, 2)}
          </SyntaxHighlighter>
        </div></> : <>
        <PartnerBalancesWrapper>
          <div className="balance-Wrapper">
            {balance.map((record) => (
              <div className="balance-card">
                <div>
                  <img

                    src="https://static.vecteezy.com/system/resources/previews/007/391/302/original/account-balance-flat-design-long-shadow-glyph-icon-payment-banking-wallet-with-credit-card-silhouette-illustration-vector.jpg"
                    alt=""
                  />
                  <p> {record.transactionType.slice(0, 17)}</p>
                </div>
                <p>{parseFloat(record.amount).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </PartnerBalancesWrapper></>}
    </>
  );
};
const PartnerBalancesWrapper = styled.div`
.wrapper {
  display: flex;
  flex-wrap: wrap;
}
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
.balance-Wrapper {
  max-width: 350px;
  padding: 15px;
  width: 100%;
  line-height: 0;
  margin: 25px;
  border: 1px solid rgb(250, 247, 247);
  border-radius: 5px;
  box-shadow: 1px 1px 5px 1px rgb(214, 213, 213);
}
.balance-card {
  display: flex;
  justify-content: space-between;
}
.balance-card > div {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3px;
}
.balance-card > div > img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

`;
export default PartnerBalances;
