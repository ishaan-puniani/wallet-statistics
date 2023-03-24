import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_HOST } from "../../constants";
import "./partner_balances.css";
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

export interface IPartnerBalancesLineChartProps {
  credentials?: any;
  userId?: string;
  currency?: "COINS" | "USD";
  amountType: "Amount" | "Virtual Value";
  startDate?: Date;
  endDate?: Date;
}

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
        data: [],
      },
    ],
  });

  const formatDate = (newDate: Date) => {
    const timestamp = newDate;
    const newStartDate = new Date(timestamp);
    const inputDate = new Date(newStartDate);
    const day = ("0" + inputDate.getDate()).slice(-2); // ensure leading zero if necessary
    const month = ("0" + (inputDate.getMonth() + 1)).slice(-2); // add 1 to month since January is 0
    const year = inputDate.getFullYear();
    const outputDateString = `${day}/${month}/${year}`;
    return outputDateString;
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchBalance = await axios.post(
        `${API_HOST}/tenant/${
          props.credentials.application_id
        }/reports/get-partner-balances-report-by-date?filter[userId]=${
          props.userId
        }&filter[currency]=${props.currency}&filter[dateRange][]=${formatDate(
          props.startDate
        )}&filter[dateRange][]=${formatDate(props.endDate)}`,
        {
          ...props.credentials,
        }
      );

      if (fetchBalance.data) {
        const chartDataDate = [];
        console.log(fetchBalance.data.rows);
        const chartSeriesData: { name: string; type: string; data: any[] }[] =
          []; // array for y-axis data

        for (let i = 0; i < fetchBalance.data.rows.length; i++) {
          if (props.amountType === "Amount") {
            chartDataDate.push(
              fetchBalance.data.rows[i].createdAt.split("T")[0]
            );

            const transactionTypesAmountBalance =
              fetchBalance.data.rows[i].transactionTypesAmountBalance;

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
          } else {
            chartDataDate.push(
              fetchBalance.data.rows[i].createdAt.split("T")[0]
            );
            const transactionTypesVirtualValue =
              fetchBalance.data.rows[i].transactionTypesVirtualValue;
            Object.keys(transactionTypesVirtualValue).forEach((type) => {
              const index = chartSeriesData.findIndex(
                (item) => item.name === type
              );
              if (index === -1) {
                // add new series for category
                chartSeriesData.push({
                  name: type,
                  type: "line",
                  data: [transactionTypesVirtualValue[type]],
                });
              } else {
                // add value to existing series for category
                chartSeriesData[index].data.push(
                  transactionTypesVirtualValue[type]
                );
              }
            });
            setData({
              title: {
                text: "Line Chart",
              },
              tooltip: {
                trigger: "axis",
              },
              legend: {
                data: Object.keys(
                  fetchBalance.data.rows[0].transactionTypesVirtualValue
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
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [
    props.userId,
    props.currency,
    props.startDate,
    props.endDate,
    props.amountType,
  ]);
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
