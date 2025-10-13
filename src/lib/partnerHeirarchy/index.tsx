import React from "react";
import { createRoot } from "react-dom/client";
import PartnerHeirarchy from "./PartnerHeirarchy";
import PartnerHeirarchyTree from "./PartnerHeirarchyTree";
import HeirarchyChart from "./HeirarchyChart";

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

export const renderPartnerHeirarchyTreeView = (container: any, props: any) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<PartnerHeirarchyTree {...props} />);
  }
};

export const renderPartnerHeirarchyView = (container: any, props: any) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<PartnerHeirarchy {...props} />);
  }
};

export const _renderPartnerHeirarchyChart = (container: any, props: any) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<HeirarchyChart {...props} />);
  }
};
