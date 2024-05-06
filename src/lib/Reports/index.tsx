import React from "react";
import ReactDOM from "react-dom";
import ReportChart from "./ReportChart";
import ReportBalanceChart from "./ReportBalanceChart";
import MiniTransactionTypeCard from "./MiniTransactionTypeCard";

export const _renderReportChart = (container: any, props: any) => {
  ReactDOM.render(<ReportChart {...props} />, container);
};

export const _renderReportBalanceChart = (container: any, props: any) => {
  ReactDOM.render(<ReportBalanceChart {...props} />, container);
};

export const _renderMiniTransactionTypeCard = (container: any, props: any) => {
  ReactDOM.render(<MiniTransactionTypeCard {...props} />, container);
};
