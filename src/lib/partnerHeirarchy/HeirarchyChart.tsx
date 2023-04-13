import React, { useCallback, useState } from "react";
import OrgChart from "@unicef/react-org-chart";
import avatarPersonnel from "./assets/avatar-personnel.svg";
import styled from "styled-components";

import { tree0, tree1, tree2, tree3, tree4 } from "./Tree";

export interface IPartnerHeirarchy {
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
  showRaw?: boolean;
}

// const HeirarchyChart = ({
//   partnerId,
//   credentials,
//   hierarchyType,
//   uptoPartner,
//   forLevel,
//   limit,
//   skip,
//   orderByRank,
//   orderByCount,
//   relativeTo,
//   showRaw,
// }: any) => {
//   const handleLoadConfig = (_d: any) => {
//     const { config } = { config: "" };
//     return config;
//   };

//   function getChildrenData(personData: any) {
//     throw new Error("Function not implemented.");
//   }

//   function getImage(email: any) {
//     throw new Error("Function not implemented.");
//   }

//   function getParentData(personData: any) {
//     throw new Error("Function not implemented.");
//   }

//   return (
//     <>
//       Hello
//       <OrgChart
//         tree={tree}
//         downloadImageId="download-image"
//         downloadPdfId="download-pdf"
//         onConfigChange={(config: any) => {
//           // Setting latest config to state
//           // debugger;
//           // this.setState({ config: config })
//         }}
//         loadConfig={(d: any) => {
//           // Called from d3 to get latest version of the config.
//           const config = handleLoadConfig(d);
//           return config;
//         }}
//         loadParent={(personData: any) => {
//           // getParentData(): To get the parent data from API
//           const loadedParent = getParentData(personData);
//           return Promise.resolve(loadedParent);
//         }}
//         loadChildren={(personData: any) => {
//           // getChildrenData(): To get the children data from API
//           const loadedChildren = getChildrenData(personData);
//           return Promise.resolve(loadedChildren);
//         }}
//         loadImage={(personData: any) => {
//           // getImage(): To get the image from API
//           const image = getImage(personData.email);
//           return Promise.resolve(image);
//         }}
//       />
//     </>
//   );
// };

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
  //   constructor(props) {
  //     super(props);

  //     this.state = {
  //       tree: tree,
  //       downloadingChart: false,
  //       config: {},
  //       highlightPostNumbers: [1],
  //     };
  //   }
  const [downloadingChart, setDownloadingChart] = useState();
  const [config, setConfig] = useState();
  const [tree, setTree] = useState(tree0);
  const [highlightPostNumbers, sethHighlightPostNumbers] = useState([1]);

  const getChild = (id) => {
    switch (id) {
      case 100:
        return tree1;
      case 36:
        return tree2;
      case 56:
        return tree3;
      case 25:
        return tree4;
      default:
        return console.log("no children");
    }
  };

  const getParent = (d) => {
    if (d.id === 100) {
      return {
        id: 500,
        person: {
          id: 500,
          avatar: avatarPersonnel,
          department: "",
          name: "Pascal ruth",
          title: "Member",
          totalReports: 1,
        },
        hasChild: false,
        hasParent: true,
        children: [d],
      };
    } else if (d.id === 500) {
      return {
        id: 1,
        person: {
          id: 1,
          avatar: avatarPersonnel,
          department: "",
          name: "Bryce joe",
          title: "Director",
          totalReports: 1,
        },
        hasChild: false,
        hasParent: false,
        children: [d],
      };
    } else {
      return d;
    }
  };

  const handleDownload = () => {
    this.setState({ downloadingChart: false });
  };

  const handleOnChangeConfig = (_config: any) => {
    // this.setState({ config: config });
    debugger;
    setConfig(_config);
  };

  const handleLoadConfig = useCallback(() => {
    return config;
  }, [config]);

  //  const { tree, downloadingChart } = this.state;

  //For downloading org chart as image or pdf based on id
  const downloadImageId = "download-image";
  const downloadPdfId = "download-pdf";

  return (
    <HeirarchyChartWrapper>
      <div className="zoom-buttons">
        <button className="btn btn-outline-primary zoom-button" id="zoom-in">
          +
        </button>
        <button className="btn btn-outline-primary zoom-button" id="zoom-out">
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
        <a
          className="github-link"
          href="https://github.com/unicef/react-org-chart"
        >
          Github
        </a>
        {downloadingChart && <div>Downloading chart</div>}
      </div>
      <OrgChart
        tree={tree}
        downloadImageId={downloadImageId}
        downloadPdfId={downloadPdfId}
        onConfigChange={handleOnChangeConfig}
        loadConfig={
          handleLoadConfig

          //     (d) => {
          //     // let configuration = handleLoadConfig(d).bind(this);
          //     // if (configuration) {
          //     //   return configuration;
          //     // }
          //     return config;
          //   }
        }
        downlowdedOrgChart={(d) => {
          handleDownload();
        }}
        loadImage={(d) => {
          return Promise.resolve(avatarPersonnel);
        }}
        loadParent={(d) => {
          const parentData = getParent(d);
          return parentData;
        }}
        loadChildren={(d) => {
          const childrenData = getChild(d.id);
          return childrenData;
        }}
      />
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
