import React from "react";
import ReactDOM from "react-dom";
import PartnerHeirarchyTree from "./PartnerHeirarchyTree";
export const renderPartnerHeirarchyTreeView = (container: any, props: any) => {
  ReactDOM.render(<PartnerHeirarchyTree {...props}/>, container);
};
