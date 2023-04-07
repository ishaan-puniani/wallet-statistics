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
import axios from "axios";
import { API_HOST } from "../../constants";

import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

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
  userId: unknown;
  currency: unknown;
  credentials: any;
  amountType: "amount" | "virtual";
  showRaw?: boolean;
}

const BalancesChart = (props: IPartnerBalancesPieChartProps) => {
  // const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState([]);
  const [rawData, setRawData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      const fetchBalance = await axios.post(
        `${API_HOST}/tenant/${props.credentials.application_id}/get-current-balances-for-transaction-types?filter[userId]=${props.userId}&filter[currency]=${props.currency}`,
        {
          ...props.credentials,
        }
      );
      if (fetchBalance.data) {
        const datas = fetchBalance?.data;
        setRawData(datas);
        const modifiedArray = datas.map(
          (item: { amount: any; transactionType: any; virtualValue: any }) => {
            if (props.amountType === "amount") {
              return {
                value: Math.abs(item.amount),
                name: item.transactionType,
              };
            }
            return {
              value: Math.abs(item.virtualValue),
              name: item.transactionType,
            };
          }
        );
        setBalance(modifiedArray);
      }
      // setLoading(false);
    };
    fetchData();
  }, [props.userId, props.currency, props.amountType]);
  const option = {
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
        name: "Wallet And Bonus",
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
        data: balance,
      },
    ],
  };
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
        <div style={{ marginTop: "20px" }}>
          <ReactEChartsCore
            echarts={echarts}
            option={option}
            notMerge={true}
            lazyUpdate={true}
            theme={"theme_name"}
          />
        </div>
      )}
    </>
  );
};
export default BalancesChart;
