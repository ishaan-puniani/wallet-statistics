import React, { useEffect, useState } from "react";
// import the core library.
import ReactEChartsCore from "echarts-for-react/lib/core";
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from "echarts/core";
// Import charts, all with Chart suffix
import { LineChart } from "echarts/charts";
// import components, all suffixed with Component
import {
    GridComponent,
    TooltipComponent,
    TitleComponent,
} from "echarts/components";
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {
    CanvasRenderer,
    // SVGRenderer,
} from "echarts/renderers";
import axios from "axios";
import { API_HOST } from "../../constants";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

// Register the required components
echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LineChart,
    CanvasRenderer,
]);


export interface BalanceReportChartFilterProps {
    endDate: Date;
    startDate: Date;
    userId: unknown;
    currency: unknown;
    credentials: any;
    label: string;
    amountType: "amount" | "virtual";
    showRaw: boolean;
    transactionTypes?: string[];
}

const BalancesReportChart = (props: BalanceReportChartFilterProps) => {
    // const [loading, setLoading] = useState(false);
    const [balance, setBalance] = useState([]);
    const [date, setDate] = useState([]);
    const [names, setNames] = useState([]);
    const [rawData, setRawData] = useState([]);
    const newDates = (newDate: Date) => {
        const timestamp = newDate;
        const newStartDate = new Date(timestamp);
        const inputDate = new Date(newStartDate);
        const day = ("0" + inputDate.getDate()).slice(-2); // ensure leading zero if necessary
        const month = ("0" + (inputDate.getMonth() + 1)).slice(-2); // add 1 to month since January is 0
        const year = inputDate.getFullYear();
        const outputDateString = `${day}/${month}/${year}`;
        return outputDateString
    }
    useEffect(() => {
        const fetchData = async () => {
            // setLoading(true);
            const fetchBalance = await axios.post(
                // `${API_HOST}/tenant/${props.credentials.application_id}/reports/get-partner-balances-report-by-date?dateRange[]='10-03-2023'`,
                `${API_HOST}/tenant/${props.credentials.application_id}/reports/get-partner-balances-report-by-date?filter[userId]=${props.userId}&filter[currency]=${props.currency}&filter[dateRange][]=${newDates(props.startDate)}&filter[dateRange][]=${newDates(props.endDate)}`,
                {
                    ...props.credentials,
                }
            );
            if (fetchBalance.data) {
                const items = fetchBalance.data.rows
                setRawData(items)

                const xAxisData: any = []
                const allDate: React.SetStateAction<any[]> = []
                const balaceArray: React.SetStateAction<any[]> = []
                items.forEach((item: {
                    transactionTypesVirtualValue: unknown;
                    transactionTypesAmount: unknown; createdAt: any;
                }) => {
                    allDate.push(item?.createdAt.split('T')[0])
                    if (props.amountType === "amount") {
                        const xData = Object.keys(item?.transactionTypesAmount)
                        xData?.forEach(item => {
                            xAxisData.push(item)
                            setNames(xAxisData)
                        })
                        balaceArray.push(item.transactionTypesAmount)
                        return setBalance(balaceArray)
                    }
                    else if (props.amountType === "virtual") {
                        const xData = Object.keys(item?.transactionTypesVirtualValue
                        )
                        xData?.forEach(item => {
                            xAxisData.push(item)
                            setNames(xAxisData)
                        })
                        balaceArray.push(item.transactionTypesVirtualValue
                        )
                        return setBalance(balaceArray)
                    }
                });
                setDate(allDate)
            }
            // setLoading(false);
        };
        fetchData();
    }, [props.userId, props.amountType, props.currency, props.startDate, props.endDate]);

    const uniqueArray = names?.filter((value, index) => {
        return names?.indexOf(value) === index;
    });
    const newObjects = uniqueArray.map(item => {
        const aArrays = [`${balance.map(ea => {
            if (ea[item]) {
                return Math.abs(parseFloat(ea[item]));
            }
            else if (ea[item] === undefined) {
                return 0;
            }
        })}`]
        const strArray = aArrays[0].split(',');
        const numArray = strArray.filter(str => str !== '').map(str => Number(str));
        const singleObject = {
            name: item,
            type: 'line',
            data: numArray
        }
        return singleObject
    })
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: uniqueArray
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '0%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date
        },
        yAxis: {
            type: 'value'
        },
        series: newObjects
    };

    return (
        <>
            {/* {loading && <h1>Loading</h1>} */}
            {props.showRaw ? <>
                <div className="card">
                    <SyntaxHighlighter language="javascript" style={docco}>
                        {JSON.stringify(rawData, null, 2)}
                    </SyntaxHighlighter>
                </div>
            </> : <>
                <h2>{props.label}</h2>
                <ReactEChartsCore
                    echarts={echarts}
                    option={option}
                    notMerge={true}
                    lazyUpdate={true}
                    theme={"theme_name"}
                /></>}
        </>
    );
};
export default BalancesReportChart;
