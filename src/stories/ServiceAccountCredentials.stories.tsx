import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ServiceAccountCredentials from "./ServiceAccountCredentials";
import { getServiceAccountCredentials } from "../utilities/storage";

export default {
  title: "Auth/ServiceAccountCredentials",
  component: ServiceAccountCredentials,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof ServiceAccountCredentials>;

const Template: ComponentStory<typeof ServiceAccountCredentials> = (args) => (
  <ServiceAccountCredentials {...args} />
);

export const Default = Template.bind({});
Default.args = {
  credentials: getServiceAccountCredentials() || {},
};
