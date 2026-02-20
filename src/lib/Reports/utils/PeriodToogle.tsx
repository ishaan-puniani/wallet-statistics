import React from "react";
import styled from "styled-components";
import { Group } from "./utils";

type PeriodToogleProps = {
  group: Group;
  groupHandler: (group: Group) => void;
};

const PeriodToogle: React.FC<PeriodToogleProps> = ({ group, groupHandler }) => {
  return (
    <Wrapper>
      <div className="grouping-btn">
        <div
          className={`group group-daily ${group === "daily" ? "selected" : ""}`}
        >
          <button onClick={() => groupHandler("daily")}>Daily</button>
        </div>
        <div
          className={`group group-weekly ${
            group === "weekly" ? "selected" : ""
          }`}
        >
          <button onClick={() => groupHandler("weekly")}>Weekly</button>
        </div>
        <div
          className={`group group-monthly ${
            group === "monthly" ? "selected" : ""
          }`}
        >
          <button onClick={() => groupHandler("monthly")}>Monthly</button>
        </div>
        <div
          className={`group group-quarterly ${
            group === "quarterly" ? "selected" : ""
          }`}
        >
          <button onClick={() => groupHandler("quarterly")}>Quarterly</button>
        </div>
        <div
          className={`group group-yearly ${
            group === "yearly" ? "selected" : ""
          }`}
        >
          <button onClick={() => groupHandler("yearly")}>Yearly</button>
        </div>
      </div>
    </Wrapper>
  );
};

export default PeriodToogle;
const Wrapper = styled.div`
  .grouping-btn {
    display: flex;
    justify-content: end;
  }
  .group {
    > button {
      padding: 8px;
      color: rgb(96, 96, 96);
      background-color: #fff;
      border: 1px solid #000;
      cursor: pointer;
    }
  }
  .selected {
    > button {
      border-color: blue;
    }
  }
  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
