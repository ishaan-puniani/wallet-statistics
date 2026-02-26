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
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from "echarts/components";
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {
  CanvasRenderer,
} from "echarts/renderers";

import moment from "moment";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { getTheme, makeRandomColor } from "../../utilities/theme";
import { balanceKeyMap, Group } from "../Reports/utils/utils";
import { _fetchBalance, _fetchGetBalances } from "../services/balances";

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
}

export interface IPartnerBalancesPieChartProps {
  userId: string;
  currency: string;
  credentials: any;
  amountType: "amount" | "virtual";
  showRaw?: boolean;
  transactionTypes?: string[];
  startDate?: Date;
  endDate?: Date;
  group?: Group;
  includePrevious?: boolean;
  includeToday?: boolean;
  type?: string;
  volume?: "total" | "group";
  identifierMapper?: any;
  /*
  {
"FOOD": {
        "chart": {
            "color": "green"
        }
    },
    },
    
  */
  chartOptions?: any;
  themeConfig: any;
}

const option: any = {
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "0%",
    left: "center",
  },

  grid: {
    left: "3%",
    right: "4%",
    bottom: "0%",
    containLabel: true,
  },
  series: [
    {
      name: "",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [],
      // color: ["red", "blue"],
    },
  ],
};

const BalancesChart = (props: IPartnerBalancesPieChartProps) => {
  const [loading, setLoading] = useState(false);
  const [chartOption, setChartOption] = useState();
  const [rawData, setRawData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let balances: any = [];

      if (props.startDate && props.endDate) {
        const group = props.group ?? ("weekly" as Group);
        const includePrevious = props.includePrevious || false;
        const includeToday = props.includeToday || false;
        const type = props.type || "debit";
        const volume = props.volume || "total";
        const volumeType = volume === "group" ? "group" : "total";
        const virtualOrReal = props.amountType === "virtual" ? "virtual" : "real";
        const key = balanceKeyMap?.[type]?.[virtualOrReal]?.[volumeType];

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

        const chartData = [] as any[];
        const chartColors: any[] = [];
        const theme = getTheme() || {};
        theme.transactionTypes = props.themeConfig || theme.transactionTypes;
        let chartOptions =
          Object.keys(props.chartOptions || {}).length > 0
            ? props.chartOptions
            : option;

        const balance = balances?.[0]?.[key] ?? {};
        if (Object.keys(balance).length) {
          setRawData(balances);
          for (let transactionType in balance) {
            if (
              props.transactionTypes &&
              !props.transactionTypes.includes(transactionType)
            ) {
              continue;
            }
            const transactionTypeTheme = theme.transactionTypes[transactionType];
            let colorForTransactionType = transactionTypeTheme?.chart?.color;
            if (!colorForTransactionType) {
              colorForTransactionType = makeRandomColor();
            }
            chartColors.push(colorForTransactionType);
            const bal = balance[transactionType];
            chartData.push({
              value: Math.abs(bal),
              name: props.identifierMapper
                ? props.identifierMapper[transactionType]
                : transactionType,
              transactionTypes: transactionType,
            });
          }
          chartOptions.series[0].data = chartData;
          chartOptions.series[0].color = chartColors;
        } else {
          chartOptions.series[0].data = [];
          chartOptions.series[0].color = [];
        }

        setChartOption(chartOptions);
      } else {
        // fallback to legacy per-transaction-type balances
        balances = await _fetchBalance(
          props.credentials,
          props.userId,
          props.currency
        );

        if (balances) {
          setRawData(balances);
          const chartData = [], chartColors = [];

          const theme = getTheme() || {};
          theme.transactionTypes = props.themeConfig || theme.transactionTypes;
          let chartOptions;
          chartOptions = Object.keys(props.chartOptions || {}).length
            ? props.chartOptions
            : option;
          for (let idx = 0; idx < balances.length; idx++) {
            const balnce = balances[idx];
            if (
              props.transactionTypes &&
              !props.transactionTypes.includes(balnce.transactionType)
            ) {
              continue;
            }
            const transactionTypeTheme =
              theme.transactionTypes[balnce.transactionType];
            let colorForTransactionType;

            if (transactionTypeTheme) {
              colorForTransactionType = transactionTypeTheme.chart.color;
            }

            if (!colorForTransactionType) {
              colorForTransactionType = makeRandomColor();
            }

            chartColors.push(colorForTransactionType);

            if (props.amountType === "amount") {
              chartData.push({
                value: Math.abs(balnce.amount),
                name: balnce.transactionType,
              });
            }
            if (props.amountType === "virtual") {
              chartData.push({
                value: Math.abs(balnce.virtualValue),
                name: balnce.transactionType,
              });
            }
          }

          chartOptions.series[0].data = chartData;
          chartOptions.series[0].color = chartColors;

          setChartOption(chartOptions);
        }
      }
      setLoading(false);
    };
    if ((props.userId, props.currency, props.amountType)) {
      fetchData();
    }
  }, [props.userId, props.currency, props.amountType, props.themeConfig]);

  // console.log(balance)
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
export default BalancesChart;
