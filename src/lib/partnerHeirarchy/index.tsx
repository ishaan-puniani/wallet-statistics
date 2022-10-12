import React from "react";
import ReactDOM from "react-dom";
import PartnerHeirarchyTree from "./PartnerHeirarchyTree";
export const renderTreeView = (container: any) => {
  ReactDOM.render(<PartnerHeirarchyTree />, container);
};
