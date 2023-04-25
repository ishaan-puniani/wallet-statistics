import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { getMachineUserCredentials } from "../../utilities/storage";
import AvailableAchievement from "./AvailableAchievement";
import UserAchievement from "./UserAchievements";

export default {
  title: "Example/UserAchievement",
  component: UserAchievement,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof UserAchievement>;

const Template: ComponentStory<typeof UserAchievement> = (args) => (
  <UserAchievement {...args} />
);
const TemplateTwo: ComponentStory<typeof AvailableAchievement> = (args) => (
  <AvailableAchievement {...args} />
);

export const UserAchievements = Template.bind({});
UserAchievements.args = {
  credentials: getMachineUserCredentials() || {},
  achieverId: "",
  showRaw: false,
};
export const AvailableAchievements = TemplateTwo.bind({});
AvailableAchievements.args = {
  credentials: getMachineUserCredentials() || {},
  showRaw: false,
};
