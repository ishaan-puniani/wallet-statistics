import React from "react";

export interface ISimulatorProps {
  text?: string;
}

const Simulator = (props: ISimulatorProps) => {
  return (
    <>
      <h1>{props.text}</h1>
    </>
  );
};
export default Simulator;
