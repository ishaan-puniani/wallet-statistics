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

const option = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: "line",
    },
  ],
};

const PartnerBalanceFarmLineChart = (props: IPartnerBalancesProps) => {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState([]);

  //  post(
  //     `/tenant/:tenantId/get-balance-by-identifier-for-currency/:identifier/:currency?dateRange[]='10-03-2023'`,
  //   );
  //   /tenant/:tenantId/get-balance-by-identifier-for-currency/:identifier/:currency
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
        setBalance(fetchBalance.data);
      }
      setLoading(false);
    };
    fetchData();
  }, [props.userId, props.currency]);

  // let transactionTypesAmount = {};
  // transactionTypesAmount = balance?.transactionTypesAmount;
  // console.log(transactionTypesAmount , balance);
  return (
    <>
      <h2>Partner Balances : {props.userId}</h2>

      {loading && <h1>Loading</h1>}
      <ReactEChartsCore
        echarts={echarts}
        option={option}
        notMerge={true}
        lazyUpdate={true}
        theme={"theme_name"}
      />
    </>
  );
};
export default PartnerBalanceFarmLineChart;
