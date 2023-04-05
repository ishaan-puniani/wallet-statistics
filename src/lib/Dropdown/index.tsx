import React from "react";
import ReactDOM from "react-dom";

import Dropdown from "./DropdownCurrencyTypes";
import DropdownCurrencyTypes from "./DropdownCurrencyTypes";
import DropdownTransactionTypes from "./DropdownTransactionTypes";
export const renderDropdown = (container: any, props: any) => {
  ReactDOM.render(<Dropdown {...props} />, container);
};
export const renderDropdownCurrencyTypes = (container: any, props: any) => {
  ReactDOM.render(<DropdownCurrencyTypes {...props} />, container);
};
export const renderDropdownTransactionTypes = (container: any, props: any) => {
  ReactDOM.render(<DropdownTransactionTypes {...props} />, container);
};
