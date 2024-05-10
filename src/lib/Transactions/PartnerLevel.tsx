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
      `${API_HOST}/tenant/${props.credentials.application_id}/partner-level-type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             ?filter%5BpartnerLevelTypeIdentifier%5D=${forLevel}&orderBy=rank_ASC`,
      { ...props.credentials }
    );
    setLevel(children.rows);
  };

  const fethPartners = async () => {
    try {
      const partners = await axios.post(
        `${API_HOST}/tenant/${props.credentials.application_id}/partners?orderBy=partnerId_ASC`,
        { ...props.credentials }
      );

      if (partners.count > 0) {
        setDownLine(partners.rows);
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
      {JSON.stringify(level)}
      {JSON.stringify(downLine)}
    </div>
  );
};

export default PartnerLevel;
