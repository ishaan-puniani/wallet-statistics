import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_HOST } from "../../constants";
import "./partner_balances.css";
export interface IPartnerBalancesProps {
  credentials?: any;
  userId?: string;
  currency?: "COINS" | "USD";
}
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

// Register the required components
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LineChart,
  CanvasRenderer,
]);

const PartnerBalanceFarmLineChart = (props: IPartnerBalancesProps) => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    xAxis: {
      type: "category",
      data: [],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [],
        type: "line",
      },
    ],
  });
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchBalance = await axios.post(
        `${API_HOST}/tenant/${props.credentials.application_id}/get-balance-by-identifier-for-currency/${props.userId}/${props.currency}?dateRange[]='10-03-2023'`,
        {
          ...props.credentials,
        }
      );
      if (fetchBalance.data) {
        console.log(fetchBalance.data)
        const chartData = fetchBalance.data.transactionTypesAmount;

        setData({
          xAxis: {
            type: "category",
            data: Object.keys(chartData),
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: Object.values(chartData),
              type: "line",
            },
          ],
        });
      }
      setLoading(false);
    };
    fetchData();
  }, [props.userId, props.currency]);
  return (
    <>
      <h2>Partner Balances : {props.userId}</h2>

      {loading && <h1>Loading</h1>}
      <ReactEChartsCore
        echarts={echarts}
        option={data}
        notMerge={true}
        lazyUpdate={true}
        theme={"theme_name"}
      />
    </>
  );
};
export default PartnerBalanceFarmLineChart;
