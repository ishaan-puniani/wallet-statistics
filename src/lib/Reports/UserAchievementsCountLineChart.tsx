import React, { useEffect, useState } from "react";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { BarChart, PieChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { _fetchReportUserAchievementsCount } from "../services/balances";
import moment from "moment";
import styled from "styled-components";
import Loader from "./Loader";
import { makeXAxisData } from "./utils/utils";

// Register the required components
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
  PieChart,
  LegendComponent,
]);

export interface IUserAchievementsCountLineChart {
  userId: string;
  currency: string;
  credentials: any;
  showRaw?: boolean;
  transactionTypes?: string[];
  endDate: Date;
  startDate: Date;
  group: string;
}

const option: any = {
  tooltip: {
    show: true,
    trigger: "axis",
  },
  legend: {
    left: true,
    icon: "circle",
  },
  yAxis: [
    {
      type: "value",
    },
  ],
  series: [],
};

const UserAchievementsCountLineChart = (
  props: IUserAchievementsCountLineChart
) => {
  const [chartOption, setChartOption] = useState();
  const [loading, setLoading] = useState(true);
  const [rawData, setRawData] = useState<any>();
  const startDate = moment(props.startDate).format("YYYY-MM-DD");
  const endDate = moment(props.endDate).format("YYYY-MM-DD");
  const [group, setGroup] = useState(props?.group ?? "weekly");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const transactionsCount = await _fetchReportUserAchievementsCount(
        props.credentials,
        group
      );
      setRawData(transactionsCount);
      const countGroupedPeriodAndType =
        transactionsCount?.countGroupedPeriodAndType &&
        Object.keys(transactionsCount?.countGroupedPeriodAndType);
      const xAxis = makeXAxisData(
        countGroupedPeriodAndType,
        group,
        startDate,
        endDate
      );
      if (
        transactionsCount &&
        countGroupedPeriodAndType?.length &&
        xAxis?.length &&
        props.transactionTypes
      ) {
        option.xAxis = {
          type: "category",
          data: xAxis,
        };
        option.series = props.transactionTypes.map((transactionType) => {
          return {
            name: transactionType,
            type: "line",
            data: xAxis.map(
              (date) =>
                transactionsCount?.countGroupedPeriodAndType?.[date]?.[
                  transactionType
                ] ?? 0
            ),
          };
        });
      } else {
        option.xAxis = {
          type: "category",
          data: [],
        };
        option.series = [];
        setChartOption(option);
      }
      setLoading(false);
      setChartOption(option);
    };
    fetchData();
  }, [
    props.credentials,
    group,
    props.startDate,
    props.endDate,
    props.transactionTypes,
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

  const groupHandler = (group: string) => {
    setGroup(group);
  };

  return (
    <>
      {props?.showRaw ? (
        <>
          {rawData?.map((item: any) => (
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
            <Wrapper>
              <div className="grouping-btn">
                <div
                  className={`group group-daily ${
                    group === "daily" ? "selected" : ""
                  }`}
                >
                  <button onClick={() => groupHandler("daily")}>Daily</button>
                </div>
                <div
                  className={`group group-weekly ${
                    group === "weekly" ? "selected" : ""
                  }`}
                >
                  <button onClick={() => groupHandler("weekly")}>Weekly</button>
                </div>
                <div
                  className={`group group-monthly ${
                    group === "monthly" ? "selected" : ""
                  }`}
                >
                  <button onClick={() => groupHandler("monthly")}>
                    Monthly
                  </button>
                </div>
                <div
                  className={`group group-quarterly ${
                    group === "quarterly" ? "selected" : ""
                  }`}
                >
                  <button onClick={() => groupHandler("quarterly")}>
                    Quarterly
                  </button>
                </div>
                <div
                  className={`group group-yearly ${
                    group === "yearly" ? "selected" : ""
                  }`}
                >
                  <button onClick={() => groupHandler("yearly")}>Yearly</button>
                </div>
              </div>
              <ReactEChartsCore
                echarts={echarts}
                option={chartOption}
                notMerge={true}
                lazyUpdate={true}
              />
            </Wrapper>
          )}
        </div>
      )}
    </>
  );
};
export default UserAchievementsCountLineChart;

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
