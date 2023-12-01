import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { getServiceAccountCredentials } from "../../utilities/storage";
import DropdownCurrencyTypes from "./DropdownCurrencyTypes";
import DropdownTransactionTypes from "./DropdownTransactionTypes";
import DropdownAmountTypes from "./DropdownAmountTypes";

export default {
  title: "Example/Dropdown",
  component: DropdownCurrencyTypes,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof DropdownCurrencyTypes>;

const Template: ComponentStory<typeof DropdownCurrencyTypes> = (args) => (
  <DropdownCurrencyTypes {...args} />
);
export const currencyTypes = Template.bind({});
currencyTypes.args = {
  credentials: getServiceAccountCredentials() || {},
};

const TemplateTransactionTypes: ComponentStory<
  typeof DropdownTransactionTypes
> = (args) => <DropdownTransactionTypes {...args} />;
export const TransactionTypes = TemplateTransactionTypes.bind({});
TransactionTypes.args = {
  credentials: getServiceAccountCredentials() || {},
};

const TemplateAmountTypes: ComponentStory<typeof DropdownAmountTypes> = (
  args
) => <DropdownAmountTypes {...args} />;
export const AmountTypes = TemplateAmountTypes.bind({});
AmountTypes.args = {
  credentials: getServiceAccountCredentials() || {},
};
