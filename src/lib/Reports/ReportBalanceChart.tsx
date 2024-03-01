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
import { _fetchBalance, _fetchGetBalances } from "../services/balances";
import { getTheme, makeRandomColor } from "../../utilities/theme";
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

export interface IPartnerBalancesPieChartProps {
  userId: string;
  currency: string;
  credentials: any;
  showRaw?: boolean;
  transactionTypes?: string[];
  chartOptions?: any;
  themeConfig: any;
  endDate: Date;
  startDate: Date;
  group: string;
  type: string;
  includePrevious: boolean;
  amountType?: "amount" | "virtual";
}

const option: any = {
  tooltip: {
    show: false,
    trigger: "item",
  },
  legend: {
    show: false,
  },
  series: [
    {
      name: "",
      type: "pie",
      radius: "80%",
      avoidLabelOverlap: true,
      itemStyle: {
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        formatter: (params: any) => {
          return `{name|${params.data.name}}\n{value|${params.percent}} %`;
        },
        minMargin: 5,
        edgeDistance: 5,
        lineHeight: 15,
        rich: {
          name: {
            fontSize: 15,
            color: "inherit",
          },
        },
      },
      labelLine: {
        show: true,
      },
      data: [],
    },
  ],
};

const ReportBalanceChart = (props: IPartnerBalancesPieChartProps) => {
  const [loading, setLoading] = useState(false);
  const [chartOption, setChartOption] = useState();
  const [rawData, setRawData] = useState([]);
  const group = props.group || "monthly";
  const includePrevious = props.includePrevious || false;
  const type = props.type || "debit";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const balances = await _fetchGetBalances(
        props.credentials,
        props.userId,
        props.currency,
        moment(props.startDate).format("YYYY-MM-DD"),
        moment(props.endDate).format("YYYY-MM-DD"),
        group,
        includePrevious
      );
      const chartData = [],
        chartColors = [];

      const theme = getTheme() || {};
      theme.transactionTypes = props.themeConfig || theme.transactionTypes;
      let chartOptions;
      chartOptions = Object.keys(props.chartOptions).length
        ? props.chartOptions
        : option;

      const getBalance = () => {
        if (type === "debit") {
          if (props.amountType === "virtual") {
            return balances[0]?.groupedDebitVirtualValues;
          } else {
            return balances[0]?.groupedDebitAmounts;
          }
        } else if (type === "credit") {
          if (props.amountType === "virtual") {
            return balances[0]?.groupedCrediVirtualValues;
          } else {
            return balances[0]?.groupedCreditAmounts;
          }
        } else if (type === "amount") {
          if (props.amountType === "virtual") {
            return balances[0]?.groupedVirtualValues;
          } else {
            return balances[0]?.groupedAmounts;
          }
        }
      };

      const balance = getBalance();

      if (balance) {
        setRawData(balances);

        for (let transactionTypes in balance) {
          if (
            props.transactionTypes &&
            !props.transactionTypes.includes(transactionTypes)
          ) {
            continue;
          }
          const transactionTypeTheme = theme.transactionTypes[transactionTypes];
          let colorForTransactionType;

          if (transactionTypeTheme) {
            colorForTransactionType = transactionTypeTheme.chart.color;
          }

          if (!colorForTransactionType) {
            colorForTransactionType = makeRandomColor();
          }

          chartColors.push(colorForTransactionType);

          chartData.push({
            value: Math.abs(balance[transactionTypes]),
            name: transactionTypes,
          });
        }
        chartOptions.series[0].data = chartData;
        chartOptions.series[0].color = chartColors;

        setChartOption(chartOptions);
      } else {
        chartOptions.series[0].data = [];
        setChartOption(chartOptions);
      }

      setLoading(false);
    };
    fetchData();
  }, [props.userId, props.currency, props.themeConfig, props.amountType]);

  return (
    <>
      {/* {loading && <h1>Loading</h1>} */}
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
        <div style={{ marginTop: "20px", height: "100%" }}>
          {!loading && chartOption && (
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
export default ReportBalanceChart;
