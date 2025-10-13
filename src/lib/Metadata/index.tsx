import React from "react";
import { createRoot } from "react-dom/client";

import Dropdown from "./DropdownCurrencyTypes";
import DropdownCurrencyTypes from "./DropdownCurrencyTypes";
import DropdownTransactionTypes from "./DropdownTransactionTypes";
import DropdownAmountTypes from "./DropdownAmountTypes";

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

export const renderDropdown = (container: any, props: any) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<Dropdown {...props} />);
  }
};

export const renderDropdownAmountTypes = (container: any, props: any) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<DropdownAmountTypes {...props} />);
  }
};

export const renderDropdownCurrencyTypes = (container: any, props: any) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<DropdownCurrencyTypes {...props} />);
  }
};

export const renderDropdownTransactionTypes = (container: any, props: any) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<DropdownTransactionTypes {...props} />);
  }
};
