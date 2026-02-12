import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { API_HOST } from "../../constants";
import styled from "styled-components";
import { Highlight } from "prism-react-renderer";

export interface IStimulatorProps {
  credentials?: any;
  tabsToShow?: number[];
  fieldsToHide?: string[];
  fieldsToDisable?: string[];
  defaultAction?: "COMMIT_TRANSACTION" | "SIMULATE";
  showApiSnippets?: false;
  defaultValues?: Record<string, any>;
  __token: string;
  setIsTransactionExecuted: React.Dispatch<React.SetStateAction<boolean>>;
  isDuplicate?: boolean;
}

const IS_CREDIT_LIST = [
  { id: "true", label: "Add to Wallet" },
  { id: "false", label: "Debit from Wallet" },
];

const CODE_SNIPPET_OPTIONS = [
  { id: "curl", label: "cURL" },
  { id: "axios", label: "Axios" },
  { id: "fetch", label: "Fetch" },
  { id: "python", label: "Python" },
  { id: "java", label: "Java/Android" },
  { id: "dart", label: "Dart/Flutter" },
  { id: "go", label: "Go" },
  { id: "php", label: "Php" },
  { id: "swift", label: "Swift" },
];

const Stimulator = (props: IStimulatorProps) => {
  console.log("REACHED");
  const [view, setView] = useState(false);
  const [record, setRecord] = useState<any>({});
  const [payload, setPayload] = useState<any>({});
  const [snippet, setSnippet] = useState<any>({});
  const [step, setStep] = useState<any>(1);
  const [executionType, setExecutionType] = useState<any>(
    props.defaultAction || "SIMULATE",
  );
  const form = useForm({
    defaultValues: props.defaultValues || {},
    shouldUnregister: false,
  });
  const [transactionTypes, setTransactionTypes] = useState<any>();
  const [currencyList, setCurrencyList] = useState<any>();

  const [selected, setSelected] = useState("curl");

  const copyToClipboard = (e: any) => {
    e.preventDefault();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(snippet[selected]);
    } else {
      console.warn("Clipboard API not available");
    }
  };

  const {
    credentials,
    tabsToShow,
    fieldsToHide,
    fieldsToDisable,
    defaultAction,
    showApiSnippets,
    setIsTransactionExecuted,
    isDuplicate = false,
  } = props;

  const { application_id, __token } = credentials;
  const fetchTypes = useCallback(async () => {
    try {
      // need to move this api in common area
      const types = await axios.get(
        `${
          credentials.API_HOST || API_HOST
        }/tenant/${application_id}/transaction-type/autocomplete`,
        {
          headers: {
            Authorization: `Bearer ${__token}`,
          },
        },
      );

      setTransactionTypes(types.data);
    } catch (err: any) {
      console.log(err?.response?.data);
      alert(err?.response?.data);
    }
  }, []);

  const fetchCurrencies = useCallback(async () => {
    try {
      // need to move this api in common area
      const types = await axios.get(
        `${
          credentials.API_HOST || API_HOST
        }/tenant/${application_id}/currency/autocomplete`,
        {
          headers: {
            Authorization: `Bearer ${__token}`,
          },
        },
      );

      setCurrencyList(types.data);
    } catch (err: any) {
      console.log(err?.response?.data);
      alert(err?.response?.data);
    }
  }, []);

  useEffect(() => {
    fetchTypes();
    fetchCurrencies();
  }, []);

  useEffect(() => {
    if (!props.defaultValues) return;
    if (transactionTypes && props.defaultValues.transactionType) {
      form.setValue("transactionType", props.defaultValues.transactionType);
    }
    if (currencyList && props.defaultValues.currency) {
      form.setValue("currency", props.defaultValues.currency);
    }
    if (props.defaultValues?.isCredit !== undefined) {
      form.setValue("isCredit", String(props.defaultValues.isCredit));
    }
  }, [transactionTypes, currencyList, props.defaultValues, form]);

  const buildSnippet = (
    lang: string,
    payloadObj: any,
    url: string,
    token: string,
  ) => {
    switch (lang) {
      case "curl":
        return `curl -X POST "${url}" \
  -H "Authorization: Bearer ${token}" \
  -H "Content-Type: application/json" \
  -d '${JSON.stringify(payloadObj)}'`;
      case "axios":
        return `await axios.post("${url}", ${JSON.stringify(
          payloadObj,
        )}, { headers:{ Authorization:"Bearer ${token}", "Content-Type":"application/json"} });`;
      case "fetch":
        return `fetch("${url}", {method:"POST", headers:{Authorization:"Bearer ${token}","Content-Type":"application/json"}, body:${JSON.stringify(
          payloadObj,
        )}}).then(r=>r.json()).then(console.log);`;
      case "python":
        return `import requests
headers={"Authorization":"Bearer ${token}","Content-Type":"application/json"}
r=requests.post("${url}", json=${JSON.stringify(payloadObj)}, headers=headers)
print(r.json())`;
      case "java":
        return `OkHttpClient client=new OkHttpClient();
RequestBody body=RequestBody.create(MediaType.parse("application/json"), ${JSON.stringify(
          payloadObj,
        )});
Request request=new Request.Builder().url("${url}")
  .post(body).header("Authorization","Bearer ${token}")
  .header("Content-Type","application/json").build();`;
      case "dart":
        return `var r=await http.post(Uri.parse("${url}"),
 headers:{"Authorization":"Bearer ${token}","Content-Type":"application/json"},
 body:jsonEncode(${JSON.stringify(payloadObj)}));`;
      case "go":
        return `req,_:=http.NewRequest("POST","${url}", bytes.NewBuffer([]byte(${JSON.stringify(
          JSON.stringify(payloadObj),
        )})))
req.Header.Set("Authorization","Bearer ${token}")
req.Header.Set("Content-Type","application/json")`;
      case "php":
        return `<?php $ch=curl_init("${url}");
curl_setopt_array($ch,[CURLOPT_POST=>1,CURLOPT_HTTPHEADER=>["Authorization: Bearer ${token}","Content-Type: application/json"],CURLOPT_POSTFIELDS=>${JSON.stringify(
          payloadObj,
        )}]); $r=curl_exec($ch); curl_close($ch);`;
      case "swift":
        return `var req=URLRequest(url: URL(string:"${url}")!)
req.httpMethod="POST"
req.setValue("Bearer ${token}", forHTTPHeaderField:"Authorization")
req.setValue("application/json", forHTTPHeaderField:"Content-Type")
req.httpBody = try? JSONSerialization.data(withJSONObject:${JSON.stringify(
          payloadObj,
        )})`;
      default:
        return "";
    }
  };

  const handleSnippetChange = (val: string) => {
    setSelected(val);

    if (payload && Object.keys(payload).length) {
      const url =
        executionType === "SIMULATE"
          ? `${props.credentials.API_HOST || API_HOST}/tenant/${
              props.credentials.application_id
            }/simulate-currency-transaction`
          : `${props.credentials.API_HOST || API_HOST}/tenant/${
              props.credentials.application_id
            }/execute-currency-transaction`;
      setSnippet((prev: any) => ({
        ...prev,
        [val]: buildSnippet(val, payload, url, __token),
      }));
    }
  };

  const resolveParticipants = (data: any) => {
    const isCredit =
      data.isCredit === true ||
      data.isCredit === "true" ||
      data.isCredit === "True";

    const partnerId = data.payerId ?? props.defaultValues?.payerId ?? undefined;

    const tenantId =
      data.payeeId ?? props.defaultValues?.payeeId ?? application_id;

    if (isCredit && !isDuplicate) {
      return { payerId: tenantId, payeeId: partnerId, isCredit: true };
    }
    return { payerId: partnerId, payeeId: tenantId, isCredit: false };
  };

  const onSubmit = async (data: any) => {
    const { payerId, payeeId, isCredit } = resolveParticipants(data);
    const record = {
      ...data,
      isCredit,
      payerId: payerId,
      payeeId: payeeId,
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
        `${props.credentials.API_HOST || API_HOST}/tenant/${
          props.credentials.application_id
        }/simulate-currency-transaction`,
        {
          data: record,
        },
      );

      setRecord(fetchBalance.data);
      setView(!view);

      if (showApiSnippets) {
        const newPayload = { data: record };
        setPayload(newPayload);
        const url = `${props.credentials.API_HOST || API_HOST}/tenant/${
          props.credentials.application_id
        }/simulate-currency-transaction`;
        const all: any = {};
        CODE_SNIPPET_OPTIONS.forEach((opt) => {
          all[opt.id] = buildSnippet(opt.id, newPayload, url, __token);
        });
        setSnippet(all);
      }
    } catch (err: any) {
      console.log(err?.response?.data);
      alert(err?.response?.data);
    }
  };

  const handleDoTransaction = async (data: any) => {
    const { payerId, payeeId, isCredit } = resolveParticipants(data);

    const record = {
      ...data,
      isCredit,
      payerId: payerId,
      payeeId: payeeId,
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
        `${props.credentials.API_HOST || API_HOST}/tenant/${
          props.credentials.application_id
        }/execute-currency-transaction`,
        {
          data: record,
          ...props.credentials,
        },
      );
      if (response.status === 200) {
        if (setIsTransactionExecuted) {
          setIsTransactionExecuted(true);
          setView(false);
        } else {
          alert("Transaction Excuted Successfully");
        }
      }
      // setRecord(response.data);
      // setView(!view);

      if (showApiSnippets) {
        const newPayload = { data: record, ...props.credentials };
        setPayload(newPayload);
        const url = `${props.credentials.API_HOST || API_HOST}/tenant/${
          props.credentials.application_id
        }/execute-currency-transaction`;
        const all: any = {};
        CODE_SNIPPET_OPTIONS.forEach((opt) => {
          all[opt.id] = buildSnippet(opt.id, newPayload, url, __token);
        });
        setSnippet(all);
      }
    } catch (err: any) {
      console.log(err?.response?.data);
      alert(err?.response?.data);
    }
  };

  const nextStep = () => {
    form.trigger();
    const currentIndex = tabsToShow?.indexOf(step) ?? -1;
    const nextIndex = currentIndex + 1;

    if (nextIndex < (tabsToShow?.length ?? 0)) {
      const nextStep = tabsToShow[nextIndex];
      setStep(nextStep);
    } else {
      setStep(step + 1);
    }
  };
  const prevStep = () => {
    form.trigger();
    const currentIndex = tabsToShow?.indexOf(step) ?? -1;
    const prevIndex = currentIndex - 1;

    if (prevIndex >= 0) {
      const prevStep = tabsToShow[prevIndex];
      setStep(prevStep);
    } else {
      setStep(step - 1);
    }
  };

  const {
    transactionType,
    amount,
    currency,
    isCredit,
    payerId,
    payeeId,
    fromWallet,
    reference,
  } = form.watch();

  const handleDisable = () => {
    switch (step) {
      case 1: {
        const isCreditValue = form.getValues("isCredit");
        return (
          transactionType &&
          amount &&
          currency &&
          isCreditValue !== undefined &&
          isCreditValue !== "" &&
          reference
        );
      }
      case 2:
        return true;
      case 3:
        if (isFieldVisible("payerId") && isFieldVisible("payeeId")) {
          return (
            (payerId || props.defaultValues?.payerId) &&
            (payeeId || props.defaultValues?.payeeId)
          );
        } else if (isFieldVisible("payeeId")) {
          return payeeId || props.defaultValues?.payeeId;
        } else if (isFieldVisible("payerId")) {
          return payerId || props.defaultValues?.payerId;
        }
        return fromWallet;
      case 4:
        return true;
      case 5:
        return true;
      case 6:
        return true;
      case 7:
        return true;
      default:
        return false;
    }
  };

  const isFieldVisible = (field: any) => {
    if (fieldsToHide?.length) {
      return !fieldsToHide.includes(field);
    } else {
      return true;
    }
  };
  const isFieldDisabled = (field: any) => {
    if (fieldsToDisable?.length) {
      return fieldsToDisable.includes(field);
    } else {
      return false;
    }
  };
  const isStepVisible = (stepIndex: any) => {
    if (tabsToShow?.length) {
      return tabsToShow.includes(stepIndex);
    }
    return true;
  };

  const handleStep = (step: React.SetStateAction<number>) => {
    setStep(step);
  };
  return (
    <>
      <StimulatorWrapper>
        <FormProvider {...form}>
          <form>
            <h1>
              {defaultAction === "SIMULATE" ? (
                <>Transaction Simulator</>
              ) : (
                <>Transaction</>
              )}
            </h1>
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
                        Promotions
                      </li>
                    )}
                    {isStepVisible(7) && (
                      <li
                        onClick={() => handleStep(7)}
                        className={`${step === 7 ? "activeStep" : ""}`}
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
                            <select
                              name="transactionType"
                              defaultValue={
                                props.defaultValues?.transactionType
                              }
                              {...form.register("transactionType", {
                                required: true,
                              })}
                              disabled={isFieldDisabled("transactionType")}
                              required
                            >
                              <StyledOption value="">
                                Select Transaction type
                              </StyledOption>
                              {transactionTypes?.length > 0 &&
                                transactionTypes.map((cur: any) => (
                                  <StyledOption key={cur.id} value={cur.id}>
                                    {cur.label}
                                  </StyledOption>
                                ))}
                            </select>
                          </li>
                        )}
                        {isFieldVisible("amount") && (
                          <li>
                            <label>
                              Amount <sup className="requiredStar">*</sup> :
                            </label>
                            <input
                              name="amount"
                              defaultValue={props.defaultValues?.amount}
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

                            <select
                              name="currency"
                              defaultValue={props.defaultValues?.currency}
                              {...form.register("currency", {
                                required: true,
                              })}
                            >
                              <StyledOption value="">
                                Select Currency
                              </StyledOption>
                              {currencyList?.length > 0 &&
                                currencyList.map((cur: any) => (
                                  <StyledOption key={cur.id} value={cur.id}>
                                    {cur.label}
                                  </StyledOption>
                                ))}
                            </select>
                          </li>
                        )}
                        {isFieldVisible("virtualValue") && (
                          <li>
                            <label>Virtual Value :</label>
                            <input
                              defaultValue={props.defaultValues?.virtualValue}
                              {...form.register("virtualValue")}
                            />
                          </li>
                        )}
                        {isFieldVisible("isCredit") && (
                          <li>
                            <label>
                              Is Credit <sup className="requiredStar">*</sup> :
                            </label>
                            <RadioGroup>
                              {IS_CREDIT_LIST.map((opt: any) => {
                                const inputId = `isCredit-${opt.id}`;
                                return (
                                  <RadioOption key={opt.id}>
                                    <input
                                      type="radio"
                                      id={inputId}
                                      name="isCredit"
                                      value={opt.id}
                                      {...form.register("isCredit", {
                                        required: true,
                                      })}
                                    />
                                    <label htmlFor={inputId}>{opt.label}</label>
                                  </RadioOption>
                                );
                              })}
                            </RadioGroup>
                          </li>
                        )}
                        {isFieldVisible("reference") && (
                          <li>
                            <label>
                              Reference <sup className="requiredStar">*</sup> :
                            </label>
                            <input
                              defaultValue={props.defaultValues?.reference}
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
                              defaultValue={props.defaultValues?.paymentMethod}
                              {...form.register("paymentMethod")}
                            />
                          </li>
                        )}
                        {isFieldVisible("sku") && (
                          <li>
                            <label>SKU :</label>
                            <input
                              defaultValue={props.defaultValues?.sku}
                              {...form.register("sku")}
                            />
                          </li>
                        )}
                        {isFieldVisible("remark") && (
                          <li>
                            <label>Remark:</label>
                            <input
                              defaultValue={props.defaultValues?.remark}
                              {...form.register("remark")}
                            />
                          </li>
                        )}
                        {isFieldVisible("description") && (
                          <li>
                            <label>Description :</label>
                            <input
                              defaultValue={props.defaultValues?.description}
                              {...form.register("description")}
                            />
                          </li>
                        )}
                        {isFieldVisible("productId") && (
                          <li>
                            <label>Product Id :</label>
                            <input
                              defaultValue={props.defaultValues?.productId}
                              {...form.register("productId")}
                            />
                          </li>
                        )}
                        {isFieldVisible("productName") && (
                          <li>
                            <label>Product Name :</label>
                            <input
                              defaultValue={props.defaultValues?.productName}
                              {...form.register("productName")}
                            />
                          </li>
                        )}
                      </>
                    )}
                    {step === 3 && (
                      <>
                        <li
                          style={{
                            display: `${
                              isFieldVisible("payerId") ? "" : "none"
                            }`,
                          }}
                        >
                          <label>
                            Partner Id <sup className="requiredStar">*</sup> :
                          </label>
                          <input
                            defaultValue={props.defaultValues?.payerId}
                            {...form.register("payerId")}
                            required
                            disabled={isFieldDisabled("payerId")}
                          />
                        </li>

                        <li
                          style={{
                            display: `${
                              isFieldVisible("payeeId") ? "" : "none"
                            }`,
                          }}
                        >
                          <label>
                            Payee Id <sup className="requiredStar">*</sup> :
                          </label>
                          <input
                            defaultValue={props.defaultValues?.payeeId}
                            {...form.register("payeeId")}
                            disabled={isFieldDisabled("payeeId")}
                          />
                        </li>

                        {isFieldVisible("service") && (
                          <li>
                            <label>Service :</label>
                            <input
                              defaultValue={props.defaultValues?.service}
                              {...form.register("service")}
                              required
                            />
                          </li>
                        )}
                        {isFieldVisible("provider") && (
                          <li>
                            <label>Provider :</label>
                            <input
                              defaultValue={props.defaultValues?.provider}
                              {...form.register("provider")}
                              required
                            />
                          </li>
                        )}
                        {isFieldVisible("vendor") && (
                          <li>
                            <label>Vendor :</label>
                            <input
                              defaultValue={props.defaultValues?.vendor}
                              {...form.register("vendor")}
                              required
                            />
                          </li>
                        )}
                        {isFieldVisible("fromWallet") && (
                          <li>
                            <label>From Wallet :</label>
                            <input
                              defaultValue={props.defaultValues?.fromWallet}
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
                              defaultValue={props.defaultValues?.payerName}
                              {...form.register("payerName")}
                            />
                          </li>
                        )}
                        {isFieldVisible("payeeName") && (
                          <li>
                            <label>Payee Name :</label>
                            <input
                              defaultValue={props.defaultValues?.payeeName}
                              {...form.register("payeeName")}
                            />
                          </li>
                        )}
                        {isFieldVisible("onBehalfOfId") && (
                          <li>
                            <label>On Behalf Of Id :</label>
                            <input
                              defaultValue={props.defaultValues?.onBehalfOfId}
                              {...form.register("onBehalfOfId")}
                            />
                          </li>
                        )}
                        {isFieldVisible("onBehalfOfName") && (
                          <li>
                            <label>On Behalf Of Name :</label>
                            <input
                              defaultValue={props.defaultValues?.onBehalfOfName}
                              {...form.register("onBehalfOfName")}
                            />
                          </li>
                        )}
                        {isFieldVisible("additionalData") && (
                          <li>
                            <label>Additional Data :</label>
                            <input
                              defaultValue={props.defaultValues?.additionalData}
                              {...form.register("additionalData")}
                            />
                          </li>
                        )}
                        {isFieldVisible("baseTransaction") && (
                          <li>
                            <label>Base Transaction :</label>
                            <input
                              defaultValue={
                                props.defaultValues?.baseTransaction
                              }
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
                              defaultValue={
                                props.defaultValues?.executeCommissionFor
                              }
                              {...form.register("executeCommissionFor")}
                            />
                          </li>
                        )}
                        {isFieldVisible("executeCommissionAmount") && (
                          <li>
                            <label>Execute Commission Amount:</label>
                            <input
                              defaultValue={
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
                              defaultValue={props.defaultValues?.metadata}
                              {...form.register("metadata")}
                            />
                          </li>
                        )}
                      </>
                    )}
                    {step === 6 && (
                      <>
                        {isFieldVisible("couponCode") && (
                          <li>
                            <label>Coupon Code :</label>
                            <input
                              defaultValue={props.defaultValues?.couponCode}
                              {...form.register("couponCode")}
                            />
                          </li>
                        )}
                      </>
                    )}
                    {step === 7 && (
                      <>
                        {isFieldVisible("achieverId") && (
                          <li>
                            <label>Achiever Id :</label>
                            <input
                              defaultValue={props.defaultValues?.achieverId}
                              {...form.register("achieverId")}
                            />
                          </li>
                        )}
                        {isFieldVisible("action") && (
                          <li>
                            <label>Achievement Identifier :</label>
                            <input
                              defaultValue={props.defaultValues?.action}
                              {...form.register("action")}
                            />
                          </li>
                        )}
                        {isFieldVisible("value") && (
                          <li>
                            <label>Value :</label>
                            <input
                              defaultValue={props.defaultValues?.value}
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
                  {showApiSnippets && (
                    <Container>
                      <div style={{ marginBottom: "15px" }}>
                        <div style={{ marginBottom: "10px" }}>
                          <label
                            style={{ fontWeight: "bold", marginRight: "10px" }}
                          >
                            Excution Type
                          </label>
                          <select
                            value={executionType}
                            onChange={async(e) => {
                              await setExecutionType(
                                e.target.value as
                                  | "COMMIT_TRANSACTION"
                                  | "SIMULATE",
                              );
                             await handleSnippetChange(selected);
                            }}
                            style={{ marginRight: "10px", padding: "5px" }}
                          >
                            <option value="SIMULATE">
                              Simulate Transaction
                            </option>
                            <option value="COMMIT_TRANSACTION">
                              Execute Transaction
                            </option>
                          </select>
                        </div>
                      </div>
                      <Dropdown
                        value={selected}
                        onChange={(e) => handleSnippetChange(e.target.value)}
                      >
                        {CODE_SNIPPET_OPTIONS.map((item: any) => (
                          <option value={item.id}>{item.label}</option>
                        ))}
                      </Dropdown>

                      <CodeContainer>
                        <CopyButton onClick={copyToClipboard}>
                          {/* <Copy size={16} /> */}
                          COPY
                        </CopyButton>
                        <Highlight
                          language="javascript"
                          code={snippet[selected] || ""}
                        >
                          {({ style, tokens, getLineProps, getTokenProps }) => (
                            <div style={style}>
                              {tokens.map((line, i) => (
                                <div key={i} {...getLineProps({ line })}>
                                  {line.map((token, key) => (
                                    <span
                                      key={key}
                                      {...getTokenProps({ token })}
                                    />
                                  ))}
                                </div>
                              ))}
                            </div>
                          )}
                        </Highlight>
                      </CodeContainer>
                    </Container>
                  )}
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
                  {step !== 7 && (
                    <button
                      className="submitBtn"
                      type="button"
                      disabled={!handleDisable()}
                      onClick={nextStep}
                    >
                      Next
                    </button>
                  )}{" "}
                  {step === 7 && (
                    <>
                      {defaultAction === "SIMULATE" && (
                        <button
                          className="submitBtn"
                          type="submit"
                          onClick={form.handleSubmit(onSubmit)}
                          disabled={!handleDisable()}
                        >
                          Simulate
                        </button>
                      )}
                      {defaultAction === "COMMIT_TRANSACTION" && (
                        <button
                          className="submitBtn"
                          type="submit"
                          onClick={form.handleSubmit(handleDoTransaction)}
                        >
                          Commit Transaction
                        </button>
                      )}
                    </>
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
                    onClick={form.handleSubmit(handleDoTransaction)}
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
  .formStyle li select {
    width: 340px;
    height: 28px;
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

const StyledOption = styled.option`
  padding: 8px;
  border: 1px solid;
`;

//for snippet
const Container = styled.div`
  padding: 16px;
`;

const Dropdown = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 16px;
  font-size: 16px;
`;

const CodeContainer = styled.div`
  position: relative;
  background: #1e1e1e;
  color: #fff;
  padding: 16px;
  border-radius: 8px;
  font-family: monospace;
  overflow-x: auto;
`;

const CopyButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: #444;
  color: #fff;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #666;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  width: 330px;
  @media screen and (max-width: 845px) {
    width: 315px;
  }
  @media screen and (max-width: 425px) {
    width: 220px;
  }
`;

const RadioOption = styled.div`
  width: 150px !important;
  display: flex;
  align-items: center;
  gap: 6px;

  input[type="radio"] {
    width: 15px !important;
    height: 16px !important;
    margin: 0;
    cursor: pointer;
  }

  label {
    margin: 0;
    cursor: pointer;
    font-size: 14px;
    color: #333;
  }

  &:hover {
    label {
      color: #000;
    }
  }
`;

export default Stimulator;
