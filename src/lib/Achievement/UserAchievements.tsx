import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./user_achievement.css";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { API_HOST } from '../../constants';
export interface Payers {
    userId?: string;
    currency?: string;
    credentials?: any;
}
const UserAchievement
    = (props: Payers) => {
        const [loading, setLoading] = useState(false);
        const [achievement, setAchievement] = useState([]);
        useEffect(() => {
            const fetchData = async () => {
                setLoading(true);
                const fetchBalance = await axios.post(
                    // `${API_HOST}/tenant/${props.credentials.application_id}/get-current-balances-for-transaction-types?filter[userId]=${props.userId}&filter[currency]=${props.currency}`,
                    `${API_HOST}/tenant/${props.credentials.application_id}/user-achievements/get-active/${props.userId}`,
                    {
                        ...props.credentials,
                    }
                );
                if (fetchBalance.data) {
                    const items = fetchBalance.data
                    setAchievement(items)
                    console.log(items)
                }
                setLoading(false);
            };
            fetchData();
        }, [props.userId, props.currency]);
        console.log(achievement)
        return (
            <>
                {loading && <h1>Loading</h1>}
                <div className="wrapper">
                    {achievement?.map(rec => <>
                        <div className='card'>
                            <SyntaxHighlighter language="javascript" style={docco}>
                                {JSON.stringify(rec, null, 2)}
                            </SyntaxHighlighter>
                        </div>
                    </>)}
                </div>
            </>
        );
    };

export default UserAchievement
    ;