import React from "react";
import ReactDOM from "react-dom";
import TransactionForm from "./TransactionForm";
export const render = (container: any) => {
  ReactDOM.render(<TransactionForm />, container);
};
