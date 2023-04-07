import styled from "styled-components";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_HOST } from "../../constants";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

export interface Payers {
  userId: string;
  currency: string;
  credentials: any;
  showRaw: boolean;
}

function roundToTwo(num: any) {
  return +(Math.round(num + "e+3") + "e-2");
}
console.log(roundToTwo(3.394792));
const PayerTransaction = (props: Payers) => {
  const [loading, setLoading] = useState(false);
  const [payerData, setPayerData] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchBalance = await axios.post(
        // `${API_HOST}/tenant/${props.credentials.application_id}/reports/get-partner-balances-report-by-date?dateRange[]='10-03-2023'`,
        `${API_HOST}/tenant/${props.credentials.application_id}/get-transaction-profile-by-identifier-for-currency/${props.userId}/${props.currency}`,
        // `${API_HOST}/tenant/${props.credentials.application_id}/get-transaction-profile-by-identifier-for-currency/${props.userId}/${props.currency}`,
        {
          ...props.credentials,
        }
      );
      if (fetchBalance.data) {
        const items = fetchBalance.data;
        setPayerData(items);
      }
      setLoading(false);
    };
    fetchData();
  }, [props.userId, props.currency]);
  // TransactionTypesAmount
  const newObjectKeys = payerData?.transactionTypesAmount;
  // TransactionTypesVirtualValues
  const typesVirtualValues = payerData?.transactionTypesVirtualValue;
  // console.log(payerData)
  return (
    <>
      {loading && <h1>Loading</h1>}
      {props.showRaw ? (
        <>
          <div className="card">
            <SyntaxHighlighter language="javascript" style={docco}>
              {JSON.stringify(payerData, null, 2)}
            </SyntaxHighlighter>
          </div>
        </>
      ) : (
        <>
          <PayerTransactionWrapper>
            <div className="">
              {/* <p>
                <strong>Identifier</strong>:{" "}
                <small style={{ marginTop: "5px" }}>
                  {payerData?.identifier}
                </small>
              </p>
              <p>
                <strong>Is Booked</strong>:{" "}
                {payerData?.isBlocked === true ? "Yes" : "No"}
              </p>
              <p>
                <strong>Created At</strong>: {payerData?.createdAt}
              </p>
              <p>
                <strong>Currency</strong> :{payerData?.currency}
              </p>
              <p>
                <strong>Current Amount</strong> :
                {parseFloat(payerData?.currentAmount).toFixed(2)}
              </p>
              <p>
                <strong>Current Virtual Value</strong> :
                {payerData?.currentVirtualValue}
              </p> */}
              <p>
                <strong>Transaction Types Amount</strong>
                {newObjectKeys !== null && typeof newObjectKeys === "object"
                  ? Object.keys(newObjectKeys).map((item) => (
                      <div className="transaction-container">
                        {" "}
                        <img
                          className="transaction-image"
                          src="https://static.vecteezy.com/system/resources/previews/007/391/302/original/account-balance-flat-design-long-shadow-glyph-icon-payment-banking-wallet-with-credit-card-silhouette-illustration-vector.jpg"
                          alt=""
                        />{" "}
                        <p>
                          <strong className="transaction-title">{item}</strong>:{" "}
                          <span> {roundToTwo(newObjectKeys[item])}</span>
                        </p>
                      </div>
                    ))
                  : "Not valid"}
              </p>

              <p>
                <strong>Transaction Virtual Values</strong>
                {typesVirtualValues !== null &&
                typeof typesVirtualValues === "object"
                  ? Object.keys(typesVirtualValues).map((item) => (
                      <div className="transaction-container">
                        <img
                          className="transaction-image"
                          src="https://static.vecteezy.com/system/resources/previews/007/391/302/original/account-balance-flat-design-long-shadow-glyph-icon-payment-banking-wallet-with-credit-card-silhouette-illustration-vector.jpg"
                          alt=""
                        />{" "}
                        <p>
                          <strong className="transaction-title">{item}</strong>:{" "}
                          <span>{roundToTwo(typesVirtualValues[item])}</span>
                        </p>
                      </div>
                    ))
                  : "Not valid"}
              </p>
              {/* {
                        Object.keys(balance?.transactionTypesAmount).map(item => {
                            <p>{item}</p>
                        })
                    } */}
              {/* <p>
                <strong>Current Virtual Value</strong> :
                {payerData?.currentVirtualValue}
              </p>

              <p>
                <strong>Tenant Id</strong>:<small>{payerData?.tenantId}</small>
              </p>
              <p>
                <strong>Updated At</strong> :{payerData?.updatedAt}
              </p>
              <p>
                <strong>Updated By</strong>:
                <small>{payerData?.updatedById}</small>
              </p> */}
            </div>
          </PayerTransactionWrapper>
        </>
      )}
    </>
  );
};
const PayerTransactionWrapper = styled.div`
    margin: 24px;
    border-radius: 8px;
    box-shadow: 0px 2px 9px rgba(50, 71, 92, 0.06),
      0px 4px 9px 1px rgba(50, 71, 92, 0.04),
      0px 2px 6px 4px rgba(50, 71, 92, 0.02);
    padding: 24px;
    max-width: auto;
    @media screen and (max-width: 425px) {
      margin: 24px;
    }
  }
  .transaction-container {
    display: flex;
    align-items: center;
  }

  .transaction-container>p{
   display:flex;
   flex-wrap:wrap;
  }

  .transaction-container>p>strong{
    padding-left:5px 
  }
  .transaction-container>p>span{
    padding-left:2px ;
  }
  .transaction-title{
    @media screen and (max-width: 425px) {
        display: block;
        width: 105px;
        word-wrap: break-word;
      }
    
  }
  .cards {
    padding: 15px;
    width: 100%;
    margin: 10px;
  }
  .transaction-image {
    width: 30px;
    height: 30px;
  }
`;

export default PayerTransaction;
