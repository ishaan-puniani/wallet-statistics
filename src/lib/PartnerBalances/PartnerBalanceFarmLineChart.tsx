import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_HOST } from "../../constants";
import "./partner_balances.css";
export interface IPartnerBalancesLineChartProps {
  credentials?: any;
  userId?: string;
  currency?: "COINS" | "USD";
  startDate?: Date;
  endDate?: Date;
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

const PartnerBalanceFarmLineChart = (props: IPartnerBalancesLineChartProps) => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    title: {
      text: "Stacked Line",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: [],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "",
        type: "",
        stack: "",
        data: [],
      },
    ],
  });
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchBalance = await axios.post(
        `${API_HOST}/tenant/${props.credentials.application_id}/reports/get-partner-balances-report-by-date?filter[userId]=${props.userId}&filter[currency]=${props.currency}&filter[dateRange][]=${props.startDate}&filter[dateRange][]=${props.endDate}`,
        {
          ...props.credentials,
        }
      );

      if (fetchBalance.data) {
        console.log(fetchBalance.data.rows);
        const chartDataDate = [];
        const chartSeriesData = []; // array for y-axis data
        for (let i = 0; i < fetchBalance.data.rows.length; i++) {
          chartDataDate.push(fetchBalance.data.rows[i].createdAt.split("T")[0]);
          // chartDataDate.reverse()
          // loop through each transaction type category and push corresponding value to chartSeriesData
          const transactionTypesAmountBalance =
            fetchBalance.data.rows[i].transactionTypesAmountBalance;
          // console.log(transactionTypesAmountBalance)

          const keys = Object.keys(transactionTypesAmountBalance);

          keys.forEach((type) => console.log(type));
          // console.log(keys);
          Object.keys(transactionTypesAmountBalance).forEach((type) => {
            const index = chartSeriesData.findIndex(
              (item) => item.name === type
            );
            if (index === -1) {
              // add new series for category
              chartSeriesData.push({
                name: type,
                type: "line",
                data: [transactionTypesAmountBalance[type]],
              });
            } else {
              // add value to existing series for category
              chartSeriesData[index].data.push(
                transactionTypesAmountBalance[type]
              );
            }
          });
        }

        // console.log(chartSeriesData);
        setData({
          title: {
            text: "Line Chart",
          },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: Object.keys(
              fetchBalance.data.rows[0].transactionTypesAmountBalance
            ),
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: chartDataDate,
          },
          yAxis: {
            type: "value",
          },
          series: chartSeriesData, // use dynamically generated y-axis data
        });
      }

      // if (fetchBalance.data) {
      //   console.log(fetchBalance.data.rows);
      //   const chartDataDate = [];
      //   const chartName = [];
      //   for (let i = 0; i < fetchBalance.data.rows.length; i++) {
      //     chartDataDate.push(fetchBalance.data.rows[i].date);
      //     chartName.push(
      //       Object.keys(fetchBalance.data.rows[i].transactionTypesAmountBalance)
      //     );
      //     setData({
      //       title: {
      //         text: "Stacked Line",
      //       },
      //       tooltip: {
      //         trigger: "axis",
      //       },
      //       legend: {
      //         data: [
      //           "Email",
      //           "Union Ads",
      //           "Video Ads",
      //           "Direct",
      //           "Search Engine",
      //         ],
      //       },
      //       grid: {
      //         left: "3%",
      //         right: "4%",
      //         bottom: "3%",
      //         containLabel: true,
      //       },
      //       toolbox: {
      //         feature: {
      //           saveAsImage: {},
      //         },
      //       },
      //       xAxis: {
      //         type: "category",
      //         boundaryGap: false,
      //         data: chartDataDate,
      //       },
      //       yAxis: {
      //         type: "value",
      //       },
      //       series: [
      //         {
      //           name: "email",
      //           type: "line",
      //           stack: "Total",
      //           data: [120, 132, 101, 134, 90, 230, 210],
      //         },
      //       ],
      //     })
      //   }
      // }
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
