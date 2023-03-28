import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_HOST } from "../../constants";
import "./partner_balances.css";
export interface IPartnerBalancesProps {
  credentials?: any;
  userId?: string;
  currency?: "COINS" | "USD";
  amountType?: "amount" | "virtual"
}


const PartnerBalances = (props: IPartnerBalancesProps) => {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchBalance = await axios.post(
        `${API_HOST}/tenant/${props.credentials.application_id}/get-current-balances-for-transaction-types?filter[userId]=${props.userId}&filter[currency]=${props.currency}`,
        {
          ...props.credentials,
        }
      );
      if (fetchBalance.data) {
        console.log(fetchBalance.data)
        setBalance(fetchBalance.data);
      }
      setLoading(false);
    };
    fetchData();
  }, [props.userId, props.currency]);
  return (
    <>
      <h2>Partner Balances : {props.userId}</h2>

      {loading && <h1>Loading</h1>}
      <div className="wrapper">
        {!loading &&
          balance.map((record) => (
            <div className="card">
              <p>
                <strong>Transaction Type</strong> :{" "}
                {record.transactionType.slice(0, 17)}
              </p>
              <p>
                <strong>Amount</strong> : {parseFloat(record.amount).toFixed(2)}
              </p>
            </div>
          ))}
      </div>
    </>
  );
};
export default PartnerBalances;
