import axios from "axios";
import React, { useEffect, useState } from "react";
import PartnerTreeNode from "./PartnerTreeNode";

const PartnerTreeNodeDetails = ({
  credentials,
  title,
  partnerId,
  defaultExpanded = false,
  loading,
  hasChildren = true,
  treeNodeDepth,
  record,
}: any) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <>
      <div>
        <h1>
          {hasChildren && (
            <>
              {expanded && (
                <button
                  onClick={() => {
                    setExpanded(!expanded);
                  }}
                  className="downArrow"
                ></button>
              )}
              {!expanded && (
                <button
                  onClick={() => {
                    setExpanded(!expanded);
                  }}
                  className="rightArrow"
                ></button>
              )}
            </>
          )}
          <span>{title}</span>
        </h1>
        <sub>{JSON.stringify(record?.additionalData)}</sub>
        {expanded && (
          <PartnerTreeNode
            credentials={credentials}
            partnerId={partnerId}
            treeNodeDepth={treeNodeDepth + 1}
          />
        )}
      </div>
    </>
  );
};
export default PartnerTreeNodeDetails;
