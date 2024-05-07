import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { getServiceAccountCredentials } from "../../utilities/storage";
import TransactionDetails from "./TransactionDetails";
import TransactionRuleValidation from "./TransactionRuleValidation";
import CouponValidation from "./CouponValidation";

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

const TemplateTwo: ComponentStory<typeof TransactionRuleValidation> = (
  args
) => <TransactionRuleValidation {...args} />;

const TemplateThree :ComponentStory<typeof CouponValidation> =(args)=>(
  <CouponValidation {...args}/>
)
export const Default = Template.bind({});
Default.args = {
  credentials: getServiceAccountCredentials() || {},
  showRaw: false,
  transactionId: "",
};

export const TransactionRule = TemplateTwo.bind({});
TransactionRule.args = {
  credentials: getServiceAccountCredentials() || {},
};

export const Coupon = TemplateThree.bind({});
Coupon.args = {
  credentials: getServiceAccountCredentials() || {},
};
