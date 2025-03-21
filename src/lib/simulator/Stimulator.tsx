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
  defaultAction?: "COMMIT_TRANSACTION" | "SIMULATE";
  defaultValues?: Record<string, any>;
  __token: string;
  setIsTransactionExecuted: React.Dispatch<React.SetStateAction<boolean>>;
}

const IS_CREDIT_LIST = [
  { id: "debit", label: "Debit" },
  { id: "credit", label: "Credit" },
];

const CODE_SNIPPET_OPTIONS = [
  {id:"curl",label:"cURL"},
  {id:"axios",label:"Axios"},
  {id:"fetch",label:"Fetch"},
  {id:"python",label:"Python"},
  {id:"java",label:"Java/Android"},
  {id:"dart",label:"Dart/Flutter"},
  {id:"go",label:"Go"},
  {id:"php",label:"Php"},
  {id:"swift",label:"Swift"},
]

const Stimulator = (props: IStimulatorProps) => {
  console.log("REACHED");
  const [view, setView] = useState(false);
  const [record, setRecord] = useState<any>({});
  const [payload, setPayload] = useState<any>({});
  const [snippet,setSnippet] = useState<any>();
  const [step, setStep] = useState<any>(1);
  const form = useForm();
  const [transactionTypes, setTransactionTypes] = useState<any>();
  const [currencyList, setCurrencyList] = useState<any>();

  const [selected, setSelected] = useState("curl");

  const copyToClipboard = (e:any) => {
    e.preventDefault();
    navigator.clipboard.writeText(snippet[selected]);
  };

  const {
    credentials,
    tabsToShow,
    fieldsToHide,
    defaultAction,
    setIsTransactionExecuted,
  } = props;

  const { application_id,__token } = credentials;
  // const { application_id } = credentials;
  // const __token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQxZTcwNjNjLTE1NTctNDk5Yi1iMjAwLTJlMWIxZDlhZjMzZCIsImlhdCI6MTc0MjIyNzQ1OCwiZXhwIjoxNzQyODMyMjU4fQ.lNFJpr25woHu2jSG7iUGMJdJOZP7emz4PADFKUprPYA"

  // const token = props.__token
  const fetchTypes = useCallback(async () => {
    try {
      // need to move this api in common area
      const types = await axios.get(
        `${API_HOST}/tenant/${application_id}/transaction-type/autocomplete`,
        {
          headers: {
            Authorization: `Bearer ${__token}`,
          },
        }
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
        `${API_HOST}/tenant/${application_id}/currency/autocomplete`,
        {
          headers: {
            Authorization: `Bearer ${__token}`,
          },
        }
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

  const onSubmit = async (data: any) => {
    const isCredit = data.isCredit === "debit" ? false : true;
    const payerId = isCredit ? application_id : data.payerId;
    const payeeId = isCredit ? data.payerId : application_id;

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
    setPayload({data:record});
    try {
      const fetchBalance = await axios.post(
        `${API_HOST}/tenant/${props.credentials.application_id}/simulate-currency-transaction`,
        {
          data: record,
        }
      );

      setRecord(fetchBalance.data);
      setView(!view);

      const curlCommand=`curl -X POST "${API_HOST}/tenant/${props.credentials.application_id}/simulate-currency-transaction" \
        -H "Authorization: Bearer ${__token}" \
        -H "Content-Type: application/json" \
        -d '${JSON.stringify({data: record})}'`;
      setSnippet({curl:curlCommand});
    } catch (err: any) {
      console.log(err?.response?.data);
      alert(err?.response?.data);
    }
  };
  
  const handleSnippetChange = (val:any)=>{
    setSelected(val);
    switch(val){
      case "curl":
        setSnippet({curl:`curl -X POST "${API_HOST}/tenant/${props.credentials.application_id}/simulate-currency-transaction" \
        -H "Authorization: Bearer ${__token}" \
        -H "Content-Type: application/json" \
        -d '${JSON.stringify(payload)}'`});
        break;
      case "axios":
        setSnippet({
          axios:
`await axios.post(
  "${API_HOST}/tenant/${props.credentials.application_id}/simulate-currency-transaction", 
  ${JSON.stringify(payload)}, 
  { 
    headers: { 
      "Authorization": "Bearer ${__token}",
      "Content-Type": "application/json" } 
  })
  .then(response => console.log(response.data)
);`
        });
        break;
      case "fetch":
        setSnippet({
          fetch:
`fetch(
  "${API_HOST}/tenant/${props.credentials.application_id}/simulate-currency-transaction",
  {
    method: "POST",
    headers: { "Authorization": "Bearer ${__token}", "Content-Type": "application/json" },
    body: ${JSON.stringify(payload)}
  })
  .then(response => response.json())\n.then(data => console.log(data));`
        });
        break;
      case "python":
        setSnippet({
          python:
`import requests
headers = { "Authorization": "Bearer ${__token}", "Content-Type": "application/json" }
response = requests.post("${API_HOST}/tenant/${props.credentials.application_id}/simulate-currency-transaction", json=${JSON.stringify(payload)}, headers=headers)
print(response.json())`
        });
        break;
      case "java":
        setSnippet({
          java:
`import okhttp3.*;
OkHttpClient client = new OkHttpClient();
RequestBody body = RequestBody.create(MediaType.parse("application/json"),${JSON.stringify(payload)});
Request request = new Request.Builder().url("${API_HOST}/tenant/${props.credentials.application_id}/simulate-currency-transaction")
  .post(body).header("Authorization", "Bearer ${__token}").build();
Response response = client.newCall(request).execute();\nSystem.out.println(response.body().string());`
        });
        break;
      case "dart":
        setSnippet({
          dart:
`import 'package:http/http.dart' as http;
void postData() async {
  var response = await http.post(Uri.parse("${API_HOST}/tenant/${props.credentials.application_id}/simulate-currency-transaction"),
    headers: { "Authorization": "Bearer ${__token}", "Content-Type": "application/json" },\n    body: jsonEncode(${JSON.stringify(payload)})
  );
  print(response.body);
}`
        });
        break;
      case "go":
        setSnippet({
          go:
`package main
import (
  "fmt"
  "bytes"
  "net/http"
  "io/ioutil"
)
func main() {
  payload := strings.NewReader("${JSON.stringify(payload)}")
  req, _ := http.NewRequest("POST", "${API_HOST}/tenant/${props.credentials.application_id}/simulate-currency-transaction", bytes.NewBuffer(jsonBody))
  req.Header.Set("Authorization", "Bearer ${__token}")
  req.Header.Set("Content-Type", "application/json")
  client := &http.Client{}\n  res, _ := client.Do(req)
  body, _ := ioutil.ReadAll(res.Body)
  fmt.Println(string(body))
}`
        });
        break;
      case "php":
        setSnippet({
          php:`
<?php
  $ch = curl_init("${API_HOST}/tenant/${props.credentials.application_id}/simulate-currency-transaction");
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer ${__token}",
    "Content-Type: application/json"
  ]);
  curl_setopt($ch, CURLOPT_POSTFIELDS, ${JSON.stringify(payload)});
  $response = curl_exec($ch);\ncurl_close($ch);
?>`
        });        
        break;
      case "swift":
        let p :any= JSON.stringify(payload);
        p = p.replaceAll("{","[").replaceAll("}","]");
        setSnippet({
          swift:
`import Foundation
let url = URL(string: "${API_HOST}/tenant/${props.credentials.application_id}/simulate-currency-transaction")!
var request = URLRequest(url: url)
request.httpMethod = "POST"
request.setValue("Bearer ${__token}", forHTTPHeaderField: "Authorization")
request.setValue("application/json", forHTTPHeaderField: "Content-Type")
request.httpBody = try? JSONSerialization.data(withJSONObject:${p}, options: [])
let task = URLSession.shared.dataTask(with: request) { data, response, error in
  if let data = data {
    print(String(data: data, encoding: .utf8)!)
  }
}
task.resume()`
        });
        break;
      default:
       
        setSnippet({curl:`curl -X POST "${API_HOST}/tenant/${props.credentials.application_id}/simulate-currency-transaction" \
          -H "Authorization: Bearer ${__token}" \
          -H "Content-Type: application/json" \
          -d '${JSON.stringify(payload)}'`});
    
    }
  }

  const handleDoTransaction = async (data: any) => {
    const isCredit = data.isCredit === "debit" ? false : true;
    const payerId = isCredit ? application_id : data.payerId;
    const payeeId = isCredit ? data.payerId : application_id;

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
        `${API_HOST}/tenant/${props.credentials.application_id}/execute-currency-transaction`,
        {
          data: record,
          ...props.credentials,
        }
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
    fromWallet,
    reference,
  } = form.watch();

  const handleDisable = () => {
    switch (step) {
      case 1:
        return transactionType && amount && currency && isCredit && reference;
      case 2:
        return true;
      case 3:
        if (isFieldVisible("payerId")) {
          return payerId && fromWallet;
        }
        return fromWallet;
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
    if (fieldsToHide?.length) {
      return !fieldsToHide.includes(field);
    } else {
      return true;
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
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                              value={props.defaultValues?.transactionType}
                              {...form.register("transactionType", {
                                required: true,
                              })}
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

                            <select
                              name="currency"
                              value={props.defaultValues?.currency}
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
                            <select
                              name="isCredit"
                              value={props.defaultValues?.isCredit}
                              {...form.register("isCredit", {
                                required: true,
                              })}
                            >
                              <StyledOption value="">
                                Select IsCredit
                              </StyledOption>
                              {IS_CREDIT_LIST.map((isCredit: any) => (
                                <StyledOption
                                  key={isCredit.id}
                                  value={isCredit.id}
                                >
                                  {isCredit.label}
                                </StyledOption>
                              ))}
                            </select>
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
                  <Container>
                    <Dropdown value={selected} onChange={(e)=>handleSnippetChange(e.target.value)}>
                      {CODE_SNIPPET_OPTIONS.map((item: any) => (
                              <option value={item.id}>{item.label}</option>
                      ))}
                    </Dropdown>
                    
                    <CodeContainer>
                      <CopyButton onClick={copyToClipboard}>
                        {/* <Copy size={16} /> */}
                        COPY
                      </CopyButton>
                      <Highlight language="javascript" code={snippet[selected]}>
                        {({ style, tokens, getLineProps, getTokenProps }) => (
                          <pre style={style}>
                            {tokens.map((line, i) => (
                              <div key={i} {...getLineProps({ line })}>
                                {line.map((token, key) => (
                                  <span key={key} {...getTokenProps({ token })} />
                                ))}
                              </div>
                            ))}
                          </pre>
                        )}
                      </Highlight>
                    </CodeContainer>
                  </Container>
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
                    <>
                      {defaultAction === "SIMULATE" && (
                        <button
                          className="submitBtn"
                          type="submit"
                          disabled={!handleDisable()}
                        >
                          Simulate
                        </button>
                      )}
                      {defaultAction === "COMMIT_TRANSACTION" && (
                        <button
                          className="submitBtn"
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
  max-width: 600px;
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

export default Stimulator;
