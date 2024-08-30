import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { getServiceAccountCredentials } from "../../utilities/storage";
import AvailableAchievement from "./AvailableAchievement";
import UserAchievement from "./UserAchievements";
import AcknowledgeAchievement from "./AcknowledgeAchievement";
import GetUserAchievement from "./GetUserAchievement";
import UnacknowledgedAchievement from "./UnacknowledgedAchievement";
import UserAchievementTable from "./UserAchievementTable";

export default {
  title: "Example/Achievement",
  component: AvailableAchievement,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof AvailableAchievement>;

const TemplateOne: ComponentStory<typeof AvailableAchievement> = (args) => (
  <AvailableAchievement {...args} />
);

const TemplateTwo: ComponentStory<typeof UserAchievement> = (args) => (
  <UserAchievement {...args} />
);

const TemplateThree: ComponentStory<typeof AcknowledgeAchievement> = (args) => (
  <AcknowledgeAchievement {...args} />
);

const TemplateFour: ComponentStory<typeof GetUserAchievement> = (args) => (
  <GetUserAchievement {...args} />
);

const TemplateFive: ComponentStory<typeof UnacknowledgedAchievement> = (args) => (
  <UnacknowledgedAchievement {...args} />
);

const TemplateSix: ComponentStory<typeof UserAchievementTable> = (args) => (
  <UserAchievementTable {...args} />
);

export const AvailableAchievements = TemplateOne.bind({});
AvailableAchievements.args = {
  credentials: getServiceAccountCredentials() || {},
  showRaw: false,
};

export const UserAchievements = TemplateTwo.bind({});
UserAchievements.args = {
  credentials: getServiceAccountCredentials() || {},
  achieverId: "",
  showRaw: false,
};

export const AcknowledgeAchievements = TemplateThree.bind({});
AcknowledgeAchievements.args = {
  credentials: getServiceAccountCredentials() || {},
  achieverId: "",
  achievementId: "",
};

export const GetUserAchievements = TemplateFour.bind({});
GetUserAchievements.args = {
  credentials: getServiceAccountCredentials() || {},
  achieverId: "",
};

export const UnacknowledgedAchievements = TemplateFive.bind({});
UnacknowledgedAchievements.args = {
  credentials: getServiceAccountCredentials() || {},
  achieverId: "",
};

export const UserAchievementsTable = TemplateSix.bind({});
UserAchievementsTable.args = {
  credentials: getServiceAccountCredentials() || {},
  limit: "10",
  offset: "0"
};
