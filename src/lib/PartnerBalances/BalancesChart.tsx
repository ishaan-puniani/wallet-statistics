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
import Loader from "../Reports/Loader";
import styled from "styled-components";
import moment from "moment";
import { Group } from "../Reports/utils/utils";

// Register the required components only in browser environment
if (typeof window !== "undefined" && typeof document !== "undefined") {
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
  showList: boolean;
  startDate: Date;
  endDate: Date;
  group: Group;
  includePrevious: boolean;
  includeToday: boolean;
  volume: string;
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
  const [rawData, setRawData] = useState<any[]>([]);
  const group = (props.group as Group) || "monthly";
  const includeToday = props.includeToday || true;
  const includePrevious = props.includePrevious || true;

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
        includePrevious,
        includeToday
      );

      if (Array.isArray(balances) && balances.length) {
        const latestBalance = balances[balances.length - 1];
        const amountKey =
          props.amountType === "virtual" ? "totalVirtualValues" : "totalAmounts";
        const totalAmounts: Record<string, number> =
          (latestBalance && latestBalance[amountKey]) || {};

        const entries = Object.entries(totalAmounts);
        const filteredEntries =
          props.transactionTypes && props.transactionTypes.length
            ? entries.filter(([transactionType]) =>
                props.transactionTypes!.includes(transactionType)
              )
            : entries;

        setRawData(filteredEntries);

        const chartData: { value: number; name: string }[] = [];
        const chartColors: string[] = [];

        const theme = getTheme() || {};
        theme.transactionTypes = props.themeConfig || theme.transactionTypes;

        const chartOptions =
          Object.keys(props.chartOptions).length > 0
            ? props.chartOptions
            : option;

        for (let idx = 0; idx < filteredEntries.length; idx++) {
          const [transactionType, value] = filteredEntries[idx];
          const transactionTypeTheme = theme.transactionTypes
            ? theme.transactionTypes[transactionType]
            : undefined;

          let colorForTransactionType;

          if (transactionTypeTheme && transactionTypeTheme.chart) {
            colorForTransactionType = transactionTypeTheme.chart.color;
          }

          if (!colorForTransactionType) {
            colorForTransactionType = makeRandomColor();
          }

          chartColors.push(colorForTransactionType);

          chartData.push({
            value: Math.abs(Number(value) || 0),
            name: transactionType,
          });
        }

        chartOptions.series[0].data = chartData;
        chartOptions.series[0].color = chartColors;

        setChartOption(chartOptions);
      } else {
        setRawData([]);
        setChartOption(undefined);
      }
      setLoading(false);
    };

    if (props.userId && props.currency && props.amountType) {
      fetchData();
    }
  }, [
    props.userId,
    props.currency,
    props.amountType,
    props.themeConfig,
    props.transactionTypes,
    props.startDate,
    props.endDate,
    props.includePrevious,
    includeToday,
    group,
  ]);
  // console.log(balance)
  if (loading) {
    return (
      <Wrapper>
        <div className="loader">
          <Loader />
        </div>
      </Wrapper>
    );
  }
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
      ) : props.showList ? (
        <PartnerBalancesWrapper>
          <div className="balance-Wrapper">
            {rawData.map(([transactionType, value]) => (
              <div className="balance-card" key={transactionType}>
                <div>
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/007/391/302/original/account-balance-flat-design-long-shadow-glyph-icon-payment-banking-wallet-with-credit-card-silhouette-illustration-vector.jpg"
                    alt=""
                  />
                  <p>{String(transactionType).slice(0, 17)}</p>
                </div>
                <p>{Number(value).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </PartnerBalancesWrapper>
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
const PartnerBalancesWrapper = styled.div`
  .wrapper {
    display: flex;
    flex-wrap: wrap;
  }
  .card {
    max-width: 350px;
    padding: 15px;
    width: 100%;
    margin: 10px;
    border: 1px solid black;
    border-radius: 10px;
  }

  .card-content {
    font-size: 14px;
    letter-spacing: 0.5px;
    line-height: 1.5;
  }
  .balance-Wrapper {
    max-width: 350px;
    padding: 15px;
    width: 100%;
    line-height: 0;
    border: 1px solid rgb(250, 247, 247);
    border-radius: 5px;
    box-shadow: 1px 1px 5px 1px rgb(214, 213, 213);
  }
  .balance-card {
    display: flex;
    justify-content: space-between;
  }
  .balance-card > div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3px;
  }
  .balance-card > div > img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  .balance-card > p {
    margin-top: auto;
    margin-bottom: auto;
  }
`;
const Wrapper = styled.div`
  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
export default BalancesChart;
