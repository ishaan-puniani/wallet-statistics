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
import { _fetchBalance } from "../services/balances";

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
};

const chartThemeConfig = {
  Income: "#87E05D",
  Expense: "#F15555",
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

  const transactionTypes = props.transactionTypes || transactionType;

  const themeConfig =
    Object.keys(props.themeConfig).length > 0
      ? props.themeConfig
      : chartThemeConfig;
  const chartType = props.chartType || "bar";

  useEffect(() => {
    setRawData(data.Income.data);
    option.series = transactionTypes?.map((dataType) => {
      return {
        name: dataType,
        type: chartType,
        data: data[dataType].data.map((row: any) => row.amount),
        itemStyle: { color: themeConfig[dataType] },
        smooth: true,
      };
    });
    setChartOption(option);
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
