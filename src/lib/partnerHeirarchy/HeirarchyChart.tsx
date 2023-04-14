import React, { useCallback, useEffect, useState } from "react";
// @ts-ignore
import OrgChart from "@unicef/react-org-chart";
import styled from "styled-components";
import { API_HOST } from "../../constants";
import axios from "axios";

const avatarPersonnel  = "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"

const partnerToCard = (partner: any): any => {
  return {
    id: partner.partnerId,
    person: {
      id: partner.partnerId,
      avatar: avatarPersonnel,
      department: partner.levelName,
      name: partner.partnerName,
      title: partner.additionalData?.email || partner.levelName,
      totalReports: partner.childrenCount,
    },
    hasChild: partner.childrenCount,
    hasParent: partner.partnerId !== "_ROOT_",
    children: partner.childrenCount ? [] : undefined,
  };
};

export interface IPartnerHeirarchy {
  credentials?: any;
  partnerId?: string;
  hierarchyType?: "CHILDREN" | "PARENT" | "PARTNER";
  uptoPartner?: string;
  forLevel?: string;
  limit?: number;
  skip?: number;
  orderByRank?: "ASC" | "DESC";
  orderByCount?: "ASC" | "DESC";
  relativeTo?: string;
  showRaw?: boolean;
}

const HeirarchyChart = ({
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
  showRaw,
}: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [downloadingChart, setDownloadingChart] = useState<boolean>();
  const [config, setConfig] = useState({ value: {} });
  const [tree, setTree] = useState();
  // const [highlightPostNumbers, sethHighlightPostNumbers] = useState([1]);

  const fetchData = async (
    requestedPartnerId: string,
    type: string,
    count: number | undefined,
    _orderByRank: string
  ) => {
    const heirarchyResponse: any = await axios.post(
      `${API_HOST}/tenant/${credentials.application_id}/partners-hierarchy/${requestedPartnerId}`,
      {
        ...credentials,
        data: {
          hierarchyType: type,
          uptoPartner,
          forLevel,
          limit: count || limit,
          skip,
          orderByRank: _orderByRank,
          orderByCount,
          relativeTo,
        },
      }
    );
    if (heirarchyResponse.data) {
      const childTreeData = heirarchyResponse.data.map((tc: any) => {
        return partnerToCard(tc);
      });
      return childTreeData;
    }
    return undefined;
  };

  useEffect(() => {
    const dataFetcher = async () => {
      setLoading(true);
      const currentPartner = await fetchData(partnerId, "PARTNER", 1, "ASC");
      if (currentPartner && currentPartner.length > 0) {
        setTree(currentPartner[0]);
      }
      setLoading(false);
    };
    if (partnerId) {
      dataFetcher();
    }
  }, [partnerId]);

  const getChild = async (id: string) => {
    const heirarchyResponse = await fetchData(
      id,
      "CHILDREN",
      undefined,
      orderByRank
    );
    return heirarchyResponse;
  };

  const getParent = async (d: any) => {
    const heirarchyResponse = await fetchData(d.id, "PARENT", 1, "ASC");
    if (heirarchyResponse && heirarchyResponse.length > 0) {
      const directParent = heirarchyResponse[0];
      directParent.children = [d];
      return directParent;
    }
  };

  const handleDownload = () => {
    setDownloadingChart(false);
  };

  const handleOnChangeConfig = (_config: any) => {
    setConfig((prev) => {
      prev.value = _config;
      return prev;
    });
  };

  const handleLoadConfig = () => {
    return config.value;
  };

  //  const { tree, downloadingChart } = this.state;

  //For downloading org chart as image or pdf based on id
  const downloadImageId = "download-image";
  const downloadPdfId = "download-pdf";

  return (
    <HeirarchyChartWrapper>
      {!loading && tree && (
        <>
          <div className="zoom-buttons">
            <button
              className="btn btn-outline-primary zoom-button"
              id="zoom-in"
            >
              +
            </button>
            <button
              className="btn btn-outline-primary zoom-button"
              id="zoom-out"
            >
              -
            </button>
          </div>
          <div className="download-buttons">
            <button className="btn btn-outline-primary" id="download-image">
              Download as image
            </button>
            <button className="btn btn-outline-primary" id="download-pdf">
              Download as PDF
            </button>
            {downloadingChart && <div>Downloading chart</div>}
          </div>
          <OrgChart
            tree={tree}
            downloadImageId={downloadImageId}
            downloadPdfId={downloadPdfId}
            onConfigChange={handleOnChangeConfig}
            loadConfig={handleLoadConfig}
            downlowdedOrgChart={(d: any) => {
              handleDownload();
            }}
            loadImage={(d: any) => {
              return Promise.resolve(avatarPersonnel);
            }}
            loadParent={(d: any) => {
              const parentData = getParent(d);
              return parentData;
            }}
            loadChildren={(d: any) => {
              const childrenData = getChild(d.id);
              return childrenData;
            }}
          />
        </>
      )}
    </HeirarchyChartWrapper>
  );
};
export default HeirarchyChart;

const HeirarchyChartWrapper = styled.div`
  #root,
  #react-org-chart {
    margin: 0;
    cursor: move;
    height: 500px;
    width: 100%;
    background-color: #f7f9fa;
  }
  .org-chart-person-name {
    font-weight: 500;
  }
  .org-chart-person-link:hover g {
    fill: #409cf9 !important;
  }
  .org-chart-node:hover .org-chart-person-reports {
    fill: #409cf9 !important;
  }
  .org-chart-person-dept.engineering {
    fill: #4caf50 !important;
  }
  .org-chart-person-dept.communications {
    fill: #3f51b5 !important;
  }
  .org-chart-person-dept.product {
    fill: #d500f9 !important;
  }
  .org-chart-person-dept.hr {
    fill: #2196f3 !important;
  }
  .org-chart-person-dept.marketing {
    fill: #f44336 !important;
  }
  .org-chart-person-dept.design {
    fill: #26c6da !important;
  }

  .zoom-buttons {
    position: absolute;
    top: 0;
    left: 0;
  }

  .download-buttons {
    position: absolute;
    top: 0;
    right: 0;
  }

  .zoom-button {
    width: 40px;
    height: 40px;
    display: block !important;
    margin: 8px;
  }

  .btn {
    font-size: 0.875rem;
    text-transform: none;
    text-decoration-line: none;
    display: inline-block;
    font-weight: 600;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    line-height: 1.5rem;
    border-radius: 0.125rem;
    cursor: pointer;
    margin: 6px;
  }

  .btn-outline-primary {
    color: #374ea2;
    border-color: #374ea2;
  }

  .btn-outline-primary:not(:disabled):not(.disabled):active {
    color: #fff;
    background-color: #374ea2;
    border-color: #374ea2;
  }

  .github-link {
    font-size: 16px;
    margin-left: 8px;
    margin-right: 16px;
  }
`;
