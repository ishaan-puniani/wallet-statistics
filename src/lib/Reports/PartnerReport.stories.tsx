import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { getServiceAccountCredentials } from "../../utilities/storage";
import ReportChart from "./ReportChart";
import ReportBalanceChart from "./ReportBalanceChart";
import moment from "moment";
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

export default {
  title: "Example/Reports",
  component: ReportChart,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof ReportChart>;

const TemplateDemo: ComponentStory<typeof ReportChart> = (args) => (
  <ReportChart {...args} />
);
const TemplateTwo: ComponentStory<typeof ReportBalanceChart> = (args) => (
  <ReportBalanceChart {...args} />
);
const TemplateThree: ComponentStory<typeof MiniTransactionTypeCard> = (
  args
) => <MiniTransactionTypeCard {...args} />;

const TemplateFour: ComponentStory<typeof ReportChart> = (args) => (
  <GroupReportChart {...args} />
);

const TemplateFive: ComponentStory<typeof RecentTransactionTable> = (args) => (
  <RecentTransactionTable {...args} />
);

const TemplateSix: ComponentStory<typeof MiniCard> = (args) => (
  <MiniCard {...args} />
);

const TemplateSeven: ComponentStory<typeof TransactionsCount> = (args) => (
  <TransactionsCount {...args} />
);

const TemplateEight: ComponentStory<typeof TransactionCountLineChart> = (
  args
) => <TransactionCountLineChart {...args} />;

const TemplateNine: ComponentStory<typeof CountPerTransactionTypePieChart> = (
  args
) => <CountPerTransactionTypePieChart {...args} />;

const TemplateTen: ComponentStory<typeof PartnersCount> = (args) => (
  <PartnersCount {...args} />
);

const TemplateEleven: ComponentStory<typeof UserAchievementsCount> = (args) => (
  <UserAchievementsCount {...args} />
);
const TemplateTwelve: ComponentStory<typeof UserAchievementsLogsCount> = (
  args
) => <UserAchievementsLogsCount {...args} />;

export const PartnerBalanceReportChart = TemplateTwo.bind({});
PartnerBalanceReportChart.args = {
  credentials: getServiceAccountCredentials() || {},
  showRaw: false,
  themeConfig: {},
  chartOptions: {},
  transactionTypes: [],
  chartType: "",
  startDate: moment(),
  endDate: moment(),
  type: "",
};
export const PartnerReportChart = TemplateDemo.bind({});
PartnerReportChart.args = {
  credentials: getServiceAccountCredentials() || {},
  showRaw: false,
  themeConfig: {},
  chartOptions: {},
  transactionTypes: [],
  chartType: "",
  startDate: moment(),
  endDate: moment(),
};

export const PartnerGroupReportChart = TemplateFour.bind({});
PartnerGroupReportChart.args = {
  credentials: getServiceAccountCredentials() || {},
  showRaw: false,
  themeConfig: {},
  chartOptions: {},
  transactionTypes: [],
  chartType: "",
  startDate: moment(),
  endDate: moment(),
};

export const RecentTransactionTableView = TemplateFive.bind({});
RecentTransactionTableView.args = {
  credentials: getServiceAccountCredentials() || {},
  showRaw: false,
  startDate: moment(),
  endDate: moment(),
  userId: "",
  currency: "",
  limit: "10",
};

export const MiniTransactionCard = TemplateThree.bind({});
MiniTransactionCard.args = {
  credentials: getServiceAccountCredentials() || {},
  showRaw: false,
  includePrevious: false,
  cardConfig: {},
  group: "",
  startDate: moment(),
  endDate: moment(),
  transactionType: "",
};

export const MiniTransaction = TemplateSix.bind({});
MiniTransaction.args = {
  credentials: getServiceAccountCredentials() || {},
  showRaw: false,
  includePrevious: false,
  cardConfig: {},
  group: "",
  startDate: moment(),
  endDate: moment(),
  transactionType: "",
  showPrevious: false,
  isTransaction: false,
  volume: "group",
};

export const TransactionCount = TemplateSeven.bind({});
TransactionCount.args = {
  credentials: getServiceAccountCredentials() || {},
  showRaw: false,
  includePrevious: false,
  cardConfig: {},
  group: "",
  startDate: moment(),
  endDate: moment(),
  transactionType: "",
  showPrevious: false,
  totalCount: false,
};

export const TransactionCountLine = TemplateEight.bind({});
TransactionCountLine.args = {
  credentials: getServiceAccountCredentials() || {},
  showRaw: false,
  group: "",
  startDate: moment(),
  endDate: moment(),
  transactionTypes: [],
};

export const CountPerTransactionTypePie = TemplateNine.bind({});
CountPerTransactionTypePie.args = {
  credentials: getServiceAccountCredentials() || {},
  showRaw: false,
};

export const PartnerCount = TemplateTen.bind({});
PartnerCount.args = {
  credentials: getServiceAccountCredentials() || {},
  showRaw: false,
  includePrevious: false,
  cardConfig: {},
  group: "",
  startDate: moment(),
  endDate: moment(),
  transactionType: "",
  showPrevious: false,
  totalCount: false,
};

export const UserAchievementCount = TemplateEleven.bind({});
UserAchievementCount.args = {
  credentials: getServiceAccountCredentials() || {},
  showRaw: false,
  includePrevious: false,
  cardConfig: {},
  group: "",
  startDate: moment(),
  endDate: moment(),
  transactionType: "",
  showPrevious: false,
  totalCount: false,
};
export const UserAchievementLogsCount = TemplateTwelve.bind({});
UserAchievementLogsCount.args = {
  credentials: getServiceAccountCredentials() || {},
  showRaw: false,
  includePrevious: false,
  cardConfig: {},
  group: "",
  startDate: moment(),
  endDate: moment(),
  transactionType: "",
  showPrevious: false,
  totalCount: false,
};
