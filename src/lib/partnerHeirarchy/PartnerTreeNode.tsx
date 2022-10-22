import axios from "axios";
import React, { useEffect, useState } from "react";
import PartnerTreeNodeDetails from "./PartnerTreeNodeDetails";

const PartnerTreeNode = ({
  credentials,
  partnerId,
  treeNodeDepth = 1,
  hierarchyType,
  uptoPartner,
  forLevel,
  limit,
  skip,
  orderByRank,
  orderByCount,
  relativeTo,
}: any) => {
  const [loading, setLoading] = useState(false);
  const [heirarchy, setHeirary] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const heirarchyResponse = await axios.post(
        `https://wallet-and-bonus-47kby.ondigitalocean.app/api/tenant/${credentials.application_id}/partners-hierarchy/${partnerId}`,
        {
          ...credentials,
          data: {
            hierarchyType,
            uptoPartner,
            forLevel,
            limit,
            skip,
            orderByRank,
            orderByCount,
            relativeTo,
          },
        }
      );
      if (heirarchyResponse.data) {
        setHeirary(heirarchyResponse.data);
      }
      setLoading(false);
    };
    fetchData();
  }, [
    partnerId,
    hierarchyType,
    uptoPartner,
    forLevel,
    limit,
    skip,
    orderByRank,
    orderByCount,
    relativeTo,
  ]);
  return (
    <>
      <div className="treeNode">
        <h1>{loading && <>Loading</>}</h1>
        {!loading &&
          heirarchy.map((record) => (
            <PartnerTreeNodeDetails
              key={record.partnerId}
              partnerId={record.partnerId}
              credentials={credentials}
              title={`[${record.relativeLevelName}]: ${record.partnerName} (${record.childrenCount})`}
              loading={loading}
              hasChildren={record.childrenCount > 0}
              treeNodeDepth={treeNodeDepth}
              record={record}
              hierarchyType={hierarchyType}
              uptoPartner={uptoPartner}
              forLevel={forLevel}
              limit={limit}
              skip={skip}
              orderByRank={orderByRank}
              orderByCount={orderByCount}
              relativeTo={relativeTo}
            />
          ))}
      </div>
    </>
  );
};
export default PartnerTreeNode;
