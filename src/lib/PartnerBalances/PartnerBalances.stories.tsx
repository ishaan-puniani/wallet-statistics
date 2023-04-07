import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import PartnerBalances from "./PartnerBalances";
import { getMachineUserCredentials } from "../../utilities/storage";
import BalancesChart from "./BalancesChart";
import BalancesReportChart from "./BalancesReportChart";
import { date } from "@storybook/addon-knobs";
import PayerTransaction from "./PayerTransaction";
import TransactionType from "./TransactionTypes";
import CurrenciesCard from "./CurrenciesCard";
import TransactionTable from "./TransactionTable";
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
)
const TemplateTransactionTable: ComponentStory<typeof TransactionTable> = (args) => (
  <TransactionTable {...args} />
)
export const Default = Template.bind({});
Default.args = {
  credentials: getMachineUserCredentials() || {},
  showRaw: false
};
export const PartnerBalanceChart = TemplateOne.bind({});
PartnerBalanceChart.args = {
  credentials: getMachineUserCredentials() || {},
  showRaw: false
};
export const PartnerBalanceReport = TemplateTwo.bind({});
PartnerBalanceReport.args = {
  credentials: getMachineUserCredentials() || {},
  startDate: date,
  endDate: date,
  showRaw: false
};
export const TransactionProfile = TemplateThree.bind({});
TransactionProfile.args = {
  credentials: getMachineUserCredentials() || {},
  showRaw: false
};
export const Transaction = TemplateTransaction.bind({});
Transaction.args = {
  credentials: getMachineUserCredentials() || {},
  showRaw: false
};

export const CurrencyCard = TemplateCurrencyCard.bind({});
CurrencyCard.args = {
  credentials: getMachineUserCredentials() || {},
  showRaw: false
}
export const TransactionsTable = TemplateTransactionTable.bind({});
TransactionsTable.args = {
  credentials: getMachineUserCredentials() || {},
  showRaw: false,
  loadLinkedTransactions: false,
  loadLinkedAchievements: false
}
