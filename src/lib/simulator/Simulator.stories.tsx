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
const TemplateStimulator: ComponentStory<typeof Stimulator> = (args) => (
  <Stimulator {...args} />
);
const TemplateAchievements: ComponentStory<typeof Achievements> = (args) => (
  <Achievements {...args} />
);

export const Default = Template.bind({});
Default.args = { credentials: getServiceAccountCredentials() || {} };
export const Achievement = TemplateAchievements.bind({});
Achievement.args = { credentials: getServiceAccountCredentials() || {} };
export const DefaultStimulator = TemplateStimulator.bind({});
DefaultStimulator.args = { credentials: getServiceAccountCredentials() || {} };
