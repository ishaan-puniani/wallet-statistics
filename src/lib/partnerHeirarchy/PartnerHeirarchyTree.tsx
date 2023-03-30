
import styled from 'styled-components';
import axios from "axios";
import React, { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import PartnerTreeNode from "./PartnerTreeNode";
import PartnerTreeNodeDetails from "./PartnerTreeNodeDetails";

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
  relativeTo
}: IPartnerHeirarchyTreeProps) => {
  return (
    <>
      <PartnerHeirarchyTreeWrapper>
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

      </PartnerHeirarchyTreeWrapper>
      {/* <p>{JSON.stringify(credentials)}</p> */}
    </>
  );
};
const PartnerHeirarchyTreeWrapper = styled.div`
.treeNode {
  color: #333;
  font-size: 14px;
  margin-left: 10px;
}

.rightArrow {
  background: transparent url("./assets/arrow-right.png") no-repeat top;
  width: 20px;
  height: 20px;
  border: none;
}

.downArrow {
  background: transparent url("./assets/arrow-down.png") no-repeat top;
  width: 20px;
  height: 20px;
  border: none;
}

table,
td,
th {
  border: 1px solid black;
}

table {
  width: 70%;
}

td {
  text-align: center;
}

`;
export default PartnerHeirarchyTree;
