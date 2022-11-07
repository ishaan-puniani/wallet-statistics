import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./transaction_form.css";

export interface TransactionFormProps {
  credentials?: any;
  userId?: string;
  currency?: "COINS" | "USD";
}

const TransactionForm = (props: TransactionFormProps) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <h2>Transaction Form</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <table>
            <tbody>
              <tr>
                <td>
                  <label>Transaction Type : </label>
                </td>
                <td>
                  <input className="field" {...register("transaction_type")} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Amount : </label>
                </td>
                <td>
                  <input className="field" {...register("amount")} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Currency : </label>
                </td>
                <td>
                  <input className="field" {...register("currency")} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Virtual Value : </label>
                </td>
                <td>
                  <input className="field" {...register("virtual_value")} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Is Credit : </label>
                </td>
                <td>
                  <input
                    className="field"
                    type="radio"
                    id="isCredit"
                    {...register("isCredit")}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Reference : </label>
                </td>
                <td>
                  <input className="field" {...register("reference")} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Payment Method : </label>
                </td>
                <td>
                  <input className="field" {...register("payment_method")} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Remark : </label>
                </td>
                <td>
                  <input className="field" {...register("remark")} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Description : </label>
                </td>
                <td>
                  <input className="field" {...register("description")} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Product Id : </label>
                </td>
                <td>
                  <input className="field" {...register("productId")} />
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                <td>
                  <label>Product Name : </label>
                </td>
                <td>
                  <input className="field" {...register("productName")} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>SKU : </label>
                </td>
                <td>
                  <input className="field" {...register("sku")} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Payer Id : </label>
                </td>
                <td>
                  <input className="field" {...register("payerId")} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Payer Name : </label>
                </td>
                <td>
                  <input className="field" {...register("payerName")} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Payee Id : </label>
                </td>
                <td>
                  <input className="field" {...register("payeeId")} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Payee Name : </label>
                </td>
                <td>
                  <input className="field" {...register("payeeName")} />
                </td>
              </tr>
              <tr>
                <td>
                  <label> On Behalf Of Id : </label>
                </td>
                <td>
                  <input className="field" {...register("onBehalfOfId")} />
                </td>
              </tr>
              <tr>
                <td>
                  <label> On Behalf Of Name : </label>
                </td>
                <td>
                  <input className="field" {...register("onBehalfOfName")} />
                </td>
              </tr>
              <tr>
                <td>
                  <label> Additional Data : </label>
                </td>
                <td>
                  <input className="field" {...register("additionalData")} />
                </td>
              </tr>
              <tr>
                <td>
                  <label> Base Transaction : </label>
                </td>
                <td>
                  <input className="field" {...register("baseTransaction")} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <input className="btn" type="submit" />
      </form>
    </>
  );
};
export default TransactionForm;
