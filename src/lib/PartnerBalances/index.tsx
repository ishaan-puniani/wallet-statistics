import React from "react";
import ReactDOM from "react-dom";
import PartnerBalances from "./PartnerBalances";
export const renderBalances =  (container: any, props: any) => {
  ReactDOM.render(<PartnerBalances {...props}/>, container);
};

export const renderBalancesChart =  (container: any, props: any) => {
  ReactDOM.render(<PartnerBalances {...props}/>, container);
};
