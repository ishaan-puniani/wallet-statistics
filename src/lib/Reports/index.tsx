import React from "react";
import { createRoot } from "react-dom/client";
import ReportChart from "./ReportChart";
import ReportBalanceChart from "./ReportBalanceChart";
import MiniTransactionTypeCard from "./MiniTransactionTypeCard";
import GroupReportChart from "./GroupReportChart";
import RecentTransactionTable from "./RecentTransactionTable";
import MiniCard from "./MiniCard";
import TransactionsCount from "./TransactionsCount";
import TransactionCountLineChart from "./TransactionCountLineChart";
import CountPerTransactionTypePieChart from "./CountPerTransactionTypePieChart";
import PartnersCount from "./PartnersCount";
import UserAchievementsCount from "./UserAchievementsCount";
import UserAchievementsLogsCount from "./UserAchievementsLogsCount";
import PartnersCountLineChart from "./PartnersCountLineChart";
import UserAchievementsCountLineChart from "./UserAchievementsCountLineChart";
import UserAchievementsLogsCountLineChart from "./UserAchievementsLogsCountLineChart";
import CountPerPartnerTypePieChart from "./CountPerPartnerTypePieChart";
import CountPerAchievementsTypePieChart from "./CountPerAchievementsTypePieChart";
import CountPerAchievementsLogsTypePieChart from "./CountPerAchievementsLogsTypePieChart";

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

export const _renderReportChart = (container: any, props: any) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<ReportChart {...props} />);
  }
};

export const _renderReportBalanceChart = (container: any, props: any) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<ReportBalanceChart {...props} />);
  }
};

export const _renderMiniTransactionTypeCard = (container: any, props: any) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<MiniTransactionTypeCard {...props} />);
  }
};

export const _renderGroupReportChart = (container: any, props: any) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<GroupReportChart {...props} />);
  }
};

export const _renderRecentTransactionTable = (container: any, props: any) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<RecentTransactionTable {...props} />);
  }
};

export const _renderMiniCard = (container: any, props: any) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<MiniCard {...props} />);
  }
};

export const _renderTransactionCount = (container: any, props: any) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<TransactionsCount {...props} />);
  }
};

export const _renderTransactionCountLineChart = (
  container: any,
  props: any
) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<TransactionCountLineChart {...props} />);
  }
};

export const _renderCountPerTransactionTypePieChart = (
  container: any,
  props: any
) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<CountPerTransactionTypePieChart {...props} />);
  }
};

export const _renderPartnersCount = (container: any, props: any) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<PartnersCount {...props} />);
  }
};

export const _renderUserAchievementsCount = (container: any, props: any) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<UserAchievementsCount {...props} />);
  }
};

export const _renderUserAchievementsLogsCount = (
  container: any,
  props: any
) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<UserAchievementsLogsCount {...props} />);
  }
};

export const _renderPartnersCountLineChart = (container: any, props: any) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<PartnersCountLineChart {...props} />);
  }
};

export const _renderUserAchievementsCountLineChart = (
  container: any,
  props: any
) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<UserAchievementsCountLineChart {...props} />);
  }
};

export const _renderUserAchievementsLogsCountLineChart = (
  container: any,
  props: any
) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<UserAchievementsLogsCountLineChart {...props} />);
  }
};

export const _renderCountPerPartnerTypePieChart = (
  container: any,
  props: any
) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<CountPerPartnerTypePieChart {...props} />);
  }
};

export const _renderCountPerAchievementsTypePieChart = (
  container: any,
  props: any
) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<CountPerAchievementsTypePieChart {...props} />);
  }
};

export const _renderCountPerAchievementsLogsTypePieChart = (
  container: any,
  props: any
) => {
  const root = getOrCreateRoot(container);
  if (root) {
    root.render(<CountPerAchievementsLogsTypePieChart {...props} />);
  }
};
