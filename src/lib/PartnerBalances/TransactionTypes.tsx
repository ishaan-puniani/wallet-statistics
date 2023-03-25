import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_HOST } from "../../constants";
import "./partner_balances.css";
export interface ITransactionType {
  userId: string;
  currency: string;
  credentials: any;
}
const TransactionType = (props: ITransactionType) => {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchBalance = await axios.post(
        `${API_HOST}/tenant/${props.credentials.application_id}/get-transaction-type-autocomplete?filter[userId]=${props.userId}`,

        // /api//tenant/:tenantId/get-transaction-type-autocomplete
        {
          ...props.credentials,
        }
      );
      if (fetchBalance.data) {
        const items = fetchBalance.data;
        setBalance(items);
      }
      setLoading(false);
    };
    fetchData();
  }, [props.userId, props.currency]);

  return (
    <>
      {" "}
      <h2>Transaction Types : {props.userId}</h2>
      {loading && <h1>Loading</h1>}
      <div className="wrapper">
        {!loading &&
          balance?.map((record: { id: string; label: string }) => (
            <div className="card">
              <p>
                <strong>id</strong> : {record.id}
              </p>
              <p>  <strong>label</strong> : {record.label}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default TransactionType;
