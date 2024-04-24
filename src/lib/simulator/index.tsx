import React from "react";
import ReactDOM from "react-dom";
import Simulator from "./Simulator";
import Achievements from "./Achievements";
export const render = (container: any,props:any) => {
  ReactDOM.render(<Simulator {...props} />, container);
};
export const renderSimulatorAchievement = (container: any, props: any) => {
  ReactDOM.render(<Achievements {...props} />, container);
};

