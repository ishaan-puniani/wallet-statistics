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
import { _fetchReportUserAchievementsLogsCount } from "../services/balances";
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

export interface ICountPerAchievementsLogsTypePieChart {
  credentials: any;
  showRaw?: boolean;
}

const option: any = {
  tooltip: {
    show: true,
    trigger: "item",
  },
  legend: {
    orient: "vertical",
    left: "left",
  },
  series: [
    {
      name: "",
      type: "pie",
      radius: "80%",
      avoidLabelOverlap: true,
      itemStyle: {
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        minMargin: 5,
        edgeDistance: 5,
        lineHeight: 15,
        rich: {
          name: {
            fontSize: 15,
            color: "inherit",
          },
        },
      },
      labelLine: {
        show: true,
      },
      data: [],
    },
  ],
};

const CountPerAchievementsLogsTypePieChart = (
  props: ICountPerAchievementsLogsTypePieChart,
) => {
  const [loading, setLoading] = useState(false);
  const [chartOption, setChartOption] = useState();
  const [rawData, setRawData] = useState([]);
  const [group, setGroup] = useState<Group>("weekly");
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const transactionsCount = await _fetchReportUserAchievementsLogsCount(
        props.credentials,
        group,
      );
      setRawData(transactionsCount);

      let chartData;
      const countPerType =
        transactionsCount?.countPerType &&
        Object.keys(transactionsCount?.countPerType);
      if (countPerType?.length) {
        chartData = countPerType?.map((type: any) => {
          return {
            name: type,
            value: transactionsCount?.countPerType?.[type],
          };
        });
      }
      option.series[0].data = chartData ?? [];
      setLoading(false);
      setChartOption(option);
    };

    fetchData();
  }, [props.credentials, group]);

  if (loading) {
    return (
      <Wrapper>
        <div className="loader">
          <Loader />
        </div>
      </Wrapper>
    );
  }
  const handleGroupChange = (group: Group) => {
    setGroup(group);
  };
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
        <div style={{ marginTop: "20px", height: "100%" }}>
          {!loading && chartOption && (
            <>
              <PeriodToogle group={group} groupHandler={handleGroupChange} />
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

export default CountPerAchievementsLogsTypePieChart;

const Wrapper = styled.div`
  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
