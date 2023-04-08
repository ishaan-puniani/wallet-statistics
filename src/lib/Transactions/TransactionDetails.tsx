import styled from "styled-components";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_HOST } from "../../constants";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

export interface ITransactionDetails {
  credentials: any;
  transactionId: string;
  showRaw: boolean;
  loadLinkedTransactions: boolean;
  loadLinkedAchievements: boolean;
}
const TransactionDetails = (props: ITransactionDetails) => {
  const [loading, setLoading] = useState(false);
  const [transactionData, setTransactionData] = useState<any>();
  const [linkedTransactionData, setLinkedTransactionData] = useState<any>();
  const [linkedUserAchievementsData, setLinkedUserAchievementsData] =
    useState<any>();

  useEffect(() => {
    const fetchLinkedTransactionsData = async () => {
      setLoading(true);
      const fetchBalance = await axios.post(
        `${API_HOST}/tenant/${props.credentials.application_id}/get-transaction?filter[baseTransaction]=${props.transactionId}`,
        {
          ...props.credentials,
        }
      );
      if (fetchBalance.data) {
        const items = fetchBalance.data;
        setLinkedTransactionData(items);
      }
      setLoading(false);
    };
    if (props.transactionId && props.transactionId.length > 5) {
      if (props.loadLinkedTransactions) {
        fetchLinkedTransactionsData();
      }
    }
  }, [props.transactionId, props.loadLinkedTransactions]);

  useEffect(() => {
    const fetchLinkedTransactionsData = async () => {
      setLoading(true);
      const fetchBalance = await axios.post(
        `${API_HOST}/tenant/${props.credentials.application_id}/get-user-achievement-trace?filter[baseTransaction]=${props.transactionId}`,
        {
          ...props.credentials,
        }
      );
      if (fetchBalance.data) {
        const items = fetchBalance.data;
        setLinkedUserAchievementsData(items);
      }
      setLoading(false);
    };
    if (props.transactionId && props.transactionId.length > 5) {
      if (props.loadLinkedAchievements) {
        fetchLinkedTransactionsData();
      }
    }
  }, [props.transactionId, props.loadLinkedAchievements]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchBalance = await axios.post(
        `${API_HOST}/tenant/${props.credentials.application_id}/get-transaction/${props.transactionId}`,
        {
          ...props.credentials,
        }
      );
      if (fetchBalance.data) {
        const items = fetchBalance.data;
        setTransactionData(items);
      }
      setLoading(false);
    };

    if (props.transactionId && props.transactionId.length > 5) {
      fetchData();
    }
  }, [props.transactionId]);

  return (
    <>
      {loading && <>Loading</>}
      {props.showRaw ? (
        <>
          <div className="card">
            <SyntaxHighlighter language="javascript" style={docco}>
              {JSON.stringify(transactionData, null, 2)}
            </SyntaxHighlighter>
          </div>
          {props.loadLinkedTransactions && (
            <>
              <h1>Linked Transactions ({linkedTransactionData?.count || 0})</h1>
              <table>
                {linkedTransactionData?.rows?.map((trxn: any) => {
                  return (
                    <tr>
                      <td>{trxn.transactionTypeIdentifier}</td>
                      <td>{trxn.payer}</td>
                      <td>{trxn.amount}</td>
                    </tr>
                  );
                })}
              </table>
            </>
          )}
          {props.loadLinkedAchievements && (
            <>
              <h1>
                Linked Achievements ({linkedUserAchievementsData?.count || 0})
              </h1>
              <table>
                {linkedUserAchievementsData?.rows?.map((trxn: any) => {
                  return (
                    <tr>
                      <td>{trxn.id}</td>
                    </tr>
                  );
                })}
              </table>
            </>
          )}
        </>
      ) : (
        <>
          <TransactionDetailsWrapper>
            {transactionData?.id}
          </TransactionDetailsWrapper>
        </>
      )}
    </>
  );
};
const TransactionDetailsWrapper = styled.div``;

export default TransactionDetails;