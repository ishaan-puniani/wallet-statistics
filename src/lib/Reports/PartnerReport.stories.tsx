import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { getServiceAccountCredentials } from "../../utilities/storage";
import ReportChart from "./ReportChart";
import ReportBalanceChart from "./ReportBalanceChart";
import moment from "moment";
import MiniTransactionTypeCard from "./MiniTransactionTypeCard";

export default {
  title: "Example/Reports",
  component: ReportChart,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof ReportChart>;

const TemplateDemo: ComponentStory<typeof ReportChart> = (args) => (
  <ReportChart {...args} />
);
const TemplateTwo: ComponentStory<typeof ReportBalanceChart> = (args) => (
  <ReportBalanceChart {...args} />
);
const TemplateThree: ComponentStory<typeof MiniTransactionTypeCard> = (
  args
) => <MiniTransactionTypeCard {...args} />;

export const PartnerBalanceReportChart = TemplateTwo.bind({});
PartnerBalanceReportChart.args = {
  credentials: getServiceAccountCredentials() || {},
  showRaw: false,
  themeConfig: {},
  chartOptions: {},
  transactionTypes: [],
  chartType: "",
  startDate: moment(),
  endDate: moment(),
  type: "",
};
export const PartnerReportChart = TemplateDemo.bind({});
PartnerReportChart.args = {
  credentials: getServiceAccountCredentials() || {},
  showRaw: false,
  themeConfig: {},
  chartOptions: {},
  transactionTypes: [],
  chartType: "",
  startDate: moment(),
  endDate: moment(),
};
export const MiniTransactionCard = TemplateThree.bind({});
MiniTransactionCard.args = {
  credentials: getServiceAccountCredentials() || {},
  showRaw: false,
  includePrevious: false,
  cardConfig: {},
  group: "",
  startDate: moment(),
  endDate: moment(),
  transactionType: "",
};
