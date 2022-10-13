import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import MachineUserCredentials from "./MachineUserCredentials";

export default {
  title: "Auth/MachineUserCredentials",
  component: MachineUserCredentials,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof MachineUserCredentials>;

const Template: ComponentStory<typeof MachineUserCredentials> = (args) => (
  <MachineUserCredentials {...args} />
);

export const Default = Template.bind({});
Default.args = {};
