import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import PartnerHeirarchyTree from "./PartnerHeirarchyTree";
import { withKnobs } from "@storybook/addon-knobs";
import { getServiceAccountCredentials } from "../../utilities/storage";
import PartnerHeirarchy from "./PartnerHeirarchy";
import HeirarchyChart from "./HeirarchyChart";

export default {
  title: "Example/PartnerHeirarchyTree",
  component: PartnerHeirarchyTree,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  decorators: [withKnobs, (Story) => <Story />],
} as ComponentMeta<typeof PartnerHeirarchyTree>;

const Template: ComponentStory<typeof PartnerHeirarchyTree> = (args) => (
  <PartnerHeirarchyTree {...args} />
);
const TemplateOne: ComponentStory<typeof PartnerHeirarchy> = (args) => (
  <PartnerHeirarchy {...args} />
);

const HeirarchyChartTemplate: ComponentStory<typeof HeirarchyChart> = (args) => (
  <HeirarchyChart {...args} />
);
export const Default = Template.bind({});
Default.args = {
  credentials: getServiceAccountCredentials() || {},
  hierarchyType: "CHILDREN",
};

export const Hierarchy = TemplateOne.bind({});
Hierarchy.args = {
  credentials: getServiceAccountCredentials() || {},
  hierarchyType: "CHILDREN",
  showRaw: false
};

export const HierarchyChart = HeirarchyChartTemplate.bind({});
HierarchyChart.args = {
  credentials: getServiceAccountCredentials() || {},
  hierarchyType: "PARTNER",
  showRaw: false
};

