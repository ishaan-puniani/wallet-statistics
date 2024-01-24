import React from "react";
import ReactDOM from "react-dom";
import ReportChart from "./ReportChart";
import ReportBalanceChart from "./ReportBalanceChart";

export const _renderReportChart = (container: any, props: any) => {
  ReactDOM.render(<ReportChart {...props} />, container);
};

export const _renderReportBalanceChart = (container: any, props: any) => {
  ReactDOM.render(<ReportBalanceChart {...props} />, container);
};
