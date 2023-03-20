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

  // const [data, setData] = useState({
  //   title: {
  //     text: "Different Types of Payments",
  //     subtext: "Amounts",
  //     left: "center",
  //   },
  //   tooltip: {
  //     trigger: "item",
  //   },
  //   legend: {
  //     orient: "vertical",
  //     left: "left",
  //   },
  //   series: [
  //     {
  //       name: "Amount",
  //       type: "pie",
  //       radius: "50%",

  //       data: [
  //         { value: 12.9706, name: "MINT_BURN" },
  //         // { value: 0.0, name: "REGISTER_LICENSE" },
  //         // { value: 0.0, name: "WALLET_CPWALLET_FEE" },
  //         // { value: 13.0171, name: "UNLOCKED" },
  //         // { value: 91.4727, name: "LOCKED" },
  //         // { value: 259.5346, name: "PORTFOLIO" },
  //         // { value: 18.304, name: "UNLOCKED_WALLET_FEE" },
  //         // { value: 0.0, name: "MINT" },
  //         // { value: 5.767, name: "MINING_FEES" },
  //         // { value: 3.8651, name: "REFERRAL_SIGNUP_REWARDS" },
  //         // { value: 2.1, name: "MINING_REWARDS_WALLET_FEE" },
  //         // { value: 9.9008, name: "MINT_REWARDS" },
  //         // { value: 4.4603, name: "REFERRAL" },
  //         // { value: 26.171, name: "FEE" },
  //         // { value: 89.9751, name: "MINING_REWARDS" },
  //         // { value: 0.5952, name: "COMMISSION" },
  //         // { value: 169.5595, name: "WALLET" },
  //         // { value: 110.2103, name: "MINED" },
  //       ],

  //       emphasis: {
  //         itemStyle: {
  //           shadowBlur: 10,
  //           shadowOffsetX: 0,
  //           shadowColor: "rgba(0, 0, 0, 0.5)",
  //         },
  //       },
  //     },
  //   ],
  // });

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

    // setData({
    //   backgroundColor: '#ffffff',
    //   title: {
    //     text: 'Transaction Type',
    //     left: 'center',
    //     top: 20,
    //     textStyle: {
    //       color: '#000000'
    //     }
    //   },
    //   tooltip: {
    //     trigger: 'item'
    //   },
    //   visualMap: {
    //     show: false,
    //     min: 80,
    //     max: 600,
    //     inRange: {
    //       colorLightness: [0, 1]
    //     }
    //   },
    //   series: [
    //     {
    //       name: 'Amount',
    //       type: 'pie',
    //       radius: '55%',
    //       center: ['50%', '50%'],
    //       data: chartData.sort(function (a, b) {
    //         return a.value - b.value;
    //       }),
    //       roseType: 'radius',
    //       label: {
    //         color: '#000000'
    //       },
    //       labelLine: {
    //         lineStyle: {
    //           color: '#000000'
    //         },
    //         smooth: 0.2,
    //         length: 10,
    //         length2: 20
    //       },
    //       itemStyle: {
    //         color: '#14a3c7',
    //         shadowBlur: 200,
    //         shadowColor: 'rgba(0, 0, 0, 0.5)'
    //       },
    //       animationType: 'scale',
    //       animationEasing: 'elasticOut',
    //       animationDelay: function (idx) {
    //         return Math.random() * 200;
    //       }
    //     }
    //   ]
    // });
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
