
import styled from 'styled-components';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_HOST } from '../../constants';
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

export interface Payers {
    userId: string;
    currency: string;
    credentials: any;
    showRaw: boolean;
}
const PayerTransaction = (props: Payers) => {
    const [loading, setLoading] = useState(false);
    const [payerData, setPayerData] = useState<any>();
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const fetchBalance = await axios.post(
                // `${API_HOST}/tenant/${props.credentials.application_id}/reports/get-partner-balances-report-by-date?dateRange[]='10-03-2023'`,
                `${API_HOST}/tenant/${props.credentials.application_id}/get-transaction-profile-by-identifier-for-currency/${props.userId}/${props.currency}`,
                // `${API_HOST}/tenant/${props.credentials.application_id}/get-transaction-profile-by-identifier-for-currency/${props.userId}/${props.currency}`,
                {
                    ...props.credentials,
                }
            );
            if (fetchBalance.data) {
                const items = fetchBalance.data
                setPayerData(items)
            }
            setLoading(false);
        };
        fetchData();
    }, [props.userId, props.currency]);
    // TransactionTypesAmount
    const newObjectKeys = payerData?.transactionTypesAmount
    // TransactionTypesVirtualValues
    const typesVirtualValues = payerData?.transactionTypesVirtualValue
    console.log(payerData)
    return (
        <>
            {loading && <h1>Loading</h1>}
            {props.showRaw ? <>
                <div className="card">
                    <SyntaxHighlighter language="javascript" style={docco}>
                        {JSON.stringify(payerData, null, 2)}
                    </SyntaxHighlighter>
                </div></> : <>
                <PayerTransactionWrapper>
                    <div className="cards">

                        <p>
                            <strong>Identifier</strong>: <small style={{ marginTop: '5px' }}>{payerData?.identifier}</small>
                        </p>
                        <p>
                            <strong>Is Booked</strong>: {payerData?.isBlocked === true ? 'Yes' : 'No'}
                        </p>
                        <p>
                            <strong>Created At</strong>: {payerData?.createdAt}
                        </p>
                        <p>
                            <strong>Currency</strong> :{payerData?.currency}
                        </p>
                        <p>
                            <strong>Current Amount</strong> :{parseFloat(payerData?.currentAmount).toFixed(2)}
                        </p>
                        <p>
                            <strong>Current Virtual Value</strong> :{payerData?.currentVirtualValue
                            }
                        </p>
                        <p>
                            <strong style={{ textDecoration: 'underline' }}>Transaction Types Amount</strong>
                            {
                                newObjectKeys !== null && typeof newObjectKeys === "object" ? Object.keys(newObjectKeys).map(item => <p>
                                    <strong>{item}</strong>: <span>{newObjectKeys[item]}</span>
                                </p>) : "Not valid"
                            }
                        </p>
                        <p>
                            <strong style={{ textDecoration: 'underline' }}>Transaction Virtual Values</strong>
                            {
                                typesVirtualValues !== null && typeof typesVirtualValues === "object" ? Object.keys(typesVirtualValues).map(item => <p>
                                    <strong>{item}</strong>: <span>{typesVirtualValues[item]}</span>
                                </p>) : "Not valid"
                            }
                        </p>
                        {/* {
                        Object.keys(balance?.transactionTypesAmount).map(item => {
                            <p>{item}</p>
                        })
                    } */}
                        <p>
                            <strong>Current Virtual Value</strong> :{payerData?.currentVirtualValue
                            }
                        </p>

                        <p>
                            <strong>Tenant Id</strong>:<small>{payerData?.tenantId
                            }</small>
                        </p>
                        <p>
                            <strong>Updated At</strong> :{payerData?.updatedAt
                            }
                        </p>
                        <p>
                            <strong>Updated By</strong>:<small>{payerData?.updatedById
                            }</small>
                        </p>
                    </div>
                </PayerTransactionWrapper></>}
        </>
    );
};
const PayerTransactionWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
  
  .cards {
    max-width: 350px;
    padding: 15px;
    width: 100%;
    margin: 10px;
    border: 1px solid black;
    border-radius: 10px;
  }
  
`

export default PayerTransaction;