import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <LoaderWrapper>
      <div className="loader"></div>
    </LoaderWrapper>
  );
};

const LoaderWrapper = styled.div`
  .loader {
    border: 2px solid rgb(7, 128, 243);
    border-left-color: transparent;
    border-radius: 50%;
  }

  .loader {
    border: 2px solid rgb(7, 128, 243);
    border-left-color: transparent;
    width: 12px;
    height: 12px;
  }

  .loader {
    border: 2px solid rgb(7, 128, 243);
    border-left-color: transparent;
    width: 12px;
    height: 12px;
    animation: spin89345 1s linear infinite;
  }

  @keyframes spin89345 {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
