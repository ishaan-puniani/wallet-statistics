import axios from "axios";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
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
  achievementIdentifier?: string;
  achievements?: JSON;
}

const Stimulator = (props: IStimulatorProps) => {
  console.log("REACHED");
  const [view, setView] = useState(false);
  const [record, setRecord] = useState<any>({});
  const [step, setStep] = useState(1);
  const form = useForm();

  const onSubmit = async (data: any) => {
    // eslint-disable-next-line no-debugger
    debugger;
    const record = {
      ...data,
      achievements: [
        {
          achieverId: data.achieverId,
          action: data.action,
          value: data.value || 0,
        },
      ],
    };
    try {
      const fetchBalance = await axios.post(
        `${API_HOST}/tenant/${props.credentials.application_id}/simulate-currency-transaction`,
        {
          data: record,
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
    const record = {
      ...data,
      achievements: [
        {
          achieverId: data.achieverId,
          action: data.action,
          value: data.value || 0,
        },
      ],
    };
    try {
      const response = await axios.post(
        `${API_HOST}/tenant/${props.credentials.application_id}/execute-currency-transaction`,
        {
          data: record,
          ...props.credentials,
        }
      );
      if (response.status === 200) {
        alert("Transaction Excuted Successfully");
      }
      // setRecord(response.data);
      // setView(!view);
    } catch (err: any) {
      console.log(err?.response?.data);
      alert(err?.response?.data);
    }
  };

  const nextStep = () => {
    form.trigger();
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const {
    transactionType,
    amount,
    currency,
    isCredit,
    reference,
    payerId,
    service,
    provider,
    vendor,
    fromWallet,
  } = form.watch();

  const handleDisable = () => {
    switch (step) {
      case 1:
        return transactionType && amount && currency && isCredit;
      case 2:
        return reference;
      case 3:
        return payerId;
      case 4:
        return service && provider && vendor;
      case 5:
        return fromWallet;
      case 6:
        return true;
      default:
        return false;
    }
  };

  return (
    <>
      <StimulatorWrapper>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <h1>Transaction Simulator</h1>
            {!view && (
              <div className="flex_container">
                <div className="steps_list">
                  <ul>
                    <li className={`${step === 1 ? "activeStep" : ""}`}>
                      {" "}
                      Basic Transaction Info
                    </li>
                    <li className={`${step === 2 ? "activeStep" : ""}`}>
                      {" "}
                      Transaction Details
                    </li>
                    <li className={`${step === 3 ? "activeStep" : ""}`}>
                      Payer and Payee Information
                    </li>
                    <li className={`${step === 4 ? "activeStep" : ""}`}>
                      Service Provide Info
                    </li>
                    <li className={`${step === 5 ? "activeStep" : ""}`}>
                      Commission and Metadata
                    </li>
                    <li className={`${step === 6 ? "activeStep" : ""}`}>
                      Achievement Rewards
                    </li>
                  </ul>
                </div>
                <div className="container">
                  <div className="formStyle">
                    {step === 1 && (
                      <>
                        <li>
                          <label>
                            Transaction Type{" "}
                            <sup className="requiredStar">*</sup> :
                          </label>
                          <input
                            name="transactionType"
                            value={props.transactionType}
                            {...form.register("transactionType", {
                              required: true,
                            })}
                          />
                        </li>
                        <li>
                          <label>
                            Amount <sup className="requiredStar">*</sup> :
                          </label>
                          <input
                            name="amount"
                            value={props.amount}
                            {...form.register("amount")}
                            required
                          />
                        </li>
                        <li>
                          <label>
                            Currency <sup className="requiredStar">*</sup> :
                          </label>
                          <input
                            name="currency"
                            value={props.currency}
                            {...form.register("currency")}
                            required
                          />
                        </li>
                        <li>
                          <label>Virtual Value :</label>
                          <input
                            value={props.virtualValue}
                            {...form.register("virtualValue")}
                          />
                        </li>
                        <li>
                          <label>
                            Is Credit <sup className="requiredStar">*</sup> :
                          </label>
                          <input
                            value={props.isCredit}
                            {...form.register("isCredit")}
                            required
                          />
                        </li>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <li>
                          <label>
                            Reference <sup className="requiredStar">*</sup> :
                          </label>
                          <input
                            value={props.reference}
                            {...form.register("reference")}
                            required
                          />
                        </li>
                        <li>
                          <label>Payment Method :</label>
                          <input
                            value={props.paymentMethod}
                            {...form.register("paymentMethod")}
                          />
                        </li>

                        <li>
                          <label>SKU :</label>
                          <input value={props.sku} {...form.register("sku")} />
                        </li>
                        <li>
                          <label>Remark:</label>
                          <input
                            value={props.remark}
                            {...form.register("remark")}
                          />
                        </li>
                        <li>
                          <label>Description :</label>
                          <input
                            value={props.description}
                            {...form.register("description")}
                          />
                        </li>
                        <li>
                          <label>Product Id :</label>
                          <input
                            value={props.productId}
                            {...form.register("productId")}
                          />
                        </li>
                        <li>
                          <label>Product Name :</label>
                          <input
                            value={props.productName}
                            {...form.register("productName")}
                          />
                        </li>
                      </>
                    )}
                    {step === 3 && (
                      <>
                        <li>
                          <label>
                            Payer Id <sup className="requiredStar">*</sup> :
                          </label>
                          <input
                            value={props.payerId}
                            {...form.register("payerId")}
                            required
                          />
                        </li>
                        <li>
                          <label>Payer Name :</label>
                          <input
                            value={props.payerName}
                            {...form.register("payerName")}
                          />
                        </li>

                        <li>
                          <label>
                            Payee Id <sup className="requiredStar">*</sup> :
                          </label>
                          <input
                            value={props.payeeId}
                            {...form.register("payeeId")}
                          />
                        </li>
                        <li>
                          <label>Payee Name :</label>
                          <input
                            value={props.payeeName}
                            {...form.register("payeeName")}
                          />
                        </li>
                        <li>
                          <label>On Behalf Of Id :</label>
                          <input
                            value={props.onBehalfOfId}
                            {...form.register("onBehalfOfId")}
                          />
                        </li>
                        <li>
                          <label>On Behalf Of Name :</label>
                          <input
                            value={props.onBehalfOfName}
                            {...form.register("onBehalfOfName")}
                          />
                        </li>
                      </>
                    )}
                    {step === 4 && (
                      <>
                        <li>
                          <label>Additional Data :</label>
                          <input
                            value={props.additionalData}
                            {...form.register("additionalData")}
                          />
                        </li>
                        <li>
                          <label>Base Transaction :</label>
                          <input
                            value={props.baseTransaction}
                            {...form.register("baseTransaction")}
                          />
                        </li>

                        <li>
                          <label>
                            Service <sup className="requiredStar">*</sup> :
                          </label>
                          <input
                            value={props.service}
                            {...form.register("service")}
                            required
                          />
                        </li>

                        <li>
                          <label>
                            Provider <sup className="requiredStar">*</sup> :
                          </label>
                          <input
                            value={props.provider}
                            {...form.register("provider")}
                            required
                          />
                        </li>
                        <li>
                          <label>
                            Vendor <sup className="requiredStar">*</sup> :
                          </label>
                          <input
                            value={props.vendor}
                            {...form.register("vendor")}
                            required
                          />
                        </li>
                      </>
                    )}
                    {step === 5 && (
                      <>
                        <li>
                          <label>Execute Commission For:</label>
                          <input
                            value={props.executeCommissionFor}
                            {...form.register("executeCommissionFor")}
                          />
                        </li>
                        <li>
                          <label>Execute Commission Amount:</label>
                          <input
                            value={props.executeCommissionAmount}
                            {...form.register("executeCommissionAmount")}
                          />
                        </li>
                        <li>
                          <label>Metadata :</label>
                          <input
                            value={props.metadata}
                            {...form.register("metadata")}
                          />
                        </li>

                        <li>
                          <label>
                            From Wallet <sup className="requiredStar">*</sup> :
                          </label>
                          <input
                            value={props.fromWallet}
                            {...form.register("fromWallet")}
                            required
                          />
                        </li>
                      </>
                    )}
                    {step === 6 && (
                      <>
                        <li>
                          <label>Achiever Id :</label>
                          <input
                            value={props.achieverId}
                            {...form.register("achieverId")}
                          />
                        </li>
                        <li>
                          <label>Achievement Identifier :</label>
                          <input
                            value={props.action}
                            {...form.register("action")}
                          />
                        </li>
                        <li>
                          <label>Value :</label>
                          <input
                            value={props.value}
                            {...form.register("value")}
                          />
                        </li>
                      </>
                    )}
                  </div>
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
                    <th>Achievements </th>
                  </tr>
                  {record.map((transaction: any) => (
                    <tr>
                      <td>
                        <p>
                          {transaction?.isCredit
                            ? transaction?.payeeId
                            : transaction?.payerId}
                        </p>
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
                      <td>
                        {transaction.achievements.map((achievement: any) => (
                          <div key={achievement.id}>
                            <span>
                              Achievement - {achievement.achievementIdentifier}
                            </span>
                            <br />
                            <span>
                              Reward Type -{" "}
                              {
                                achievement.achievements.transactionRewardDetail
                                  ?.rewardType
                              }
                            </span>
                            <br />
                            {achievement.achievements.transactionRewardDetail
                              ?.couponType && (
                              <>
                                <span>
                                  Coupon Type -{" "}
                                  {
                                    achievement.achievements
                                      .transactionRewardDetail?.couponType
                                  }
                                </span>
                                <br />
                              </>
                            )}
                            <span>
                              Amount -{" "}
                              {
                                achievement.achievements.transactionRewardDetail
                                  .amount
                              }
                            </span>
                            <br />
                            <span>
                              Currency -{" "}
                              {
                                achievement.achievements.transactionRewardDetail
                                  .currency
                              }
                            </span>
                            <br />
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
            )}
            <div
              className=" formBtn"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "5px",
              }}
            >
              {!view && (
                <div className="formLayout">
                  {step > 1 && (
                    <button
                      className="submitBtn"
                      type="button"
                      onClick={prevStep}
                    >
                      Previous
                    </button>
                  )}
                  {step !== 6 && (
                    <button
                      className="submitBtn"
                      type="button"
                      disabled={!handleDisable()}
                      onClick={nextStep}
                    >
                      Next
                    </button>
                  )}{" "}
                  {step === 6 && (
                    <button
                      className="submitBtn"
                      type="submit"
                      disabled={!handleDisable()}
                    >
                      Simulate
                    </button>
                  )}
                </div>
              )}
              {view && (
                <div className="formLayout">
                  <button id="cancelBtn" onClick={() => setView(!view)}>
                    Change Stimulate
                  </button>
                  <button
                    className="submitBtn"
                    onClick={form.handleSubmit(handleDotransaction)}
                  >
                    Commit Transaction
                  </button>
                </div>
              )}
            </div>
          </form>
        </FormProvider>
      </StimulatorWrapper>
    </>
  );
};
export const StimulatorWrapper = styled.div`
  .formStyle {
    margin: 24px;
    height: 240px;
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
    height: 22px;
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

  button:disabled {
    background: grey;
    cursor: disabled;
  }
  button:disabled:hover {
    background: grey;
    cursor: disabled;
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
  .flex_container {
    display: flex;
    margin: 0px 24px;
  }
  .steps_list {
    padding: 10px 24px;
    border-right: 0.5px solid #cfc5cc;
    ul {
      padding: 0px;
    }
    li {
      list-style: none;
      padding: 10px 0px;
    }
  }
  .activeStep {
    // background: blue;
    color: #1677ff;
  }
`;
export default Stimulator;
