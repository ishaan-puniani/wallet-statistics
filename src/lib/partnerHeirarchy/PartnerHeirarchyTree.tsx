import axios from "axios";
import React, { useEffect, useState } from "react";
import PartnerTreeNode from "./PartnerTreeNode";
import PartnerTreeNodeDetails from "./PartnerTreeNodeDetails";
import "./partner_heirarchy_tree.css";

export interface IPartnerHeirarchyTreeProps {
  credentials?: any;
  partnerId?: string;
  hierarchyType?: "CHILDREN" | "PARENT";
  uptoPartner?: string;
  forLevel?: string;
  limit?: number;
  skip?: number;
  orderByRank?: "ASC" | "DESC";
  orderByCount?: "ASC" | "DESC";
  relativeTo?: string;
}

const PartnerHeirarchyTree = ({
  partnerId,
  credentials,
  hierarchyType,
  uptoPartner,
  forLevel,
  limit,
  skip,
  orderByRank,
  orderByCount,
  relativeTo,
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
        uptoPartner={uptoPartner}
        forLevel={forLevel}
        limit={limit}
        skip={skip}
        orderByRank={orderByRank}
        orderByCount={orderByCount}
        relativeTo={relativeTo}
      ></PartnerTreeNode>

      <p>{JSON.stringify(credentials)}</p>
    </>
  );
};
export default PartnerHeirarchyTree;
