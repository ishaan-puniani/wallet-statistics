import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Usage from "./Usage";

export default {
  title: "Example/Usage",
  component: Usage,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Usage>;

const Template: ComponentStory<typeof Usage> = (args) => (
  <Usage {...args} />
);

export const Default = Template.bind({});
Default.args = {
};
