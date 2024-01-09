import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { getServiceAccountCredentials } from "../../utilities/storage";
import ReportChart from "./ReportChart";

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

export const PartnerReportChart = TemplateDemo.bind({});
PartnerReportChart.args = {
  credentials: getServiceAccountCredentials() || {},
  showRaw: false,
  themeConfig: {},
  chartOptions: {},
  transactionTypes: [],
  chartType: "",
};
