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
import { getTheme, makeRandomColor } from "../../utilities/theme";
import Loader from "../Reports/Loader";
import styled from "styled-components";

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
  showList?: boolean;
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
      const balances = await _fetchBalance(
        props.credentials,
        props.userId,
        props.currency,
      );

      if (balances) {
        setRawData(balances);
        const chartData = [],
          chartColors = [];

        const theme = getTheme() || {};
        theme.transactionTypes = props.themeConfig || theme.transactionTypes;
        let chartOptions;
        chartOptions = Object.keys(props.chartOptions).length
          ? props.chartOptions
          : option;
        console.log(theme, balances);
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
      setLoading(false);
    };
    if ((props.userId, props.currency, props.amountType)) {
      fetchData();
    }
  }, [props.userId, props.currency, props.amountType, props.themeConfig]);

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
            {rawData.map((record) => (
              <div className="balance-card">
                <div>
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/007/391/302/original/account-balance-flat-design-long-shadow-glyph-icon-payment-banking-wallet-with-credit-card-silhouette-illustration-vector.jpg"
                    alt=""
                  />
                  <p> {record.transactionType.slice(0, 17)}</p>
                </div>
                <p>
                  {props.amountType === "amount"
                    ? parseFloat(record.amount).toFixed(2)
                    : parseFloat(record.virtualValue).toFixed(2)}
                </p>
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
  .balance-card > div > p {
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
