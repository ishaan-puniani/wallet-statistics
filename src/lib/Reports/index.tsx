import React from "react";
import ReactDOM from "react-dom";
import ReportChart from "./ReportChart";

export const _renderReportChart = (container: any, props: any) => {
  ReactDOM.render(<ReportChart {...props} />, container);
};
