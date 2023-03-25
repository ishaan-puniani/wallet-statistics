import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import PartnerBalances from "./PartnerBalances";
import { getMachineUserCredentials } from "../../utilities/storage";
import BalancesChart from "./BalancesChart";
import BalancesReportChart from "./BalancesReportChart";
import { date } from "@storybook/addon-knobs";
import PayerTransaction from "./PayerTransaction";
import PartnerBalancesPieChart from "./PartnerBalancesPieChart";
import CurrenciesCard from "./CurrenciesCard";
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
const Template1: ComponentStory<typeof PartnerBalances> = (args) => (
  <PartnerBalancesPieChart {...args} />
)
const TemplateCurrencyCard: ComponentStory<typeof CurrenciesCard> = (args) => (
  <CurrenciesCard {...args} />
)
export const Default = Template.bind({});
Default.args = {
  credentials: getMachineUserCredentials() || {},
};
export const PartnerBalanceChart = TemplateOne.bind({});
PartnerBalanceChart.args = {
  credentials: getMachineUserCredentials() || {},
};
export const PartnerBalanceReport = TemplateTwo.bind({});
PartnerBalanceReport.args = {
  credentials: getMachineUserCredentials() || {},
  startDate: date,
  endDate: date
};
export const Payer = TemplateThree.bind({});
Payer.args = {
  credentials: getMachineUserCredentials() || {},
};
export const PieChart = Template1.bind({});
PieChart.args = {
  credentials: getMachineUserCredentials() || {},
}
export const CurrencyCard = TemplateCurrencyCard.bind({});
CurrencyCard.args = {
  credentials: getMachineUserCredentials() || {},
}