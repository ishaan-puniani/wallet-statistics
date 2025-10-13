import React from "react";
import { createRoot } from "react-dom/client";
import Simulator from "./Simulator";
import Achievements from "./Achievements";
import Stimulator from "./Stimulator";

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

export const render = (container: any, props: any) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<Simulator {...props} />);
  }
};

export const renderSimulatorAchievement = (container: any, props: any) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<Achievements {...props} />);
  }
};

export const renderStimulator = (container: any, props: any) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<Stimulator {...props} />);
  }
};

