import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { getServiceAccountCredentials } from "../../utilities/storage";
import { date } from "@storybook/addon-knobs";
import TransactionDetails from "./TransactionDetails";

export default {
  title: "Example/Transactions",
  component: TransactionDetails,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof TransactionDetails>;

const Template: ComponentStory<typeof TransactionDetails> = (args) => (
  <TransactionDetails {...args} />
);

export const Default = Template.bind({});
Default.args = {
  credentials: getServiceAccountCredentials() || {},
  showRaw: false,
  transactionId:""
};
