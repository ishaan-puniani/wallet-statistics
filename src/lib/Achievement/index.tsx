import React from "react";
import ReactDOM from "react-dom";
import AcknowledgeAchievement from "./AcknowledgeAchievement";
import AvailableAchievement from "./AvailableAchievement";
import UserAchievement from "./UserAchievements";
import UnacknowledgedAchievement from "./UnacknowledgedAchievement";
import UserAchievementTable from "./UserAchievementTable";

export const _renderAvailableAchievements = (container: any, props: any) => {
  ReactDOM.render(<AvailableAchievement {...props} />, container);
};
export const _renderUserAchievements = (container: any, props: any) => {
  ReactDOM.render(<UserAchievement {...props} />, container);
};

export const _renderAcknowledgeAchievements = (container: any, props: any) => {
  ReactDOM.render(<AcknowledgeAchievement {...props} />, container);
};

export const _renderUnacknowledgeAchievements = (container: any, props: any) => {
  ReactDOM.render(<UnacknowledgedAchievement {...props} />, container);
};

export const _renderUserAchievementTable = (container: any, props: any) => {
  ReactDOM.render(<UserAchievementTable {...props} />, container);
};


