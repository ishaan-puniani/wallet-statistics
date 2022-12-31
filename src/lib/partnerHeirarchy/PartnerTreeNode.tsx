import axios from "axios";
import React, { useEffect, useState } from "react";
import PartnerTreeNodeDetails from "./PartnerTreeNodeDetails";

const PartnerTreeNode = ({
  credentials,
  partnerId,
  treeNodeDepth = 1,
  hierarchyType,
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
          data: { hierarchyType },
        }
      );
      if (heirarchyResponse.data) {
        setHeirary(heirarchyResponse.data);
      }
      setLoading(false);
    };
    fetchData();
  }, [partnerId, hierarchyType]);
  return (
    <>
      <div className="treeNode">
        <h1>{loading && <>Loading</>}</h1>
        {!loading &&
          heirarchy.slice(1).map((record) => (
            <PartnerTreeNodeDetails
              key={record.partnerId}
              partnerId={record.partnerId}
              credentials={credentials}
              title={`[${treeNodeDepth}]: ${record.partnerName} (${record.childrenCount})`}
              loading={loading}
              hasChildren={record.childrenCount > 0}
              treeNodeDepth={treeNodeDepth}
              record={record}
              hierarchyType={hierarchyType}
            />
          ))}
      </div>
    </>
  );
};
export default PartnerTreeNode;
