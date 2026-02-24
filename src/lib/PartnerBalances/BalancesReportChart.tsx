import React, { useEffect, useState } from "react";
// import the core library.
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
import axios from "axios";
import { API_HOST } from "../../constants";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { _fetchGetBalances } from "../services/balances";
import moment from "moment";
import { getTheme, makeRandomColor } from "../../utilities/theme";
import { Group } from "../Reports/utils/utils";

// Register the required components only in browser environment
if (typeof window !== "undefined" && typeof document !== "undefined") {
  echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LineChart,
    CanvasRenderer,
  ]);
}

export interface BalanceReportChartFilterProps {
  endDate: Date;
  startDate: Date;
  userId: string;
  currency: string;
  credentials: any;
  label: string;
  reportKey: string;
  showRaw: boolean;
  transactionTypes?: string[];
  group: Group;
}

const option: any = {
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: [],
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "0%",
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
  series: [],
};

const BalancesReportChart = (props: BalanceReportChartFilterProps) => {
  const [loading, setLoading] = useState(false);
  const [chartOption, setChartOption] = useState();

  const [rawData, setRawData] = useState([]);
const group  = props.group as Group || "daily";
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const balanceReport: any = await _fetchGetBalances(
        props.credentials,
        props.userId,
        props.currency,
        props.startDate
          ? moment(props.startDate).format("YYYY-MM-DD")
          : moment().add(-7, "days").format("YYYY-MM-DD"),
        moment(props.endDate).format("YYYY-MM-DD"),
        "daily",
        true,
        true,
      );
      if (balanceReport) {
        const items = balanceReport.rows;
        setRawData(items);
        const theme = getTheme();

        const allDate: Array<string> = [];
        const legends: Array<string> = [];
        const series: any = [];
        items.forEach(
          (item: {
            virtualValues: unknown;
            amounts: unknown;
            date: string;
            [key: string]: any;
          }) => {
            allDate.push(item.date);
            const amounts = item[props.reportKey];
            // if (props.amountType === "amount") {
            //   amounts = item.amounts;
            // }
            // if (props.amountType === "virtual") {
            //   amounts = item.virtualValues;
            // }

            if (amounts) {
              const xData = Object.keys(amounts);

              for (let idx = 0; idx < xData.length; idx++) {
                const transactionType = xData[idx];
                if (
                  props.transactionTypes &&
                  !props.transactionTypes.includes(transactionType)
                ) {
                  continue;
                }
                let seriesOfTransactionType = series.find(
                  (s: any) => s.id === transactionType,
                );
                if (!seriesOfTransactionType) {
                  const transactionTypeTheme =
                    theme.transactionTypes[transactionType];
                  let colorForTransactionType;

                  if (transactionTypeTheme) {
                    colorForTransactionType = transactionTypeTheme.chart.color;
                  }

                  if (!colorForTransactionType) {
                    colorForTransactionType = makeRandomColor();
                  }

                  legends.push(transactionType);
                  seriesOfTransactionType = {
                    id: transactionType,
                    name: transactionType,
                    type: "line",
                    data: allDate.length > 1 ? Array(allDate.length) : [], // >1 because first dats is just added in the same loop
                    color: colorForTransactionType,
                  };
                  series.push(seriesOfTransactionType);
                }

                seriesOfTransactionType.data.push(
                  Math.abs(parseFloat(amounts[transactionType] || 0)),
                );
              }
            }
          },
        );

        option.legend.data = legends;
        option.xAxis.data = allDate;
        option.series = series;

        setChartOption(option);
        setLoading(false);
      }
    };
    fetchData();
  }, [
    props.userId,
    props.reportKey,
    props.currency,
    props.startDate,
    props.endDate,
    props.group,
  ]);

  //   const uniqueArray = names?.filter((value, index) => {
  //     return names?.indexOf(value) === index;
  //   });
  //   const newObjects = uniqueArray.map((item) => {
  //     const aArrays = [
  //       `${balance.map((ea) => {
  //         if (ea[item]) {
  //           return Math.abs(parseFloat(ea[item]));
  //         } else if (ea[item] === undefined) {
  //           return 0;
  //         }
  //       })}`,
  //     ];
  //     const strArray = aArrays[0].split(",");
  //     const numArray = strArray
  //       .filter((str) => str !== "")
  //       .map((str) => Number(str));
  //     const singleObject = {
  //       name: item,
  //       type: "line",
  //       data: numArray,
  //     };
  //     return singleObject;
  //   });

  return (
    <>
      {/* {loading && <h1>Loading</h1>} */}
      {props.showRaw ? (
        <>
          <div className="card">
            <SyntaxHighlighter language="javascript" style={docco}>
              {JSON.stringify(rawData, null, 2)}
            </SyntaxHighlighter>
          </div>
        </>
      ) : (
        <>
          {!loading && chartOption && (
            <ReactEChartsCore
              echarts={echarts}
              option={option}
              notMerge={true}
              lazyUpdate={true}
            />
          )}
        </>
      )}
    </>
  );
};
export default BalancesReportChart;
