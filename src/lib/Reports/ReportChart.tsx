import React, { useEffect, useState } from "react";
// import the core library.
import ReactEChartsCore from "echarts-for-react/lib/core";
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from "echarts/core";
// Import charts, all with Chart suffix
import { BarChart, PieChart } from "echarts/charts";
// import components, all suffixed with Component
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
} from "echarts/components";
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {
  CanvasRenderer,
  // SVGRenderer,
} from "echarts/renderers";

import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { _fetchGetBalances } from "../services/balances";
import moment from "moment";

// Register the required components
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
  PieChart,
  LegendComponent,
]);

const data = {
  Income: {
    data: [
      { id: 1, amount: 2.0 },
      { id: 2, amount: 4.9 },
      { id: 3, amount: 7.0 },
      { id: 4, amount: 23.2 },
      { id: 5, amount: 25.6 },
      { id: 6, amount: 76.7 },
      { id: 7, amount: 135.6 },
      { id: 8, amount: 162.2 },
      { id: 9, amount: 32.6 },
      { id: 10, amount: 20.0 },
      { id: 11, amount: 6.4 },
      { id: 12, amount: 3.3 },
    ],
  },
  Expense: {
    data: [
      { id: 1, amount: 2.6 },
      { id: 2, amount: 5.9 },
      { id: 3, amount: 9.0 },
      { id: 4, amount: 26.4 },
      { id: 5, amount: 28.7 },
      { id: 6, amount: 70.7 },
      { id: 7, amount: 175.6 },
      { id: 8, amount: 182.2 },
      { id: 9, amount: 48.7 },
      { id: 10, amount: 18.8 },
      { id: 11, amount: 6.0 },
      { id: 12, amount: 2.3 },
    ],
  },
  Balance: {
    data: [
      { id: 1, amount: 1000 },
      { id: 2, amount: 1200 },
      { id: 3, amount: 1500 },
      { id: 4, amount: 2600 },
      { id: 5, amount: 1700 },
      { id: 6, amount: 5122 },
      { id: 7, amount: 3210 },
      { id: 8, amount: 500 },
      { id: 9, amount: 300 },
      { id: 10, amount: 200 },
      { id: 11, amount: 100 },
      { id: 12, amount: 50 },
    ],
  },
};

const chartThemeConfig = {
  Income: "blue",
  Expense: "red",
};

const transactionType = ["Income", "Expense"];

export interface IPartnerBalancesPieChartProps {
  userId: string;
  currency: string;
  credentials: any;
  showRaw?: boolean;
  transactionTypes?: string[];
  chartType?: string;
  themeConfig: any;
  chartOptions: any;
  endDate: Date;
  startDate: Date;
}

const option: any = {
  tooltip: {
    show: true,
    trigger: "axis",
  },
  legend: {
    data: ["Income", "Expense"],
    left: true,
    icon: "circle",
  },
  xAxis: [
    {
      type: "category",
      // prettier-ignore
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  series: [],
};

const ReportChart = (props: IPartnerBalancesPieChartProps) => {
  const [chartOption, setChartOption] = useState();
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(false);

  const transactionTypes =
    props.transactionTypes.length > 0
      ? props.transactionTypes
      : transactionType;

  const themeConfig =
    Object.keys(props.themeConfig).length > 0
      ? props.themeConfig
      : chartThemeConfig;
  const chartType = props.chartType || "bar";
  const chartOptions = Object.keys(props.chartOptions).length
    ? props.chartOptions
    : option;

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        const balances = await _fetchGetBalances(
          props.credentials,
          props.userId,
          props.currency,
          moment(props.startDate).format("YYYY-MM-DD"),
          moment(props.endDate).format("YYYY-MM-DD"),
        );
        console.log(balances);
      }
      fetchData();
    },[props.userId, props.currency, props.startDate, props.endDate])

  useEffect(() => {
    setRawData(data.Income.data);
    chartOptions.series = transactionTypes?.map((dataType) => {
      return {
        name: dataType,
        type: chartType,
        data: data[dataType].data.map((row: any) => row.amount),
        itemStyle: { color: themeConfig[dataType] },
        smooth: true,
        symbol: "none",
        lineStyle: {
          width: 3,
        },
      };
    });
    setChartOption(chartOptions);
  }, [props.chartType, props.themeConfig, props.transactionTypes]);

  return (
    <>
      {props?.showRaw ? (
        <>
          {rawData?.map((item) => (
            <>
              <div className="card">
                <SyntaxHighlighter language="javascript" style={docco}>
                  {JSON.stringify(item, null, 2)}
                </SyntaxHighlighter>
              </div>
            </>
          ))}
        </>
      ) : (
        <div style={{ marginTop: "20px" }}>
          {chartOption && (
            <ReactEChartsCore
              echarts={echarts}
              option={chartOption}
              notMerge={true}
              lazyUpdate={true}
            />
          )}
        </div>
      )}
    </>
  );
};
export default ReportChart;
