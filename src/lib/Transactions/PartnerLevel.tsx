import React, { useEffect, useState } from "react";
import { API_HOST } from "../../constants";
import axios from "axios";

export interface PartnerLevelProps {
  credentials?: any;
}

const PartnerLevel = (props: PartnerLevelProps) => {
  const [selectedLevel, setSelectedLevel] = useState<any>(null);
  const [level, setLevel] = useState<any>();
  const [selectedDownlinePartner, setSelectedDownlinePartner] =
    useState<any>(null);
  const [downLine, setDownLine] = useState<any>();

  const fetchHeirarchy = async (forLevel: any) => {
    const children = await axios.post(
      `${API_HOST}/tenant/${props.credentials.application_id}/get-partner-level-type?filter[partnerLevelTypeIdentifier]=${forLevel}`,
      {
        ...props.credentials,
      }
    );
    setLevel(children.data.rows);
  };

  const fethPartners = async () => {
    try {
      const partners = await axios.post(
        `${API_HOST}/tenant/${props.credentials.application_id}/get-partners?orderBy=partnerId_ASC`,
        { ...props.credentials }
      );

      if (partners.data.count > 0) {
        setDownLine(partners.data.rows);
      }
    } catch (err: any) {
      console.error(err?.response?.data);
    }
  };

  useEffect(() => {
    fetchHeirarchy("LEVEL_1");
    fethPartners();
  }, [selectedLevel]);
  return (
    <div>
      {JSON.stringify("--------------LEVEL-----------------")}
      <br />
      {JSON.stringify(level)}
      <br />
      {JSON.stringify("--------------Downline-----------------")}
      <br />
      {JSON.stringify(downLine)}
      <br />
    </div>
  );
};

export default PartnerLevel;
