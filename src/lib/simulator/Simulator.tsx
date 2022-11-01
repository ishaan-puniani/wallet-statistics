import React, { useEffect, useState } from "react";
// import the core library.
import ReactEChartsCore from "echarts-for-react/lib/core";
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from "echarts/core";
// Import charts, all with Chart suffix
import { BarChart } from "echarts/charts";
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
import axios from "axios";

// Register the required components
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
]);

const options = {
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    data: [] as any,
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [] as any,
      type: "bar",
      smooth: false,
    },
  ],
  tooltip: {
    trigger: "axis",
  },
};

export interface ISimulatorProps {
  credentials?: any;
  userId?: string;
  currency?: "COINS" | "USD";
}

const Simulator = (props: ISimulatorProps) => {
  console.log("REACHED");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchBalance = await axios.post(
        `https://wallet-and-bonus-47kby.ondigitalocean.app/api/tenant/${props.credentials.application_id}/get-current-balances-for-transaction-types?filter[userId]=${props.userId}&filter[currency]=${props.currency}`
      );
      if (fetchBalance.data) {
        const values = fetchBalance.data;
        const chartLabels: any = [];
        const chartValues: any = [];
        values?.forEach((v: any) => {
          chartLabels.push([v.transactionType]);
          chartValues.push([v.transactionType, v.amount]);
        });
        options.xAxis.data = chartLabels;
        options.series[0].data = chartValues;
        // optionsConfig.series[1].data = calculateMA(
        //   chartValues,
        //   5,
        // );

        setBalance(options);
      }
      setLoading(false);
    };
    fetchData();
  }, [props.userId, props.currency]);

  return (
    <>
      <h2>Done</h2>
      {!loading && (
        <ReactEChartsCore
          echarts={echarts}
          option={balance}
          notMerge={true}
          lazyUpdate={true}
          theme={"theme_name"}
        />
      )}
    </>
  );
};
export default Simulator;
