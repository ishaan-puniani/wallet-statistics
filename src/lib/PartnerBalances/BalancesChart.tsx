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
} from "echarts/components";
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {
  CanvasRenderer,
  // SVGRenderer,
} from "echarts/renderers";
import axios from "axios";
import { API_HOST } from "../../constants";

// Register the required components
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
  PieChart,
]);


export interface ISimulatorProps {
  userId: unknown;
  currency: unknown;
  credentials: any;
  amountType: "Amount" | "Virtual Value"
}

const BalancesChart = (props: ISimulatorProps) => {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState([]);
  console.log(props.amountType)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchBalance = await axios.post(
        `${API_HOST}/tenant/${props.credentials.application_id}/get-current-balances-for-transaction-types?filter[userId]=${props.userId}&filter[currency]=${props.currency}`,
        // `${API_HOST}/tenant/${props.credentials.application_id}/get-balance-by-identifier-for-currency/de092340-812b-402f-8192-c814cf6aff21/${props.currency}`,
        {
          ...props.credentials,
        }
      );
      if (fetchBalance.data) {
        const datas = fetchBalance?.data
        console.log(datas)
        const modifiedArray = datas.map((item: { amount: any; transactionType: any; virtualValue: any; }) => {
          if (props.amountType === "Amount") {
            return {
              value: item.amount,
              name: item.transactionType
            };
          }
          return {
            value: item.virtualValue,
            name: item.transactionType
          };
        });
        setBalance(modifiedArray)
      }
      setLoading(false);
    };
    fetchData();
  }, [props.userId, props.currency, props.amountType]);
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: 'Area Mode',
        type: 'pie',
        radius: [20, 140],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 5
        },
        data: balance
      }
    ]
  };
  console.log("REACHED");
  // console.log(balance)
  return (
    <>
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
export default BalancesChart;
