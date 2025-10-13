import React from "react";
import { createRoot } from "react-dom/client";
import TransactionRuleValidation from "./TransactionRuleValidation";
import CouponValidation from "./CouponValidation";

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

export const renderTransactionRule = (container: any, props: any) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<TransactionRuleValidation {...props} />);
  }
};

export const renderCouponValidate = (container: any, props: any) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<CouponValidation {...props} />);
  }
};
