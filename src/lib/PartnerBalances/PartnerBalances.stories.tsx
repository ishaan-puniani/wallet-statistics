import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import PartnerBalances from "./PartnerBalances";
import { getMachineUserCredentials } from "../../utilities/storage";
import Charts from "./Charts";
import LineCharts from "./LineCharts";
import Calendar from "./Calender";
import DateType from "@storybook/addon-knobs/dist/components/types/Date";
import { date } from "@storybook/addon-knobs";

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
const TemplateOne: ComponentStory<typeof Charts> = (args) => (
  <Charts {...args} />
);
const TemplateTwo: ComponentStory<typeof LineCharts> = (args) => (
  <LineCharts {...args} />
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
  endDate: date
};
