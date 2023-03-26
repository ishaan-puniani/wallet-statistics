import React from "react";
import ReactDOM from "react-dom";

import Dropdown from "./DropdownCurrencyTypes";
export const renderDropdown =  (container: any, props: any) => {
  ReactDOM.render(<Dropdown {...props}/>, container);
};
