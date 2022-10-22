import axios from "axios";
import React, { useEffect, useState } from "react";
import PartnerTreeNode from "./PartnerTreeNode";
import PartnerTreeNodeDetails from "./PartnerTreeNodeDetails";
import "./partner_heirarchy_tree.css";

export interface IPartnerHeirarchyTreeProps {
  credentials?: any;
  partnerId?: string;
  hierarchyType?: "CHILDREN" | "PARENT";
}

const PartnerHeirarchyTree = ({
  partnerId,
  credentials,
  hierarchyType,
}: IPartnerHeirarchyTreeProps) => {
  return (
    <>
      <h2>
        PartnerHeirarchyTree : {partnerId} [{hierarchyType}]
      </h2>

      <PartnerTreeNode
        partnerId={partnerId}
        credentials={credentials}
        treeNodeDepth={1}
        hierarchyType={hierarchyType}
      ></PartnerTreeNode>

      <p>{JSON.stringify(credentials)}</p>
    </>
  );
};
export default PartnerHeirarchyTree;
