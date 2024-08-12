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
  includeToday: boolean;
  amountType?: "amount" | "virtual";
  identifierMapper?: any;
  parentTransactionTypeIdentifier?: string;
  updateParentTransactionTypeId?: any;
  pieSliceClickable?: boolean;
  parentChartColor?: string;
  setChartLoading?: any;
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
  const includeToday = props.includeToday || false;
  const type = props.type || "debit";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (props?.setChartLoading) {
        props?.setChartLoading(true);
      }
      let balances: any;
      if (
        props.transactionTypes.length ||
        props?.parentTransactionTypeIdentifier !== ""
      ) {
        balances = await _fetchGetBalances(
          props.credentials,
          props.userId,
          props.currency,
          moment(props.startDate).format("YYYY-MM-DD"),
          moment(props.endDate).format("YYYY-MM-DD"),
          group,
          includePrevious,
          includeToday
        );
      } else {
        balances = [];
      }
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
            return balances[0]?.groupedDebitVirtualValues ?? {};
          } else {
            return balances[0]?.groupedDebitAmounts ?? {};
          }
        } else if (type === "credit") {
          if (props.amountType === "virtual") {
            return balances[0]?.groupedCrediVirtualValues ?? {};
          } else {
            return balances[0]?.groupedCreditAmounts ?? {};
          }
        } else if (type === "amount") {
          if (props.amountType === "virtual") {
            return balances[0]?.groupedVirtualValues ?? {};
          } else {
            return balances[0]?.groupedAmounts ?? {};
          }
        } else return {};
      };

      const balance = getBalance();

      if (
        props.parentTransactionTypeIdentifier &&
        props.parentTransactionTypeIdentifier !== ""
      ) {
        console.log(
          "parentTransactionTypeIdentifier",
          props.parentTransactionTypeIdentifier
        );
        const total = props.transactionTypes?.reduce((acc, curr) => {
          return (acc = acc + balance[curr] ?? 0);
        }, 0);
        console.log("total", total);
        chartData.push({
          value: Math.abs(
            balance[props.parentTransactionTypeIdentifier] - total
          ),
          name: props.identifierMapper[props.parentTransactionTypeIdentifier],
        });
        console.log(
          "balance[props.parentTransactionTypeIdentifier]",
          balance[props.parentTransactionTypeIdentifier]
        );
        chartColors.push(props?.parentChartColor ?? makeRandomColor());
        console.log("chartData", chartData);
        console.log("chartColors", chartColors);
      }
      console.log(props.transactionTypes);
      console.log("identifierMapper", props.identifierMapper);
      if (Object.keys(balance).length) {
        setRawData(balances);
        console.log(balance);
        for (let transactionTypes in balance) {
          if (
            (props.transactionTypes &&
              !props.transactionTypes.includes(transactionTypes)) ||
            balance[transactionTypes] === 0
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
          console.log(transactionTypes);
          const bal = balance[transactionTypes];
          console.log(bal);
          chartData.push({
            value: Math.abs(bal),
            name: props.identifierMapper
              ? props.identifierMapper[transactionTypes]
              : transactionTypes,
            transactionTypes,
          });
        }
        chartOptions.series[0].data = chartData;
        chartOptions.series[0].color = chartColors;
      } else {
        chartOptions.series[0].data = [];
        chartOptions.series[0].color = [];
      }
      console.log(props.transactionTypes);
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
    props.themeConfig,
    props.amountType,
    props.startDate,
    props.endDate,
    props.transactionTypes,
    props?.parentTransactionTypeIdentifier,
  ]);

  const onChartClick = (params: any) => {
    if (props?.parentTransactionTypeIdentifier === "") {
      props.updateParentTransactionTypeId(params?.data?.transactionTypes);
    }
  };

  const onEvents = {
    click: props.pieSliceClickable ? onChartClick : null,
  };

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
        <div style={{ marginTop: "20px", height: "100%" }}>
          {!loading && chartOption && (
            <ReactEChartsCore
              echarts={echarts}
              option={chartOption}
              notMerge={true}
              lazyUpdate={true}
              onEvents={onEvents}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ReportBalanceChart;
