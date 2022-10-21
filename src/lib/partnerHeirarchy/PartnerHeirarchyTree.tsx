import axios from "axios";
import React, { useEffect, useState } from "react";
import { ExpandMore, ChevronRight } from "@mui/icons-material";
import { TreeItem, TreeView } from "@mui/lab";
export interface IPartnerHeirarchyTreeProps {
  credentials?: any;
  partnerId?: string;
}

const PartnerHeirarchyTree = (props: IPartnerHeirarchyTreeProps) => {
  const [loading, setLoading] = useState(false);
  const [heirarchy, setHeirary] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const heirarchyResponse = await axios.get(
        `https://wallet-and-bonus-47kby.ondigitalocean.app/api/tenant/${props.credentials.application_id}/partners-hierarchy/${props.partnerId}`,
        {
          ...props.credentials,
        }
      );
      if (heirarchyResponse.data) {
        setHeirary(heirarchyResponse.data);
      }
      setLoading(false);
    };
    fetchData();
  }, [props.partnerId]);
  return (
    <>
      <h2>PartnerHeirarchyTree : {props.partnerId}</h2>

      {loading && <h1>Loading</h1>}
      {/* {!loading && <div>{JSON.stringify(heirarchy)}</div>} */}
      {!loading &&
        heirarchy.map((record) => (
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMore />}
            defaultExpandIcon={<ChevronRight />}
          >
            <TreeItem nodeId={record.partnerId} label={record.partnerName}>
            <div>
              <ul>
                <li>Id - {record.partnerId}</li>
                <li>Level - {record.levelName}</li>
                <li>Children Count - {record.childrenCount}</li>
                <li> Email - {record.additionalData.email}</li>
                <li>Full Name - {record.additionalData.fullName}</li>
                <li>Number - {record.additionalData.phoneNumber}</li>
              </ul>
            </div>
            </TreeItem>
          </TreeView>
        ))}

      <p>{JSON.stringify(props.credentials)}</p>
    </>
  );
};
export default PartnerHeirarchyTree;
