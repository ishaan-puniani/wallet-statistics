import React from "react";
import ReactDOM from "react-dom";
import TransactionRuleValidation from "./TransactionRuleValidation";
import CouponValidation from "./CouponValidation";

export const renderTransactionRule = (container: any, props: any) => {
  ReactDOM.render(<TransactionRuleValidation {...props} />, container);
};

export const renderCouponValidate = (container: any, props: any) => {
  ReactDOM.render(<CouponValidation {...props} />, container);
};
