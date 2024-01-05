import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import PartnerBalances from "./PartnerBalances";
import { getServiceAccountCredentials } from "../../utilities/storage";
import BalancesChart from "./BalancesChart";
import BalancesReportChart from "./BalancesReportChart";
import { date } from "@storybook/addon-knobs";
import PayerTransaction from "./PayerTransaction";
import TransactionType from "./TransactionTypes";
import CurrenciesCard from "./CurrenciesCard";
import TransactionTable from "./TransactionTable";
import moment from "moment";
// import UserAchievement from "../Achievement/UserAchievements";

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
const TemplateTransaction: ComponentStory<typeof TransactionType> = (args) => (
  <TransactionType {...args} />
);

const TemplateCurrencyCard: ComponentStory<typeof CurrenciesCard> = (args) => (
  <CurrenciesCard {...args} />
);
const TemplateTransactionTable: ComponentStory<typeof TransactionTable> = (
  args
) => <TransactionTable {...args} />;
export const Default = Template.bind({});
Default.args = {
  credentials: getServiceAccountCredentials() || {},
  showRaw: false,
};
export const PartnerBalanceChart = TemplateOne.bind({});
PartnerBalanceChart.args = {
  credentials: getServiceAccountCredentials() || {},
  showRaw: false,
  themeConfig: {},
  chartOptions: {},
  // transactionTypes: ["MINT", "MINT_BURN"]
};
export const PartnerBalanceReport = TemplateTwo.bind({});
PartnerBalanceReport.args = {
  credentials: getServiceAccountCredentials() || {},
  startDate: moment().add(-7, "days"),
  endDate: moment(),
  showRaw: false,
  // transactionTypes: ["MINT", "MINT_BURN"]
};
export const TransactionProfile = TemplateThree.bind({});
TransactionProfile.args = {
  credentials: getServiceAccountCredentials() || {},
  showRaw: false,
};
export const Transaction = TemplateTransaction.bind({});
Transaction.args = {
  credentials: getServiceAccountCredentials() || {},
  showRaw: false,
};

export const CurrencyCard = TemplateCurrencyCard.bind({});
CurrencyCard.args = {
  credentials: getServiceAccountCredentials() || {},
  showRaw: false,
};
export const TransactionsTable = TemplateTransactionTable.bind({});
TransactionsTable.args = {
  credentials: getServiceAccountCredentials() || {},
  showRaw: false,
  loadLinkedTransactions: false,
  loadLinkedAchievements: false,
  filtersPreset: {},
  hiddenColumns: [],
};
