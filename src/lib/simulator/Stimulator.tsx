import axios from "axios";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { API_HOST } from "../../constants";
import styled from "styled-components";

export interface IStimulatorProps {
  credentials?: any;
  tabsToShow?: [1, 3, 6];
  fieldsToShow?: ["transactionType", "amount"];
  defaultAction?: "COMMIT_TRANSACTION" | "SIMULATE";
  defaultValues?: Record<string, any>;
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

    const currentIndex = props.tabsToShow?.indexOf(step as any) ?? -1;
    const nextIndex = currentIndex + 1;

    if (nextIndex < (props.tabsToShow?.length ?? 0)) {
      const nextStep = props.tabsToShow[nextIndex];
      setStep(nextStep);
    }
  };
  const prevStep = () => {
    form.trigger();
    const currentIndex = props.tabsToShow?.indexOf(step as any) ?? -1;
    const prevIndex = currentIndex - 1;

    if (prevIndex >= 0) {
      const prevStep = props.tabsToShow[prevIndex];
      setStep(prevStep);
    }
  };

  const { transactionType, amount, currency, isCredit, payerId, fromWallet } =
    form.watch();

  const handleDisable = () => {
    switch (step) {
      case 1:
        return transactionType && amount && currency && isCredit;
      case 2:
        return true;
      case 3:
        return payerId && fromWallet;
      case 4:
        return true;
      case 5:
        return true;
      case 6:
        return true;
      default:
        return false;
    }
  };

  const isFieldVisible = (field: any) => {
    if (props.fieldsToShow?.length) {
      return props.fieldsToShow.includes(field);
    } else {
      return true;
    }
  };
  const isStepVisible = (stepIndex: any) => {
    if (props.tabsToShow?.length) {
      return props.tabsToShow.includes(stepIndex);
    }
    return true; // Show step if tabsToShow is empty or not defined
  };

  const handleStep = (step: React.SetStateAction<number>) => {
    setStep(step);
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
                    {isStepVisible(1) && (
                      <li
                        onClick={() => handleStep(1)}
                        className={`${step === 1 ? "activeStep" : ""}`}
                      >
                        Basic Transaction Info
                      </li>
                    )}
                    {isStepVisible(2) && (
                      <li
                        onClick={() => handleStep(2)}
                        className={`${step === 2 ? "activeStep" : ""}`}
                      >
                        Transaction Details
                      </li>
                    )}
                    {isStepVisible(3) && (
                      <li
                        onClick={() => handleStep(3)}
                        className={`${step === 3 ? "activeStep" : ""}`}
                      >
                        Payer and Payee Information
                      </li>
                    )}
                    {isStepVisible(4) && (
                      <li
                        onClick={() => handleStep(4)}
                        className={`${step === 4 ? "activeStep" : ""}`}
                      >
                        Service Provider Info
                      </li>
                    )}
                    {isStepVisible(5) && (
                      <li
                        onClick={() => handleStep(5)}
                        className={`${step === 5 ? "activeStep" : ""}`}
                      >
                        Commission and Metadata
                      </li>
                    )}
                    {isStepVisible(6) && (
                      <li
                        onClick={() => handleStep(6)}
                        className={`${step === 6 ? "activeStep" : ""}`}
                      >
                        Achievement Rewards
                      </li>
                    )}
                  </ul>
                </div>
                <div className="container">
                  <div className="formStyle">
                    {step === 1 && (
                      <>
                        {isFieldVisible("transactionType") && (
                          <li>
                            <label>
                              Transaction Type{" "}
                              <sup className="requiredStar">*</sup> :
                            </label>
                            <input
                              name="transactionType"
                              value={props.defaultValues?.transactionType}
                              {...form.register("transactionType", {
                                required: true,
                              })}
                            />
                          </li>
                        )}
                        {isFieldVisible("amount") && (
                          <li>
                            <label>
                              Amount <sup className="requiredStar">*</sup> :
                            </label>
                            <input
                              name="amount"
                              value={props.defaultValues?.amount}
                              {...form.register("amount")}
                              required
                            />
                          </li>
                        )}
                        {isFieldVisible("currency") && (
                          <li>
                            <label>
                              Currency <sup className="requiredStar">*</sup> :
                            </label>
                            <input
                              name="currency"
                              value={props.defaultValues?.currency}
                              {...form.register("currency")}
                              required
                            />
                          </li>
                        )}
                        {isFieldVisible("virtualValue") && (
                          <li>
                            <label>Virtual Value :</label>
                            <input
                              value={props.defaultValues?.virtualValue}
                              {...form.register("virtualValue")}
                            />
                          </li>
                        )}
                        {isFieldVisible("isCredit") && (
                          <li>
                            <label>
                              Is Credit <sup className="requiredStar">*</sup> :
                            </label>
                            <input
                              value={props.defaultValues?.isCredit}
                              {...form.register("isCredit")}
                              required
                            />
                          </li>
                        )}
                        {isFieldVisible("reference") && (
                          <li>
                            <label>
                              Reference <sup className="requiredStar">*</sup> :
                            </label>
                            <input
                              value={props.defaultValues?.reference}
                              {...form.register("reference")}
                              required
                            />
                          </li>
                        )}
                      </>
                    )}

                    {step === 2 && (
                      <>
                        {isFieldVisible("paymentMethod") && (
                          <li>
                            <label>Payment Method :</label>
                            <input
                              value={props.defaultValues?.paymentMethod}
                              {...form.register("paymentMethod")}
                            />
                          </li>
                        )}
                        {isFieldVisible("sku") && (
                          <li>
                            <label>SKU :</label>
                            <input
                              value={props.defaultValues?.sku}
                              {...form.register("sku")}
                            />
                          </li>
                        )}
                        {isFieldVisible("remark") && (
                          <li>
                            <label>Remark:</label>
                            <input
                              value={props.defaultValues?.remark}
                              {...form.register("remark")}
                            />
                          </li>
                        )}
                        {isFieldVisible("description") && (
                          <li>
                            <label>Description :</label>
                            <input
                              value={props.defaultValues?.description}
                              {...form.register("description")}
                            />
                          </li>
                        )}
                        {isFieldVisible("productId") && (
                          <li>
                            <label>Product Id :</label>
                            <input
                              value={props.defaultValues?.productId}
                              {...form.register("productId")}
                            />
                          </li>
                        )}
                        {isFieldVisible("productName") && (
                          <li>
                            <label>Product Name :</label>
                            <input
                              value={props.defaultValues?.productName}
                              {...form.register("productName")}
                            />
                          </li>
                        )}
                      </>
                    )}
                    {step === 3 && (
                      <>
                        {isFieldVisible("payerId") && (
                          <li>
                            <label>
                              Payer Id <sup className="requiredStar">*</sup> :
                            </label>
                            <input
                              value={props.defaultValues?.payerId}
                              {...form.register("payerId")}
                              required
                            />
                          </li>
                        )}

                        {isFieldVisible("payeeId") && (
                          <li>
                            <label>
                              Payee Id <sup className="requiredStar">*</sup> :
                            </label>
                            <input
                              value={props.defaultValues?.payeeId}
                              {...form.register("payeeId")}
                            />
                          </li>
                        )}
                        {isFieldVisible("service") && (
                          <li>
                            <label>Service :</label>
                            <input
                              value={props.defaultValues?.service}
                              {...form.register("service")}
                              required
                            />
                          </li>
                        )}
                        {isFieldVisible("provider") && (
                          <li>
                            <label>Provider :</label>
                            <input
                              value={props.defaultValues?.provider}
                              {...form.register("provider")}
                              required
                            />
                          </li>
                        )}
                        {isFieldVisible("vendor") && (
                          <li>
                            <label>Vendor :</label>
                            <input
                              value={props.defaultValues?.vendor}
                              {...form.register("vendor")}
                              required
                            />
                          </li>
                        )}
                        {isFieldVisible("fromWallet") && (
                          <li>
                            <label>
                              From Wallet <sup className="requiredStar">*</sup>{" "}
                              :
                            </label>
                            <input
                              value={props.defaultValues?.fromWallet}
                              {...form.register("fromWallet")}
                              required
                            />
                          </li>
                        )}
                      </>
                    )}
                    {step === 4 && (
                      <>
                        {isFieldVisible("payerName") && (
                          <li>
                            <label>Payer Name :</label>
                            <input
                              value={props.defaultValues?.payerName}
                              {...form.register("payerName")}
                            />
                          </li>
                        )}
                        {isFieldVisible("payeeName") && (
                          <li>
                            <label>Payee Name :</label>
                            <input
                              value={props.defaultValues?.payeeName}
                              {...form.register("payeeName")}
                            />
                          </li>
                        )}
                        {isFieldVisible("onBehalfOfId") && (
                          <li>
                            <label>On Behalf Of Id :</label>
                            <input
                              value={props.defaultValues?.onBehalfOfId}
                              {...form.register("onBehalfOfId")}
                            />
                          </li>
                        )}
                        {isFieldVisible("onBehalfOfName") && (
                          <li>
                            <label>On Behalf Of Name :</label>
                            <input
                              value={props.defaultValues?.onBehalfOfName}
                              {...form.register("onBehalfOfName")}
                            />
                          </li>
                        )}
                        {isFieldVisible("additionalData") && (
                          <li>
                            <label>Additional Data :</label>
                            <input
                              value={props.defaultValues?.additionalData}
                              {...form.register("additionalData")}
                            />
                          </li>
                        )}
                        {isFieldVisible("baseTransaction") && (
                          <li>
                            <label>Base Transaction :</label>
                            <input
                              value={props.defaultValues?.baseTransaction}
                              {...form.register("baseTransaction")}
                            />
                          </li>
                        )}
                      </>
                    )}
                    {step === 5 && (
                      <>
                        {isFieldVisible("executeCommissionFor") && (
                          <li>
                            <label>Execute Commission For:</label>
                            <input
                              value={props.defaultValues?.executeCommissionFor}
                              {...form.register("executeCommissionFor")}
                            />
                          </li>
                        )}
                        {isFieldVisible("executeCommissionAmount") && (
                          <li>
                            <label>Execute Commission Amount:</label>
                            <input
                              value={
                                props.defaultValues?.executeCommissionAmount
                              }
                              {...form.register("executeCommissionAmount")}
                            />
                          </li>
                        )}
                        {isFieldVisible("executeCommissionAmount") && (
                          <li>
                            <label>Metadata :</label>
                            <input
                              value={props.defaultValues?.metadata}
                              {...form.register("metadata")}
                            />
                          </li>
                        )}
                      </>
                    )}
                    {step === 6 && (
                      <>
                        {isFieldVisible("achieverId") && (
                          <li>
                            <label>Achiever Id :</label>
                            <input
                              value={props.defaultValues?.achieverId}
                              {...form.register("achieverId")}
                            />
                          </li>
                        )}
                        {isFieldVisible("action") && (
                          <li>
                            <label>Achievement Identifier :</label>
                            <input
                              value={props.defaultValues?.action}
                              {...form.register("action")}
                            />
                          </li>
                        )}
                        {isFieldVisible("value") && (
                          <li>
                            <label>Value :</label>
                            <input
                              value={props.defaultValues?.value}
                              {...form.register("value")}
                            />
                          </li>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
            {view && (
              <>
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
                      </tr>
                    ))}
                  </table>
                </div>
                {record && record[0]?.achievements?.length > 0 && (
                  <>
                    <h1 className="rewardtitle">Achievement Rewards</h1>
                    <table>
                      <tr>
                        <th>Achievement</th>
                        <th>Reward Type</th>
                        <th>Coupon Type</th>
                        <th>Currency</th>
                        <th>Amount</th>
                        <th>End Date</th>
                      </tr>
                      {record[0].achievements.map((transaction: any) => (
                        <tr>
                          <td>
                            <p>{transaction.achievementIdentifier}</p>
                          </td>
                          <td>
                            <p>
                              {
                                transaction.achievements.transactionRewardDetail
                                  ?.rewardType
                              }
                            </p>
                          </td>
                          <td>
                            <p>
                              {" "}
                              {
                                transaction.achievements.transactionRewardDetail
                                  ?.couponType
                              }
                            </p>
                          </td>
                          <td>
                            <p>
                              {
                                transaction?.achievements
                                  .transactionRewardDetail.currency
                              }
                            </p>
                          </td>
                          <td>
                            <p>
                              {
                                transaction?.achievements
                                  .transactionRewardDetail.amount
                              }
                            </p>
                          </td>
                          <td>
                            <p>
                              {
                                transaction.achievements.transactionRewardDetail
                                  ?.endDate
                              }
                            </p>
                          </td>
                        </tr>
                      ))}
                    </table>
                  </>
                )}
              </>
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
  .rewardtitle {
    margin-top: 10px;
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
      cursor: pointer;
    }
  }
  .activeStep {
    // background: blue;

    color: #1677ff;
  }
`;
export default Stimulator;
