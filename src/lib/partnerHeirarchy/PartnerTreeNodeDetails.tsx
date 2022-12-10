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
  hierarchyType,
  uptoPartner,
  forLevel,
  limit,
  skip,
  orderByRank,
  orderByCount,
  relativeTo,
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

        <table>
          <tr>
            <th>Level</th>
            <th>Email</th>
            <th>Full Name</th>
            <th>Phone Number</th>
            <th>Children Count </th>
          </tr>
          <tr>
            <td>
              <p>{record?.levelName}</p>
            </td>
            <td>
              <p>{record?.additionalData?.email}</p>
            </td>
            <td>
              <p>{record?.additionalData?.fullName}</p>
            </td>
            <td>
              <p>{record?.additionalData?.phoneNumber}</p>
            </td>
            <td>
              <p>{record?.childrenCount}</p>
            </td>
          </tr>
        </table>
        {/* <sub>{JSON.stringify(record?.additionalData)}</sub> */}

        {expanded && (
          <PartnerTreeNode
            credentials={credentials}
            partnerId={partnerId}
            treeNodeDepth={treeNodeDepth + 1}
            hierarchyType={hierarchyType}
            uptoPartner={uptoPartner}
            forLevel={forLevel}
            limit={limit}
            skip={skip}
            orderByRank={orderByRank}
            orderByCount={orderByCount}
            relativeTo={relativeTo}
          />
        )}
      </div>
    </>
  );
};
export default PartnerTreeNodeDetails;
