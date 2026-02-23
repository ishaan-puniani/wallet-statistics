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
import Loader from "./Loader";
import styled from "styled-components";

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
  supportedGrouping?: Group[];
  chartType?: string;
  chartOptions?: any;
  themeConfig: any;
  endDate: Date;
  startDate: Date;
  group: Group;
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
 * Purpose
 * -------
 * A general-purpose time-series chart wrapper around ECharts that fetches
 * grouped balances (via `_fetchGetBalances`) and renders them as chart series.
 * This file provides the core mapping logic from the backend grouped response
 * into ECharts `xAxis` and `series` payloads. Other report components (pie
 * charts, mini-cards and line charts) reuse the same shape of data or the
 * helper services used here.
 *
 * Key responsibilities
 * --------------------
 * - Fetch balances for `userId` + `currency` over a date range and grouping
 *   granularity (`daily|weekly|monthly`).
 * - Convert fetched rows into `xAxis.data` (YYYY-MM-DD strings) and one
 *   or more `series` entries according to `transactionTypes` prop.
 * - Respect `amountType` (real `amount` vs `virtual`), `absolute` (abs value)
 *   and `themeConfig` (color overrides for series by label).
 * - Expose a debug mode (`showRaw`) that prints the raw rows for troubleshooting.
 *
 * Props (see `IPartnerBalancesPieChartProps` interface below)
 * -----------------------------------------------------------
 * - `userId` (string) required: identity used by the balances service.
 * - `currency` (string) required: currency code to fetch balances for.
 * - `credentials` (any) required: authorization/credentials object forwarded
 *    to `_fetchGetBalances`.
 * - `startDate`, `endDate` (Date) required: inclusive range to query.
 * - `group` ('daily'|'weekly'|'monthly') optional: grouping of returned rows.
 * - `transactionTypes` (Array<{type,label,transactionType}>) optional: controls
 *    which series are produced. Each item must include:
 *      - `type`: 'debit' | 'credit' | 'balance' (selects which grouped field)
 *      - `label`: series display name (legend + series.name)
 *      - `transactionType`: key used to read the grouped value off the row
 *        (for example, `AMOUNT`).
 * - `chartType` (string) optional: ECharts series type, e.g. 'bar' or 'line'.
 * - `chartOptions` (object) optional: base option object merged with defaults.
 * - `themeConfig` (object) optional: mapping `{ [label]: '#hex' }` to fix colors.
 * - `includePrevious`, `includeToday` (boolean) optional: forwarded to fetch.
 * - `amountType` 'amount'|'virtual' optional: switches to grouped*Virtual*.
 * - `absolute` (boolean) optional: plot magnitudes (absolute values).
 * - `setChartLoading` ((boolean) => void) optional: notify parent about loading.
 * - `showRaw` (boolean) optional: render JSON instead of chart for debugging.
 *
 * Example usage (fe-wallet-and-bonus integration)
 * -----------------------------------------------
 * In `fe-wallet-and-bonus` the chart is rendered by creating a
 * `WalletStatistics` instance and calling `renderReportChart(div, options)`.
 * This component is not always used directly as JSX in that repo; instead
 * the wrapper provides a div ref and passes an options object similar to:
 *
 * const walletStatistics = new WalletStatistics();
 * walletStatistics.renderReportChart(domElement, {
 *   credentials: { application_id: application_id },
 *   userId: configuration.partnerId,
 *   currency: configuration.currency.id,
 *   transactionTypes: configuration.transactionTypesConfig
 *     ? JSON.parse(configuration.transactionTypesConfig)
 *     : [{ type: 'debit', label: 'Amount', transactionType: 'AMOUNT' }],
 *   themeConfig: configuration.chartThemeConfig
 *     ? JSON.parse(configuration.chartThemeConfig)
 *     : { AMOUNT: '#87E05D' },
 *   amountType: configuration.amountType || 'amount',
 *   chartType: configuration.chartType || 'bar',
 *   chartOptions: configuration.chartType === 'line' ? lineChartOption : barChartOption,
 *   startDate: configuration.startDate,
 *   endDate: configuration.endDate,
 *   group: configuration.group || 'monthly',
 *   includePrevious: false,
 *   includeToday: true,
 * });
 *
 * Notes for integrators (fe-wallet-and-bonus mapping)
 * -----------------------------------------------------
 * The front-end application `fe-wallet-and-bonus` extracts and wraps many of
 * these report components to create widgets. Example mappings in that repo:
 * - This core chart -> src/view/widgets/PartnerReportChart.tsx
 * - Report balance pie chart -> src/view/widgets/PartnerReportBalancePieChart.tsx
 * - Mini/summary cards in `Reports/MiniCard.tsx` -> PartnerReportMiniBalanceCard.tsx
 * - Line charts in this folder -> PartnerCountLineChart.tsx, TransactionCountLineChart.tsx
 *
 * When adding or changing props here, update the corresponding wrapper in
 * `fe-wallet-and-bonus/src/view/widgets/*` so the integration keeps the same
 * prop names and behavior.
 *
 * Implementation details
 * ----------------------
 * - The component expects `_fetchGetBalances` to return an array of rows with
 *   the following (typical) fields for grouped responses:
 *     - `date` (ISO string) used for xAxis values
 *     - `groupedAmounts`, `groupedDebitAmounts`, `groupedCreditAmounts`
 *     - `groupedVirtualValues`, `groupedDebitVirtualValues`, `groupedCrediVirtualValues`
 *   The keys inside those grouped objects should match the `transactionType`
 *   values passed via `transactionTypes`.
 * - Color assignment: `themeConfig[label]` takes precedence, otherwise a
 *   random color is generated via `makeRandomColor()`.
 * - The component is intentionally small and focused: it only builds an
 *   `option` object for ECharts and delegates rendering to `ReactEChartsCore`.
 *
 * Debugging tips
 * --------------
 * - Use `showRaw={true}` to print the fetched rows (JSON) so you can verify
 *   the exact keys that `_fetchGetBalances` returned. This makes mapping
 *   `transactionType` values to grouped keys straightforward.
 * - If the chart shows zeros, confirm whether your `amountType` should be
 *   `virtual` vs `amount` and whether the backend returns the expected keys.
 */
const ReportChart = (props: IPartnerBalancesPieChartProps) => {
  const [chartOption, setChartOption] = useState();
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState<Group>(
    (props.group as Group) || "monthly",
  );
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
              if (props.amountType === "virtual") {
                return props?.absolute
                  ? Math.abs(
                      row?.groupedVirtualValues[dataType?.transactionType],
                    ) || 0
                  : row?.groupedVirtualValues[dataType?.transactionType] || 0;
              } else {
                return props?.absolute
                  ? Math.abs(row?.groupedAmounts[dataType?.transactionType]) ||
                      0
                  : row?.groupedAmounts[dataType?.transactionType] || 0;
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
    group,
    props.amountType,
  ]);

  const groupHandler = (group: Group) => {
    setGroup(group);
  };

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
export default ReportChart;

const Wrapper = styled.div`
  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
