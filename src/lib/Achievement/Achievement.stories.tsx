import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { getMachineUserCredentials } from "../../utilities/storage";
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

export const Achievement = Template.bind({});
Achievement.args = {
    credentials: getMachineUserCredentials() || {},
    userId: ''
};