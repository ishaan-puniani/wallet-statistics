import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_HOST } from "../../constants";
import "./partner_balances.css";
export interface ICurrencies {
  userId: string;
  currency: string;
  credentials: any;
  amountType?: "Amount" | "Virtual Value";
}
const CurrenciesCard = (props: ICurrencies) => {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchBalance = await axios.post(
        `${API_HOST}/tenant/${props.credentials.application_id}/get-currency-autocomplete?filter[userId]=${props.userId}`,

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
  console.log(balance);
  return (
    <>
      <h2>Currency : {props.userId}</h2>
      {loading && <h1>Loading</h1>}
      {!loading &&
        balance?.map((record: { id: string; label: string }) => (
          <div className="card">
            <p>
              <strong>Id</strong> : {record.id}
            </p>
            <p>
              <strong>Currency</strong> : {record.label}
            </p>
          </div>
        ))}
    </>
  );
};

export default CurrenciesCard;
