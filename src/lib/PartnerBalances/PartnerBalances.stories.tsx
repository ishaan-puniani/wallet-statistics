import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import PartnerBalances from "./PartnerBalances";

import { getMachineUserCredentials } from "../../utilities/storage";
import PartnerBalanceFarmLineChart from "./PartnerBalanceFarmLineChart";

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
const TemplatePartnerBalanceFarm: ComponentStory<typeof PartnerBalances> = (
  args
) => <PartnerBalanceFarmLineChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  credentials: getMachineUserCredentials() || {},
};
export const LineChart = TemplatePartnerBalanceFarm.bind({});
LineChart.args = {
  credentials: getMachineUserCredentials() || {},
};
