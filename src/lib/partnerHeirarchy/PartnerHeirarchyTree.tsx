import axios from "axios";
import React, { useEffect, useState } from "react";
import PartnerTreeNode from "./PartnerTreeNode";
import PartnerTreeNodeDetails from "./PartnerTreeNodeDetails";
import "./partner_heirarchy_tree.css";

export interface IPartnerHeirarchyTreeProps {
  credentials?: any;
  partnerId?: string;
}

const PartnerHeirarchyTree = (props: IPartnerHeirarchyTreeProps) => {
  return (
    <>
      <h2>PartnerHeirarchyTree : {props.partnerId}</h2>

      <PartnerTreeNode
        partnerId={props.partnerId}
        credentials={props.credentials}
        treeNodeDepth={1}
      ></PartnerTreeNode>

      <p>{JSON.stringify(props.credentials)}</p>
    </>
  );
};
export default PartnerHeirarchyTree;
