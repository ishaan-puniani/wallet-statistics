import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { API_HOST } from "../../constants";
import "./stimulator.css";
export interface ISimulatorProps {
  credentials?: any;
  transactionType?: "WALLET_REFUND" | "CP_WITHDRAWAL";
  amount?: string;
  currency?: "USD" | "COINS" | "CUSDT";
  virtualValue?: 0;
  isCredit?: "true" | "false";
  reference?: string;
  paymentMethod?: string;
  remark?: string;
  description?: string;
  productId?: string;
  productName?: string;
  sku?: string;
  payerId?: string;
  payerName?: string;
  payeeId?: string;
  payeeName?: string;
  onBehalfOfId?: string;
  onBehalfOfName?: string;
  additionalData?: string;
  baseTransaction?: string;
}

const Simulator = (props: ISimulatorProps) => {
  const [data, setData] = useState<any>();
  console.log("REACHED");

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    const body = { data };
    const fetchBalance = await axios.post(
      `${API_HOST}/tenant/${props.credentials.application_id}/execute-currency-transaction-simulate`,
      {
        body,
      }
    );
    console.log(fetchBalance);
  };

  return (
    <>
      <h1>Transaction Stimulator</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul className="formStyle">
          <div>
            <li>
              <label>Transaction Type:</label>
              <input
                value={props.transactionType}
                {...register("transactionType")}
              />
            </li>
            <li>
              <label>Amount : </label>
              <input value={props.amount} {...register("amount")} />
            </li>
            <li>
              <label>Currency :</label>
              <input value={props.currency} {...register("currency")} />
            </li>
            <li>
              <label>Virtual Value :</label>
              <input
                value={props.virtualValue}
                {...register("virtual_Value")}
              />
            </li>
            <li>
              <label>Is Credit :</label>
              <input value={props.isCredit} {...register("isCredit")} />
            </li>
            <li>
              <label>Reference :</label>
              <input value={props.reference} {...register("reference")} />
            </li>
            <li>
              <label>Payment Method :</label>
              <input
                value={props.paymentMethod}
                {...register("paymentMethod")}
              />
            </li>

            <li>
              <label>SKU :</label>
              <input value={props.sku} {...register("sku")} />
            </li>
            <li>
              <label>Remark:</label>
              <input value={props.remark} {...register("remark")} />
            </li>
            <li>
              <label>Description :</label>
              <input value={props.description} {...register("description")} />
            </li>
          </div>
          <div>
            <li>
              <label>Product Id :</label>
              <input value={props.productId} {...register("productId")} />
            </li>
            <li>
              <label>Product Name :</label>
              <input value={props.productName} {...register("productName")} />
            </li>

            <li>
              <label>Payer Id :</label>
              <input value={props.payerId} {...register("payerId")} />
            </li>
            <li>
              <label>Payer Name :</label>
              <input value={props.payerName} {...register("payerName")} />
            </li>
            <li>
              <label>Payee Id :</label>
              <input value={props.payeeId} {...register("payeeId")} />
            </li>
            <li>
              <label>payeeName :</label>
              <input value={props.payeeName} {...register("payeeName")} />
            </li>
            <li>
              <label>On Behalf Of Id :</label>
              <input value={props.onBehalfOfId} {...register("onBehalfOfId")} />
            </li>
            <li>
              <label>onBehalfOfName :</label>
              <input
                value={props.onBehalfOfName}
                {...register("onBehalfOfName")}
              />
            </li>
            <li>
              <label>Additional Data :</label>
              <input
                value={props.additionalData}
                {...register("additionalData")}
              />
            </li>
            <li>
              <label>Base Transaction :</label>
              <input
                value={props.baseTransaction}
                {...register("baseTransaction")}
              />
            </li>
          </div>
        </ul>
        <div className="formStyle">
          <input type="submit" />
        </div>
      </form>

      {data}
    </>
  );
};
export default Simulator;
