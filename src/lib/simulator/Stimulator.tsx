import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { API_HOST } from "../../constants";
import styled from "styled-components";
export interface IStimulatorProps {
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

const Stimulator = (props: IStimulatorProps) => {
  console.log("REACHED");
  const [view, setView] = useState(false);
  const [record, setRecord] = useState<any>({});
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const fetchBalance = await axios.post(
        `${API_HOST}/tenant/${props.credentials.application_id}/simulate-currency-transaction`,
        {
          data,
        }
      );

      setRecord(fetchBalance.data);
      setView(!view);
    } catch (err: any) {
      console.log(err?.response?.data);
      alert(err?.response?.data);
    }
  };
  const handleDotransaction = async (data: any) => {
    try {
      const response = await axios.post(
        `${API_HOST}/tenant/${props.credentials.application_id}/execute-currency-transaction`,
        {
          data,
        }
      );
      setRecord(response.data);
      setView(!view);
    } catch (err: any) {
      console.log(err?.response?.data);
      alert(err?.response?.data);
    }
  };
  return (
    <>
      <StimulatorWrapper>
        <h1>Transaction Simulator</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {!view && (
            <div className="container">
              <div className="formStyle">
                <li>
                  <label>
                    Transaction Type <sup className="requiredStar">*</sup> :
                  </label>
                  <input
                    value={props.transactionType}
                    {...register("transactionType")}
                    required
                  />
                </li>
                <li>
                  <label>
                    Amount <sup className="requiredStar">*</sup> :
                  </label>
                  <input
                    value={props.amount}
                    {...register("amount")}
                    required
                  />
                </li>
                <li>
                  <label>
                    Currency <sup className="requiredStar">*</sup> :
                  </label>
                  <input
                    value={props.currency}
                    {...register("currency")}
                    required
                  />
                </li>
                <li>
                  <label>Virtual Value :</label>
                  <input
                    value={props.virtualValue}
                    {...register("virtual_Value")}
                  />
                </li>
                <li>
                  <label>
                    Is Credit <sup className="requiredStar">*</sup> :
                  </label>
                  <input
                    value={props.isCredit}
                    {...register("isCredit")}
                    required
                  />
                </li>
                <li>
                  <label>
                    Reference <sup className="requiredStar">*</sup> :
                  </label>
                  <input
                    value={props.reference}
                    {...register("reference")}
                    required
                  />
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
                  <input
                    value={props.description}
                    {...register("description")}
                  />
                </li>
                <li>
                  <label>Product Id :</label>
                  <input value={props.productId} {...register("productId")} />
                </li>
                <li>
                  <label>Product Name :</label>
                  <input
                    value={props.productName}
                    {...register("productName")}
                  />
                </li>

                <li>
                  <label>
                    Payer Id <sup className="requiredStar">*</sup> :
                  </label>
                  <input
                    value={props.payerId}
                    {...register("payerId")}
                    required
                  />
                </li>
                <li>
                  <label>Payer Name :</label>
                  <input value={props.payerName} {...register("payerName")} />
                </li>
              </div>
              <div className="formStyle">
                <li>
                  <label>
                    Payee Id <sup className="requiredStar">*</sup> :
                  </label>
                  <input value={props.payeeId} {...register("payeeId")} />
                </li>
                <li>
                  <label>Payee Name :</label>
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
                  <label>On Behalf Of Name :</label>
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
                  <label>
                    Service <sup className="requiredStar">*</sup> :
                  </label>
                  <input
                    value={props.service}
                    {...register("service")}
                    required
                  />
                </li>

                <li>
                  <label>
                    Provider <sup className="requiredStar">*</sup> :
                  </label>
                  <input
                    value={props.provider}
                    {...register("provider")}
                    required
                  />
                </li>
                <li>
                  <label>
                    Vendor <sup className="requiredStar">*</sup> :
                  </label>
                  <input
                    value={props.vendor}
                    {...register("vendor")}
                    required
                  />
                </li>
                <li>
                  <label>Execute Commission For:</label>
                  <input
                    value={props.executeCommissionFor}
                    {...register("executeCommissionFor")}
                  />
                </li>
                <li>
                  <label>Execute Commission Amount:</label>
                  <input
                    value={props.executeCommissionAmount}
                    {...register("executeCommissionAmount")}
                  />
                </li>
                <li>
                  <label>Metadata :</label>
                  <input value={props.metadata} {...register("metadata")} />
                </li>

                <li>
                  <label>
                    From Wallet <sup className="requiredStar">*</sup> :
                  </label>
                  <input
                    value={props.fromWallet}
                    {...register("fromWallet")}
                    required
                  />
                </li>
              </div>
            </div>
          )}
          {view && (
            <div>
              <table>
                <tr>
                  <th>Partner Id</th>
                  <th>Is Credit</th>
                  <th>Transaction Type</th>
                  <th>Currency </th>
                  <th>Amount </th>
                </tr>
                {record.map((transaction: any) => (
                  <tr>
                    <td>
                      <p>{transaction?.payerId}</p>
                    </td>
                    <td>
                      <p>{transaction?.isCredit ? "true" : "false"}</p>
                    </td>
                    <td>
                      <p>{transaction?.transactionTypeIdentifier}</p>
                    </td>
                    <td>
                      <p>{transaction?.currency}</p>
                    </td>
                    <td>
                      <p>{transaction?.amount}</p>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          )}
          <div
            className="formStyle formBtn"
            style={{ display: "flex", justifyContent: "center", margin: "5px" }}
          >
            {!view && (
              <div className="formLayout">
                <button className="submitBtn" type="submit">
                  Simulate
                </button>
                <button
                  className="submitBtn"
                  onClick={handleSubmit(handleDotransaction)}
                >
                  Commit Transaction
                </button>
              </div>
            )}
            {view && (
              <button id="cancelBtn" onClick={() => setView(!view)}>
                Change Stimulate
              </button>
            )}
          </div>
        </form>
      </StimulatorWrapper>
    </>
  );
};
export const StimulatorWrapper = styled.div`
  .container {
    display: grid;
    grid-template-columns: auto auto;
    @media only screen and (max-width: 2560px) and (min-width: 1700px) {
      display: block;
    }
  }
  .formStyle {
    margin: 24px;
  }
  .formBtn {
    input {
      margin: 5px;
    }
    button {
      margin: 5px;
    }
  }
  .formLayout {
    display: flex;
  }
  .requiredStar,
  .formError {
    color: #ff0000;
  }
  .formStyle li {
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    width: auto;
    list-style: none;
    margin: 10px 0 0 0;
    @media only screen and (max-width: 2560px) and (min-width: 1700px) {
      width: 650px;
    }

    @media screen and (max-width: 1380px) {
      width: 540px;
    }
    @media screen and (max-width: 845px) {
      width: 315px;
      display: grid;
    }
    @media screen and (max-width: 425px) {
      width: 215px;
      display: grid;
    }
  }
  .formStyle li label {
    margin-right: 5px;
  }
  .formStyle li input {
    width: 330px;
    @media screen and (max-width: 845px) {
      width: 315px;
    }
    @media screen and (max-width: 425px) {
      width: 220px;
    }
  }
  .formStyle .achievement > li {
    width: 480px;
    @media screen and (max-width: 845px) {
      width: 275px;
    }
    @media screen and (max-width: 445px) {
      width: 180px;
    }
  }

  .submitBtn {
    width: 150px;
    color: #fff;
    background: #4691a4;
    padding: 8px 15px 8px 15px;
    border: none;
  }
  .submitBtn:hover {
    cursor: pointer;
    background: #4691a4;
    box-shadow: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
  }
  table,
  td,
  th {
    border: 1px solid black;
  }

  table {
    width: 70%;
  }

  td {
    text-align: center;
  }
`;
export default Stimulator;
