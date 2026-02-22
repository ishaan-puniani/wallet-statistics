import React from "react";
import styled from "styled-components";
import { Group } from "./utils";

type PeriodToogleProps = {
  group: Group;
  groupHandler: (group: Group) => void;
  supportedGrouping: Group[];
};

const PeriodToogle: React.FC<PeriodToogleProps> = ({
  group,
  groupHandler,
  supportedGrouping,
}) => {
  return (
    <Wrapper>
      <div className="grouping-btn">
        {supportedGrouping?.map((i) => {
          return (
            <div
              key={String(i)}
              className={`group group-daily ${group === i ? "selected" : ""}`}
            >
              <button onClick={() => groupHandler(i)}>
                {String(i).charAt(0).toUpperCase() + String(i).slice(1)}
              </button>
            </div>
          );
        })}
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
