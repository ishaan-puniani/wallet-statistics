import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { API_HOST } from "../../constants";
import { SimulatorWrapper } from "../simulator/Simulator";
import styled from "styled-components";
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
  const [response, setResponse] = useState<any>();

  useEffect(() => {
    const fetchTransactionData = async () => {
      // setLoading(true);
      const fetchTransactionData = await axios.post(
        `${props.credentials.host || API_HOST}/tenant/${
          props.credentials.application_id
        }/get-transaction-type-autocomplete`,
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
        `${props.credentials.host || API_HOST}/tenant/${
          props.credentials.application_id
        }/get-currency-autocomplete`,
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
    const validate = await axios.post(
      `${props.credentials.host || API_HOST}/tenant/${
        props.credentials.application_id
      }/validate-transaction-rule`,
      {
        data,
      }
    );
    if (validate) {
      setResponse(validate.data);
    }
  };

  return (
    <SimulatorWrapper>
      <Wrapper>
        <h1>Transaction Rule Validation</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ul className="formStyle achievement">
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
              <label>Amount :</label>
              <input value={props.amount} {...register("amount")} />
            </li>
            <li>
              <label>Currency : </label>
              <select {...register("currency")} defaultValue={null}>
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
              <label>Date :</label>
              <input value={props.date} {...register("date")} type="date" />
            </li>
          </ul>
          <div className="formStyle formStyle-btn">
            <input type="submit" />
          </div>
        </form>
        <p id="validTransaction">
          Transaction Valid - {JSON.stringify(response?.isValid)}
        </p>
        <p id="transactionRule">
          Transaction Rule - {JSON.stringify(response, null, 4)}
        </p>
      </Wrapper>
    </SimulatorWrapper>
  );
};
export default TransactionRuleValidation;
const Wrapper = styled.div`
  p {
    margin-left: 45px;
  }
  .formStyle li {
    justify-content: space-between;
  }
  .formStyle li select {
    width: 337px;
    height: 24px;
  }
  .formStyle li input[type="date"] {
    width: 334px;
    height: 24px;
    padding: 0px;
  }
`;
