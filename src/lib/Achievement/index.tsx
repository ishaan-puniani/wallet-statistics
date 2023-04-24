import React from "react";
import ReactDOM from "react-dom";
import AvailableAchievement from "./AvailableAchievement";
import UserAchievement from "./UserAchievements";
import AchievementsLogs from "./AchievementsLogs";
export const _renderAvailableAchievements = (container: any, props: any) => {
  ReactDOM.render(<AvailableAchievement {...props} />, container);
};
export const _renderUserAchievements = (container: any, props: any) => {
  ReactDOM.render(<UserAchievement {...props} />, container);
};

export const _renderUserAchievementsLogs = (container: any, props: any) => {
  ReactDOM.render(<AchievementsLogs {...props} />, container);
};
