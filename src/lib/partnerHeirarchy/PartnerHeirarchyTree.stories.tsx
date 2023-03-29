import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import PartnerHeirarchyTree from "./PartnerHeirarchyTree";
import { withKnobs, object } from "@storybook/addon-knobs";
import { getMachineUserCredentials } from "../../utilities/storage";
import PartnerHeirarchy from "./PartnerHeirarchy";

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

export const Default = Template.bind({});
Default.args = {
  credentials: getMachineUserCredentials() || {},
  hierarchyType: "CHILDREN"
};

export const Hierarchy = TemplateOne.bind({});
Hierarchy.args = {
  credentials: getMachineUserCredentials() || {},
  hierarchyType: "CHILDREN",
  showRaw: false
};
