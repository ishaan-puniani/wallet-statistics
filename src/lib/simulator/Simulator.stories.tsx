import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Simulator from "./Simulator";
import { getServiceAccountCredentials } from "../../utilities/storage";
import Achievements from "./Achievements";
import Stimulator from "./Stimulator";

export default {
  title: "Example/Simulator",
  component: Simulator,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Simulator>;

const Template: ComponentStory<typeof Simulator> = (args) => (
  <Simulator {...args} />
);
const Transactions: ComponentStory<typeof Stimulator> = (args) => (
  <Stimulator {...args} />
);
const TemplateAchievements: ComponentStory<typeof Achievements> = (args) => (
  <Achievements {...args} />
);

export const Default = Template.bind({});
Default.args = { credentials: getServiceAccountCredentials() || {} };
export const Achievement = TemplateAchievements.bind({});
Achievement.args = { credentials: getServiceAccountCredentials() || {} };
export const TransactionSimulator = Transactions.bind({});
TransactionSimulator.args = {
  credentials: getServiceAccountCredentials() || {},
  defaultValues: {},
  fieldsToHide: [],
  tabsToShow: [],
  defaultAction:'COMMIT_TRANSACTION'
};
