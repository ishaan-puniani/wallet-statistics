import React from "react";
import ReactDOM from "react-dom";
import PartnerHeirarchy from "./PartnerHeirarchy";
import PartnerHeirarchyTree from "./PartnerHeirarchyTree";
export const renderPartnerHeirarchyTreeView = (container: any, props: any) => {
  ReactDOM.render(<PartnerHeirarchyTree {...props} />, container);
};
export const renderPartnerHeirarchyView = (container: any, props: any) => {
  ReactDOM.render(<PartnerHeirarchy {...props} />, container);
};
