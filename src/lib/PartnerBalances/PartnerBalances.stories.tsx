import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import PartnerBalances from "./PartnerBalances";
import { getMachineUserCredentials } from "../../utilities/storage";
import BalancesChart from "./BalancesChart";
import BalancesReportChart from "./BalancesReportChart";
import { date } from "@storybook/addon-knobs";
import PayerTransaction from "./PayerTransaction";
import PartnerBalancesPieChart from "./PartnerBalancesPieChart";
import TransactionType from "./TransactionTypes";

export default {
  title: "Example/PartnerBalances",
  component: PartnerBalances,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof PartnerBalances>;

const Template: ComponentStory<typeof PartnerBalances> = (args) => (
  <PartnerBalances {...args} />
);
const TemplateOne: ComponentStory<typeof BalancesChart> = (args) => (
  <BalancesChart {...args} />
);
const TemplateTwo: ComponentStory<typeof BalancesReportChart> = (args) => (
  <BalancesReportChart {...args} />
);
const TemplateThree: ComponentStory<typeof PayerTransaction> = (args) => (
  <PayerTransaction {...args} />
);
const Template1: ComponentStory<typeof PartnerBalances> = (args) => (
  <PartnerBalancesPieChart {...args} />
);
const TemplateTransaction: ComponentStory<typeof PartnerBalances> = (args) => (
  <TransactionType {...args} />
);
export const Default = Template.bind({});
Default.args = {
  credentials: getMachineUserCredentials() || {},
};
export const Chart = TemplateOne.bind({});
Chart.args = {
  credentials: getMachineUserCredentials() || {},
};
export const LinesChart = TemplateTwo.bind({});
LinesChart.args = {
  credentials: getMachineUserCredentials() || {},
  startDate: date,
  endDate: date,
};
export const Payer = TemplateThree.bind({});
Payer.args = {
  credentials: getMachineUserCredentials() || {},
};
export const PieChart = Template1.bind({});
PieChart.args = {
  credentials: getMachineUserCredentials() || {},
};
export const Transaction = TemplateTransaction.bind({});
Transaction.args = {
  credentials: getMachineUserCredentials() || {},
};
