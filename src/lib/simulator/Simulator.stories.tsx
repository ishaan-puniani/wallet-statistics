import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Simulator from "./Simulator";

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

export const Default = Template.bind({});
Default.args = {};
