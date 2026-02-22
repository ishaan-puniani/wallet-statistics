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
  LegendComponent,
} from "echarts/components";
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {
  CanvasRenderer,
  // SVGRenderer,
} from "echarts/renderers";

import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { _fetchGetBalances } from "../services/balances";
import { makeRandomColor } from "../../utilities/theme";
import moment from "moment";
import styled from "styled-components";
import Loader from "./Loader";
import { Group } from "./utils/utils";
import PeriodToogle from "./utils/PeriodToogle";

// Register the required components only in browser environment
if (typeof window !== "undefined" && typeof document !== "undefined") {
  echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    BarChart,
    CanvasRenderer,
    PieChart,
    LegendComponent,
  ]);
}

// const chartThemeConfig = {
//   AMOUNT: "blue",
// };

const transactionType = [
  {
    type: "debit",
    label: "Amount",
    transactionType: "AMOUNT",
  },
];

export interface IPartnerBalancesPieChartProps {
  userId: string;
  currency: string;
  credentials: any;
  showRaw?: boolean;
  transactionTypes?: string[];
  chartType?: string;
  chartOptions?: any;
  themeConfig: any;
  endDate: Date;
  startDate: Date;
  group: Group;
  supportedGrouping?: Group[];
  includePrevious: boolean;
  includeToday: boolean;
  amountType?: "amount" | "virtual";
}
// prettier-ignore
const monthlyXAxisData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const option: any = {
  tooltip: {
    show: true,
    trigger: "axis",
  },
  legend: {
    data: ["Amount"],
    left: true,
    icon: "circle",
  },
  xAxis: [
    {
      type: "category",
      data: monthlyXAxisData,
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  series: [],
};

const GroupReportChart = (props: IPartnerBalancesPieChartProps) => {
  const [chartOption, setChartOption] = useState();
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState<Group>(props?.group ?? "daily");
  const supportedGrouping = props?.supportedGrouping ?? ["monthly"];

  const transactionTypes =
    props.transactionTypes.length > 0
      ? props.transactionTypes
      : transactionType;

  const themeConfig =
    Object.keys(props.themeConfig).length > 0 ? props.themeConfig : null;

  const chartType = props.chartType || "bar";
  const includePrevious = props.includePrevious || false;
  const includeToday = props.includeToday || false;

  const chartOptions = Object.keys(props.chartOptions).length
    ? props.chartOptions
    : option;

  // const getDateRange = (group: any) => {
  //   if (group === "monthly") {
  //     const start = moment(props.startDate).startOf("year").startOf("month");
  //     const end = moment(props.startDate).endOf("year").endOf("month");
  //     return {
  //       startDate: start.format("YYYY-MM-DD"),
  //       endDate: end.format("YYYY-MM-DD"),
  //     };
  //   } else if (group === "daily" || group === "weekly") {
  //     return {
  //       startDate: moment(props.startDate).format("YYYY-MM-DD"),
  //       endDate: moment(props.endDate).format("YYYY-MM-DD"),
  //     };
  //   }
  // };

  const groupHandler = (group: Group) => {
    setGroup(group);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const balances = await _fetchGetBalances(
        props.credentials,
        props.userId,
        props.currency,
        moment(props.startDate).format("YYYY-MM-DD"),
        moment(props.endDate).format("YYYY-MM-DD"),
        group,
        includePrevious,
        includeToday,
      );
      setRawData(balances);

      if (transactionTypes.length) {
        chartOptions.series = transactionTypes?.map((dataType: any) => {
          return {
            name: dataType.label,
            type: chartType,
            data: balances.map((row: any) => {
              if (dataType.type === "debit") {
                if (props.amountType === "virtual") {
                  return (
                    row?.groupedDebitVirtualValues[dataType?.transactionType] ||
                    0
                  );
                } else {
                  return (
                    row?.groupedDebitAmounts[dataType?.transactionType] || 0
                  );
                }
              } else if (dataType.type === "credit") {
                if (props.amountType === "virtual") {
                  return (
                    row?.groupedCrediVirtualValues[dataType?.transactionType] ||
                    0
                  );
                } else {
                  return (
                    row?.groupedCreditAmounts[dataType?.transactionType] || 0
                  );
                }
              } else if (dataType.type === "balance") {
                if (props.amountType === "virtual") {
                  return (
                    row?.groupedVirtualValues[dataType?.transactionType] || 0
                  );
                } else {
                  return row?.groupedAmounts[dataType?.transactionType] || 0;
                }
              }
            }),
            itemStyle: {
              color:
                (themeConfig && themeConfig[dataType?.label]) ||
                makeRandomColor(),
            },
            smooth: true,
            symbol: "none",
            lineStyle: {
              width: 3,
            },
          };
        });
        if (group === "weekly" || group === "daily") {
          const dateList = balances.map(({ date }: { date: any }) =>
            moment(date).format("MMM DD"),
          );
          chartOptions.xAxis[0].data = dateList;
        } else {
          chartOptions.xAxis[0].data = monthlyXAxisData;
        }
      }

      setChartOption(chartOptions);
      setLoading(false);
    };

    fetchData();
  }, [
    props.userId,
    props.currency,
    props.startDate,
    props.endDate,
    props.chartType,
    props.themeConfig,
    props.transactionTypes,
    group,
    props.amountType,
  ]);

  if (loading) {
    return (
      <Wrapper>
        <div className="loader">
          <Loader />
        </div>
      </Wrapper>
    );
  }

  return (
    <>
      {props?.showRaw ? (
        <>
          {rawData?.map((item) => (
            <>
              <div className="card">
                <SyntaxHighlighter language="javascript" style={docco}>
                  {JSON.stringify(item, null, 2)}
                </SyntaxHighlighter>
              </div>
            </>
          ))}
        </>
      ) : (
        <div>
          {!loading && chartOption && (
            <>
              <PeriodToogle
                group={group}
                groupHandler={groupHandler}
                supportedGrouping={supportedGrouping}
              />
              <ReactEChartsCore
                echarts={echarts}
                option={chartOption}
                notMerge={true}
                lazyUpdate={true}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};
export default GroupReportChart;

const Wrapper = styled.div`
  .grouping-btn {
    display: flex;
    justify-content: end;
  }
  .group {
    > button {
      padding: 8px;
      color: rgb(96, 96, 96);
      background-color: #fff;
      border: 1px solid #000;
      cursor: pointer;
    }
  }
  .selected {
    > button {
      border-color: blue;
    }
  }
  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
