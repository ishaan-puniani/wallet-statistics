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
import PeriodToogle from "./utils/PeriodToogle";
import { Group } from "./utils/utils";

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
  group: string;
  includePrevious: boolean;
  includeToday: boolean;
  amountType?: "amount" | "virtual";
  setChartLoading?: any;
  absolute?: boolean;
}

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
      // prettier-ignore
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  series: [],
};

/**
 * ReportChart
 *
 * A reusable ECharts-based chart component that fetches grouped balance data
 * and renders it as a time-series chart. The component fetches data via
 * `_fetchGetBalances` using `props.credentials`, `props.userId`, `props.currency`,
 * and the selected `group`/date range, then maps the returned `balances` into
 * ECharts `xAxis` and `series` values.
 *
 * Props (shape defined by `IPartnerBalancesPieChartProps`):
 * - userId: string (required) - user identifier used when fetching balances.
 * - currency: string (required) - currency code used when fetching balances.
 * - credentials: any (required) - service credentials passed to `_fetchGetBalances`.
 * - startDate: Date (required) - start of the date range for the fetch.
 * - endDate: Date (required) - end of the date range for the fetch.
 * - group: string ('daily'|'weekly'|'monthly') - initial grouping granularity.
 * - transactionTypes: Array<{ type, label, transactionType }> - list of series
 *   descriptors. Each object should include `type` ('debit'|'credit'|'balance'),
 *   `label` (display name used in legend/series.name) and `transactionType`
 *   (key used to read grouped values from the fetched rows).
 * - chartType: string - ECharts series type (e.g. 'bar' or 'line').
 * - chartOptions: any - base ECharts option object to merge/override defaults.
 * - themeConfig: Record<string, string> - optional mapping of series labels to
 *   colors; if absent a random color is used per series.
 * - showRaw: boolean - when true the component renders the raw `balances`
 *   JSON rather than the chart (useful for debugging).
 * - includePrevious / includeToday: boolean - flags forwarded to the fetch to
 *   include previous-period or today data.
 * - amountType: 'amount'|'virtual' - selects which grouped fields to use from
 *   the fetched rows (e.g. `groupedDebitAmounts` vs `groupedDebitVirtualValues`).
 * - absolute: boolean - when true the numeric values are converted to
 *   `Math.abs(...)` before rendering (useful for plotting magnitudes).
 * - setChartLoading: (loading: boolean) => void - optional callback invoked
 *   with loading state changes so a parent can control global loading UX.
 *
 * Behavior summary:
 * - Fetches balances on mount and whenever relevant props change.
 * - Builds `xAxis` from fetched rows (formatted as 'YYYY-MM-DD').
 * - Builds `series` using `transactionTypes`, applying `themeConfig` colors or
 *   a random color per series; supports `absolute` and `amountType` options.
 * - Shows a local loading indicator while fetching and calls `setChartLoading`
 *   if provided.
 */
const ReportChart = (props: IPartnerBalancesPieChartProps) => {
  const [chartOption, setChartOption] = useState();
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState<Group>(
    (props.group as Group) || "monthly",
  );
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (props?.setChartLoading) {
        props?.setChartLoading(true);
      }

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

      const localChartOptions: any = {
        ...chartOptions,
        xAxis: Array.isArray(chartOptions.xAxis)
          ? [...chartOptions.xAxis]
          : [{ ...option.xAxis[0] }],
      };

      const xAxisData = balances.map((row: any) => {
        return row && row.date ? moment(row.date).format("YYYY-MM-DD") : "";
      });

      localChartOptions.xAxis[0] = {
        ...(localChartOptions.xAxis[0] || {}),
        data: xAxisData,
      };

      if (transactionTypes.length) {
        localChartOptions.series = transactionTypes?.map((dataType: any) => {
          return {
            name: dataType.label,
            type: chartType,
            data: balances.map((row: any) => {
              if (dataType.type === "debit") {
                if (props.amountType === "virtual") {
                  return props?.absolute
                    ? Math.abs(
                        row?.groupedDebitVirtualValues[
                          dataType?.transactionType
                        ],
                      ) || 0
                    : row?.groupedDebitVirtualValues[
                        dataType?.transactionType
                      ] || 0;
                } else {
                  return props?.absolute
                    ? Math.abs(
                        row?.groupedDebitAmounts[dataType?.transactionType],
                      ) || 0
                    : row?.groupedDebitAmounts[dataType?.transactionType] || 0;
                }
              } else if (dataType.type === "credit") {
                if (props.amountType === "virtual") {
                  return props?.absolute
                    ? Math.abs(
                        row?.groupedCrediVirtualValues[
                          dataType?.transactionType
                        ],
                      ) || 0
                    : row?.groupedCrediVirtualValues[
                        dataType?.transactionType
                      ] || 0;
                } else {
                  return props?.absolute
                    ? Math.abs(
                        row?.groupedCreditAmounts[dataType?.transactionType],
                      ) || 0
                    : row?.groupedCreditAmounts[dataType?.transactionType] || 0;
                }
              } else if (dataType.type === "balance") {
                if (props.amountType === "virtual") {
                  return props?.absolute
                    ? Math.abs(
                        row?.groupedVirtualValues[dataType?.transactionType],
                      ) || 0
                    : row?.groupedVirtualValues[dataType?.transactionType] || 0;
                } else {
                  return props?.absolute
                    ? Math.abs(
                        row?.groupedAmounts[dataType?.transactionType],
                      ) || 0
                    : row?.groupedAmounts[dataType?.transactionType] || 0;
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
      }

      setChartOption(localChartOptions);
      setLoading(false);
      if (props?.setChartLoading) {
        props?.setChartLoading(false);
      }
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
    props.group,
    props.amountType,
  ]);
  const groupHandler = (group: Group) => {
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
        <div style={{ marginTop: "20px" }}>
          {!loading && chartOption && (
            <>
              <PeriodToogle group={group} groupHandler={groupHandler} />
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
export default ReportChart;
