import React from "react";
import { createRoot } from "react-dom/client";
import BalancesChart from "./BalancesChart";
import BalancesReportChart from "./BalancesReportChart";
import PartnerBalances from "./PartnerBalances";
import PayerTransaction from "./PayerTransaction";
import TransactionTable from "./TransactionTable";

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

export const renderBalances = (container: any, props: any) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<PartnerBalances {...props} />);
  }
};

export const renderBalancesChart = (container: any, props: any) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<BalancesChart {...props} />);
  }
};

export const _renderBalancesReportChart = (container: any, props: any) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<BalancesReportChart {...props} />);
  }
};

export const renderTransactionProfileView = (container: any, props: any) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<PayerTransaction {...props} />);
  }
};

export const renderTransactionTableView = (container: any, props: any) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<TransactionTable {...props} />);
  }
};