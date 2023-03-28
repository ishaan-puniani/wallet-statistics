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
  LegendComponent
} from "echarts/components";

import {
  CanvasRenderer,
  // SVGRenderer,
} from "echarts/renderers";

import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

export interface IPartnerBalancesPieChartProps {
  credentials?: any;
  userId?: string;
  currency?: "COINS" | "USD";
  showRaw?: boolean
}

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PieChart,
  CanvasRenderer,
  LegendComponent
]);

const PartnerBalancesPieChart = (props: IPartnerBalancesPieChartProps) => {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState([]);

  const [data, setData] = useState({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '0%',
      left: 'center'
    },
    grid: {
      top: 1000,
      left: 60,
      right: 60,
      bottom: 60,
    },
    series: [
      {
        name: 'Wallet And Bonus',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }
    ]
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
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '0%',
        left: 'center'
      },
      grid: {
        top: 1000,
        left: 60,
        right: 60,
        bottom: 60,
      },
      series: [
        {
          name: 'Wallet And Bonus',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: chartData
        }
      ]
    });

  }, [balance]);
  console.log(balance)
  return (
    <>
      {loading && <h1>Loading</h1>}
      {props?.showRaw ? <>
        {balance?.map(item => <>
          <div className="card">
            <SyntaxHighlighter language="javascript" style={docco}>
              {JSON.stringify(item, null, 2)}
            </SyntaxHighlighter>
          </div></>)}
      </> : <div style={{ marginTop: '20px' }}>
        <ReactEChartsCore
          echarts={echarts}
          // option={data}
          option={data}
          notMerge={true}
          lazyUpdate={true}
          theme={"theme_name"}
        /></div>}
    </>
  );
};
export default PartnerBalancesPieChart;
