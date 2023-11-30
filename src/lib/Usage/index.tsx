import React from "react";
import ReactDOM from "react-dom";
import Usage from "./Usage";

export const renderUsage = (container: any, props: any) => {
  ReactDOM.render(<Usage {...props} />, container);
};
