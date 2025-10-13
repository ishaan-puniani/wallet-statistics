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
import { makeRandomColor } from "../../utilities/theme";
import moment from "moment";

// Register the required components only in browser environment
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    BarChart,
    CanvasRenderer,
    PieChart,
    LegendComponent,
]);

// const chartThemeConfig = {
//   AMOUNT: "blue",
// };

const transactionType = [
  {
    type: "debit",
    label: "Amount",
    transactionType: "AMOUNT",
  },
];

export interface IPartnerBalancesPieChartProps {
  userId: string;
  currency: string;
  credentials: any;
  showRaw?: boolean;
  transactionTypes?: string[];
  chartType?: string;
  chartOptions?: any;
  themeConfig: any;
  endDate: Date;
  startDate: Date;
  group: string;
  includePrevious: boolean;
  includeToday: boolean;
  amountType?: "amount" | "virtual";
  setChartLoading?: any;
  absolute?: boolean;
}

const option: any = {
  tooltip: {
    show: true,
    trigger: "axis",
  },
  legend: {
    data: ["Amount"],
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
    Object.keys(props.themeConfig).length > 0 ? props.themeConfig : null;

  const chartType = props.chartType || "bar";

  const group = props.group || "monthly";

  const includePrevious = props.includePrevious || false;
  const includeToday = props.includeToday || false;

  const chartOptions = Object.keys(props.chartOptions).length
    ? props.chartOptions
    : option;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (props?.setChartLoading) {
        props?.setChartLoading(true);
      }

      const balances = await _fetchGetBalances(
        props.credentials,
        props.userId,
        props.currency,
        moment(props.startDate).format("YYYY-MM-DD"),
        moment(props.endDate).format("YYYY-MM-DD"),
        group,
        includePrevious,
        includeToday
      );

      setRawData(balances);

      if (transactionTypes.length) {
        chartOptions.series = transactionTypes?.map((dataType: any) => {
          return {
            name: dataType.label,
            type: chartType,
            data: balances.map((row: any) => {
              if (dataType.type === "debit") {
                if (props.amountType === "virtual") {
                  return props?.absolute
                    ? Math.abs(
                        row?.groupedDebitVirtualValues[
                          dataType?.transactionType
                        ]
                      ) || 0
                    : row?.groupedDebitVirtualValues[
                        dataType?.transactionType
                      ] || 0;
                } else {
                  return props?.absolute
                    ? Math.abs(
                        row?.groupedDebitAmounts[dataType?.transactionType]
                      ) || 0
                    : row?.groupedDebitAmounts[dataType?.transactionType] || 0;
                }
              } else if (dataType.type === "credit") {
                if (props.amountType === "virtual") {
                  return props?.absolute
                    ? Math.abs(
                        row?.groupedCrediVirtualValues[
                          dataType?.transactionType
                        ]
                      ) || 0
                    : row?.groupedCrediVirtualValues[
                        dataType?.transactionType
                      ] || 0;
                } else {
                  return props?.absolute
                    ? Math.abs(
                        row?.groupedCreditAmounts[dataType?.transactionType]
                      ) || 0
                    : row?.groupedCreditAmounts[dataType?.transactionType] || 0;
                }
              } else if (dataType.type === "balance") {
                if (props.amountType === "virtual") {
                  return props?.absolute
                    ? Math.abs(
                        row?.groupedVirtualValues[dataType?.transactionType]
                      ) || 0
                    : row?.groupedVirtualValues[dataType?.transactionType] || 0;
                } else {
                  return props?.absolute
                    ? Math.abs(
                        row?.groupedAmounts[dataType?.transactionType]
                      ) || 0
                    : row?.groupedAmounts[dataType?.transactionType] || 0;
                }
              }
            }),
            itemStyle: {
              color:
                (themeConfig && themeConfig[dataType?.label]) ||
                makeRandomColor(),
            },
            smooth: true,
            symbol: "none",
            lineStyle: {
              width: 3,
            },
          };
        });
      }

      setChartOption(chartOptions);
      setLoading(false);
      if (props?.setChartLoading) {
        props?.setChartLoading(false);
      }
    };

    fetchData();
  }, [
    props.userId,
    props.currency,
    props.startDate,
    props.endDate,
    props.chartType,
    props.themeConfig,
    props.transactionTypes,
    props.group,
    props.amountType,
  ]);

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
export default ReportChart;
