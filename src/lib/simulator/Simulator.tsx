import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { API_HOST } from "../../constants";
import styled from "styled-components";
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
  service?: string;
  provider?: string;
  vendor?: string;
  executeCommissionFor?: string;
  executeCommissionAmount?: string;
  metadata?: string;
  fromWallet?: string;
  achieverId?: string;
  action?: string;
  value?: number;
}

const Simulator = (props: ISimulatorProps) => {
  console.log("REACHED");

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    // debugger;
    const fetchBalance = await axios.post(
      `${API_HOST}/tenant/${props.credentials.application_id}/simulate-currency-transaction`,
      {
        data,
      }
    );
    console.log(fetchBalance);
  };

  return (
    <>
      <SimulatorWrapper>
        <h1>Transaction Stimulator</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <div className="formStyle">
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
            </div>
            <div className="formStyle">
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
                <input
                  value={props.onBehalfOfId}
                  {...register("onBehalfOfId")}
                />
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

              <li>
                <label>service :</label>
                <input value={props.service} {...register("service")} />
              </li>

              <li>
                <label>provider :</label>
                <input value={props.provider} {...register("provider")} />
              </li>
              <li>
                <label>vendor :</label>
                <input value={props.vendor} {...register("vendor")} />
              </li>
              <li>
                <label>executeCommissionFor :</label>
                <input
                  value={props.executeCommissionFor}
                  {...register("executeCommissionFor")}
                />
              </li>
              <li>
                <label>executeCommissionAmount :</label>
                <input
                  value={props.executeCommissionAmount}
                  {...register("executeCommissionAmount")}
                />
              </li>
              <li>
                <label>metadata :</label>
                <input value={props.metadata} {...register("metadata")} />
              </li>

              <li>
                <label>fromWallet :</label>
                <input value={props.fromWallet} {...register("fromWallet")} />
              </li>
            </div>
          </div>
          {/* <ul className="formStyle">
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
          </ul>
          <ul className="formStyle">
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
                <input
                  value={props.onBehalfOfId}
                  {...register("onBehalfOfId")}
                />
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

              <li>
                <label>service :</label>
                <input value={props.service} {...register("service")} />
              </li>

              <li>
                <label>provider :</label>
                <input value={props.provider} {...register("provider")} />
              </li>
              <li>
                <label>vendor :</label>
                <input value={props.vendor} {...register("vendor")} />
              </li>
              <li>
                <label>executeCommissionFor :</label>
                <input
                  value={props.executeCommissionFor}
                  {...register("executeCommissionFor")}
                />
              </li>
              <li>
                <label>executeCommissionAmount :</label>
                <input
                  value={props.executeCommissionAmount}
                  {...register("executeCommissionAmount")}
                />
              </li>
              <li>
                <label>metadata :</label>
                <input value={props.metadata} {...register("metadata")} />
              </li>

              <li>
                <label>fromWallet :</label>
                <input value={props.fromWallet} {...register("fromWallet")} />
              </li>
            </div>
          </ul> */}

          <div className="formStyle">
            <input type="submit" />
          </div>
        </form>
      </SimulatorWrapper>
    </>
  );
};
export const SimulatorWrapper = styled.div`
  .container {
    display: grid;
    grid-template-columns: auto auto;
    @media screen and (max-width: 1024px) {
      display: block;
    }
  }
  .formStyle {
    margin: 24px;
  }

  .formStyle li {
    padding: 0;
    display: flex;
    justify-content: right;
    width: auto;
    list-style: none;
    margin: 10px 0 0 0;
    @media screen and (max-width: 1024px) {
      width: 620px;
    }
    @media screen and (max-width: 768px) {
      width: 260px;
      display: grid;
    }
  }

  .formStyle li input {
    width: 400px;
    @media screen and (max-width: 768px){
      width: 245px;
    }
  }

  .formStyle input[type="submit"] {
    margin: 10px 40px;
    background: #4691a4;
    padding: 8px 15px 8px 15px;
    border: none;
  }
  .formStyle input[type="submit"]:hover {
    cursor: pointer;
    background: #4691a4;
    box-shadow: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
  }
`;
export default Simulator;
