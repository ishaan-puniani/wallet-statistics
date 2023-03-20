import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import PartnerBalances from "./PartnerBalances";
import { getMachineUserCredentials } from "../../utilities/storage";
import PartnerBalancesPieChart from "./PartnerBalancesPieChart";

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
const Template1: ComponentStory<typeof PartnerBalances> = (args) => (
  <PartnerBalancesPieChart {...args} />
);

export const Default = Template.bind({});
Default.args = {
  credentials: getMachineUserCredentials() || {},
};
export const PieChart = Template1.bind({});
PieChart.args = {
  credentials: getMachineUserCredentials() || {},
};
