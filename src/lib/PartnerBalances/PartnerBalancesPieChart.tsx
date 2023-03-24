import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_HOST } from "../../constants";
import "./PartnerBalancesPieChart.css";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { PieChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
} from "echarts/components";

import {
  CanvasRenderer,
  // SVGRenderer,
} from "echarts/renderers";

export interface IPartnerBalancesPieChartProps {
  credentials?: any;
  userId?: string;
  currency?: "COINS" | "USD";
}

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PieChart,
  CanvasRenderer,
]);

const PartnerBalancesPieChart = (props: IPartnerBalancesPieChartProps) => {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState([]);

  const [data, setData] = useState({
    title: {
      text: "Different Types of Payments",
      subtext: "Amounts",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Amount",
        type: "pie",
        radius: "50%",

        data: [{ value: 12, name: "amount" }],

        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchBalance = await axios.post(
        `${API_HOST}/tenant/${props.credentials.application_id}/get-current-balances-for-transaction-types?filter[userId]=${props.userId}&filter[currency]=${props.currency}`,
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

  useEffect(() => {
    // Map the `balance` data to an array of objects that can be used in the pie chart

    const chartData = balance.map((item) => ({
      name: item.transactionType,
      value: parseInt(item.amount),
    }));

    setData({
      title: {
        text: "Different Types of Payments",
        subtext: "Amounts",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "Amount",
          type: "pie",
          radius: "50%",

          data: chartData,

          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    });

  }, [balance]);
  return (
    <>
      <h2>Partner Balances : {props.userId}</h2>

      {loading && <h1>Loading</h1>}
      <ReactEChartsCore
        echarts={echarts}
        // option={data}
        option={data}
        notMerge={true}
        lazyUpdate={true}
        theme={"theme_name"}
      />
    </>
  );
};
export default PartnerBalancesPieChart;
