import React from "react";
import ReactDOM from "react-dom";
import BalancesChart from "./BalancesChart";
import BalancesReportChart from "./BalancesReportChart";
import PartnerBalances from "./PartnerBalances";
export const renderBalances =  (container: any, props: any) => {
  ReactDOM.render(<PartnerBalances {...props}/>, container);
};

export const renderBalancesChart =  (container: any, props: any) => {
  ReactDOM.render(<BalancesChart {...props}/>, container);
};

export const _renderBalancesReportChart =  (container: any, props: any) => {
  ReactDOM.render(<BalancesReportChart {...props}/>, container);
};