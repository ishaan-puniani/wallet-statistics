import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { API_HOST } from "../../constants";
import { SimulatorWrapper } from "../simulator/Simulator";
export interface ITransactionRuleValidation {
  credentials?: any;
  partnerId: string;
  amount: string;
  currency: string;
  transactionTypes: string;
  date: string;
}

const TransactionRuleValidation = (props: ITransactionRuleValidation) => {
  const { register, handleSubmit } = useForm();

  const [transactionData, setTransactionData] = useState<any>();
  const [currencyData, setCurrencyData] = useState<any>();

  useEffect(() => {
    const fetchTransactionData = async () => {
      // setLoading(true);
      const fetchTransactionData = await axios.post(
        `${API_HOST}/tenant/${props.credentials.application_id}/get-transaction-type-autocomplete`,
        {
          ...props.credentials,
        }
      );
      if (fetchTransactionData.data) {
        const items = fetchTransactionData.data;
        setTransactionData(items);
      }
      // setLoading(false);
    };
    const fetchCurrencyData = async () => {
      // setLoading(true);
      const fetchCurrencyTypes = await axios.post(
        `${API_HOST}/tenant/${props.credentials.application_id}/get-currency-autocomplete`,
        {
          ...props.credentials,
        }
      );
      if (fetchCurrencyTypes.data) {
        const items = fetchCurrencyTypes.data;
        setCurrencyData(items);
      }
      // setLoading(false);
    };
    fetchCurrencyData();
    fetchTransactionData();
  }, []);

  const onSubmit = async (data: any) => {
    const validateTransaction = await axios.post(
      `${API_HOST}/tenant/${props.credentials.application_id}/validate-transaction-rule`,
      {
        data,
      }
    );
  };

  return (
    <>
      <SimulatorWrapper>
        <h1>Transaction Rule Validation</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ul className="formStyle">
            <div className="achievement">
              <li>
                <label>Amount :</label>
                <input value={props.amount} {...register("amount")} />
              </li>
              <li>
                <label>Currency : </label>
                <select
                  {...register("currency")}
                  defaultValue={null}
                  placeholder="Select Currency"
                >
                  <option>Select Currency</option>
                  {currencyData?.length > 0 &&
                    currencyData.map((cur: any) => (
                      <option key={cur.id} value={cur.id}>
                        {cur.label}
                      </option>
                    ))}
                </select>
              </li>
              <li>
                <label>Partner Id :</label>
                <input value={props.partnerId} {...register("partnerId")} />
              </li>
              <li>
                <label>Transaction Type :</label>
                <select {...register("transactionTypes")}>
                  <option>Select Transaction Type</option>

                  {transactionData?.length > 0 &&
                    transactionData.map((cur: any) => (
                      <option key={cur.id} value={cur.id}>
                        {cur.label}
                      </option>
                    ))}
                </select>
              </li>
              <li>
                <label>Date :</label>
                <input value={props.date} {...register("date")} type="date" />
              </li>
            </div>
          </ul>
          <div className="formStyle formStyle-btn">
            <input type="submit" />
          </div>
        </form>
      </SimulatorWrapper>
    </>
  );
};
export default TransactionRuleValidation;
