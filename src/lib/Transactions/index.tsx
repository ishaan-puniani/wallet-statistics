import React from "react";
import ReactDOM from "react-dom";
import TransactionRuleValidation from "./TransactionRuleValidation";

export const renderTransactionRule = (container: any, props: any) => {
  ReactDOM.render(<TransactionRuleValidation {...props} />, container);
};
