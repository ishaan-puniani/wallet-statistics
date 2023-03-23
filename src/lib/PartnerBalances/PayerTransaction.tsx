import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_HOST } from '../../constants';
import "./partner_balances.css";
export interface Payers {
    userId: string;
    currency: string;
    credentials: any;
}
const PayerTransaction = (props: Payers) => {
    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = useState<any>();
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
                setBalance(items)
            }
            setLoading(false);
        };
        fetchData();
    }, [props.userId, props.currency]);
    // TransactionTypesAmount
    const newObjectKeys = balance?.transactionTypesAmount
    // TransactionTypesVirtualValues
    const typesVirtualValues = balance?.transactionTypesVirtualValue
    console.log(balance)
    return (
        <>

            {loading && <h1>Loading</h1>}
            <div className="wrapper">
                <div className="card">

                    <p>
                        <strong>Identifier</strong>: <small style={{ marginTop: '5px' }}>{balance?.identifier}</small>
                    </p>
                    <p>
                        <strong>Is Booked</strong>: {balance?.isBlocked === true ? 'Yes' : 'No'}
                    </p>
                    <p>
                        <strong>Created At</strong>: {balance?.createdAt}
                    </p>
                    <p>
                        <strong>Currency</strong> :{balance?.currency}
                    </p>
                    <p>
                        <strong>Current Amount</strong> :{parseFloat(balance?.currentAmount).toFixed(2)}
                    </p>
                    <p>
                        <strong>Current Virtual Value</strong> :{balance?.currentVirtualValue
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
                        <strong>Current Virtual Value</strong> :{balance?.currentVirtualValue
                        }
                    </p>

                    <p>
                        <strong>Tenant Id</strong>:<small>{balance?.tenantId
                        }</small>
                    </p>
                    <p>
                        <strong>Updated At</strong> :{balance?.updatedAt
                        }
                    </p>
                    <p>
                        <strong>Updated By</strong>:<small>{balance?.updatedById
                        }</small>
                    </p>
                </div>
            </div>
        </>
    );
};

export default PayerTransaction;