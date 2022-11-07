import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import TransactionForm from "./TransactionForm";
import { getMachineUserCredentials } from "../../utilities/storage";

export default {
  title: "Example/TransactionForm",
  component: TransactionForm,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof TransactionForm>;

const Template: ComponentStory<typeof TransactionForm> = (args) => (
  <TransactionForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  credentials: getMachineUserCredentials() || {},
};
