import axios from "axios";
import React, { useEffect, useState } from "react";

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
      const heirarchyResponse = await axios.post(
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
      {!loading && <div>{JSON.stringify(heirarchy)}</div>}

      <p>{JSON.stringify(props.credentials)}</p>
    </>
  );
};
export default PartnerHeirarchyTree;
