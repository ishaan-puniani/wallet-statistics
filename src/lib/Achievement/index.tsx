import React from "react";
import { createRoot } from "react-dom/client";
import AcknowledgeAchievement from "./AcknowledgeAchievement";
import AvailableAchievement from "./AvailableAchievement";
import UserAchievement from "./UserAchievements";
import UnacknowledgedAchievement from "./UnacknowledgedAchievement";
import UserAchievementTable from "./UserAchievementTable";

// Store roots to prevent multiple root creation
const roots = new WeakMap();

const getOrCreateRoot = (container: any) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    console.warn('DOM not available - skipping render');
    return null;
  }
  
  if (!roots.has(container)) {
    roots.set(container, createRoot(container));
  }
  return roots.get(container);
};

export const _renderAvailableAchievements = (container: any, props: any) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<AvailableAchievement {...props} />);
  }
};

export const _renderUserAchievements = (container: any, props: any) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<UserAchievement {...props} />);
  }
};

export const _renderAcknowledgeAchievements = (container: any, props: any) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<AcknowledgeAchievement {...props} />);
  }
};

export const _renderUnacknowledgeAchievements = (container: any, props: any) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<UnacknowledgedAchievement {...props} />);
  }
};

export const _renderUserAchievementTable = (container: any, props: any) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<UserAchievementTable {...props} />);
  }
};


