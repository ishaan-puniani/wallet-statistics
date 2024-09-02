import React from "react";
import ReactDOM from "react-dom";
import ReportChart from "./ReportChart";
import ReportBalanceChart from "./ReportBalanceChart";
import MiniTransactionTypeCard from "./MiniTransactionTypeCard";
import GroupReportChart from "./GroupReportChart";
import RecentTransactionTable from "./RecentTransactionTable";
import MiniCard from "./MiniCard";
import { TransactionCount } from "./PartnerReport.stories";

export const _renderReportChart = (container: any, props: any) => {
  ReactDOM.render(<ReportChart {...props} />, container);
};

export const _renderReportBalanceChart = (container: any, props: any) => {
  ReactDOM.render(<ReportBalanceChart {...props} />, container);
};

export const _renderMiniTransactionTypeCard = (container: any, props: any) => {
  ReactDOM.render(<MiniTransactionTypeCard {...props} />, container);
};

export const _renderGroupReportChart = (container: any, props: any) => {
  ReactDOM.render(<GroupReportChart {...props} />, container);
};

export const _renderRecentTransactionTable = (container: any, props: any) => {
  ReactDOM.render(<RecentTransactionTable {...props} />, container);
};

export const _renderMiniCard = (container: any, props: any) => {
  ReactDOM.render(<MiniCard {...props} />, container);
};

export const _renderTransactionCount = (container: any, props: any) => {
  ReactDOM.render(<TransactionCount {...props} />, container);
};
