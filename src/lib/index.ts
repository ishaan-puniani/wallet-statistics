import {
  _renderAvailableAchievements,
  _renderUserAchievements,
  _renderAcknowledgeAchievements,
  _renderUnacknowledgeAchievements,
  _renderUserAchievementTable,
} from "./Achievement";
import {
  renderDropdownAmountTypes,
  renderDropdownCurrencyTypes,
  renderDropdownTransactionTypes,
} from "./Metadata";
import "./index.css";
import {
  renderBalances,
  renderBalancesChart,
  _renderBalancesReportChart,
  renderTransactionProfileView,
  renderTransactionTableView,
} from "./PartnerBalances";
import {
  _renderReportChart,
  _renderReportBalanceChart,
  _renderMiniTransactionTypeCard,
  _renderGroupReportChart,
  _renderRecentTransactionTable,
  _renderMiniCard,
  _renderTransactionCount,
  _renderTransactionCountLineChart,
  _renderCountPerTransactionTypePieChart,
  _renderPartnersCount,
  _renderUserAchievementsCount,
  _renderUserAchievementsLogsCount,
  _renderPartnersCountLineChart,
  _renderUserAchievementsCountLineChart,
  _renderUserAchievementsLogsCountLineChart,
  _renderCountPerPartnerTypePieChart,
  _renderCountPerAchievementsTypePieChart,
  _renderCountPerAchievementsLogsTypePieChart,
} from "./Reports";
import {
  _renderPartnerHeirarchyChart,
  renderPartnerHeirarchyTreeView,
  renderPartnerHeirarchyView,
} from "./partnerHeirarchy";
import {
  render,
  renderSimulatorAchievement,
  renderStimulator,
} from "./simulator";
import { _initialize } from "./services/settings";
import {
  _fetchBalance,
  _fetchBalanceHistory,
  _fetchGetBalances,
  _fetchTransactionGroupedBalances,
  _fetchReportTransactions,
  _fetchReportTransactionsCount,
  _fetchReportUserAchievementsCount,
  _fetchReportUserAchievementsLogsCount,
  _fetchReportPartnersCount,
  _validateCoupon,
} from "./services/balances";
import { _fetchTransactions, _fetchTransaction } from "./services/transactions";
import {
  _fetchAchievementsLogs,
  _fetchUserAchievementsLogs,
} from "./services/achievementLogs";
import {
  stimulateTransaction,
  stimulateMultiTransactions,
} from "./services/stimulator";
import { renderCouponValidate, renderTransactionRule } from "./Transactions";

class WalletStatistics {
  constructor() {
    console.log("Library constructor loaded");
  }

  myMethod = (): boolean => {
    console.log("Library method fired");
    return true;
  };
  initSimulator = (container: any, props: any) => {
    render(container, props);
  };
  initializeSimulator = (container: any, props: any) => {
    renderStimulator(container, props);
  };

  services = {
    initializeSettings: _initialize,
    fetchBalance: _fetchBalance,
    fetchBalanceHistory: _fetchBalanceHistory,
    fetchGetBalances: _fetchGetBalances,
    fetchTransactions: _fetchTransactions,
    fetchTransaction: _fetchTransaction,
    fetchAchievementLogs: _fetchAchievementsLogs,
    fetchUserAchievementLogs: _fetchUserAchievementsLogs,
    stimulateTransaction: stimulateTransaction,
    stimulateMultiTransactions: stimulateMultiTransactions,
    fetchTransactionGroupedBalances: _fetchTransactionGroupedBalances,
    fetchReportTransactions: _fetchReportTransactions,
    validateCoupon: _validateCoupon,
    fetchReportTransactionsCount: _fetchReportTransactionsCount,
    fetchReportUserAchievementsCount: _fetchReportUserAchievementsCount,
    fetchReportUserAchievementsLogsCount: _fetchReportUserAchievementsLogsCount,
    fetchReportPartnersCount: _fetchReportPartnersCount,
  };

  // expose fetchTransactions for testing purpose
  fetchTransactions = async (props: any) => {
    return _fetchTransactions(
      props.credentials,
      props.pageSize,
      props.startRow,
      props.filterMap
    );
  };

  initializeSettings = async (props: any) => {
    await _initialize(props.credentials, props.reset);
  };
  renderPartnerSimulatorAchievement = (container: any, props: any) => {
    renderSimulatorAchievement(container, props);
  };
  renderPartnerHeirarchyTree = (container: any, props: any) => {
    renderPartnerHeirarchyTreeView(container, props);
  };
  renderPartnerHeirarchyChart = (container: any, props: any) => {
    _renderPartnerHeirarchyChart(container, props);
  };
  renderPartnerBalances = (container: any, props: any) => {
    renderBalances(container, props);
  };
  renderPartnerBalancesChart = (container: any, props: any) => {
    renderBalancesChart(container, props);
  };
  renderPartnerBalancesReportChart = (container: any, props: any) => {
    _renderBalancesReportChart(container, props);
  };

  renderAchievements = (container: any, props: any) => {
    _renderAvailableAchievements(container, props);
  };
  renderUserAchievements = (container: any, props: any) => {
    _renderUserAchievements(container, props);
  };
  renderAcknowledgeAchievements = (container: any, props: any) => {
    _renderAcknowledgeAchievements(container, props);
  };
  renderUnacknowledgeAchievements = (container: any, props: any) => {
    _renderUnacknowledgeAchievements(container, props);
  };
  renderUserAchievementTable = (container: any, props: any) => {
    _renderUserAchievementTable(container, props);
  };
  renderPartnerHeirarchy = (container: any, props: any) => {
    renderPartnerHeirarchyView(container, props);
  };
  renderPartnerTransactionProfile = (container: any, props: any) => {
    renderTransactionProfileView(container, props);
  };
  renderPartnerTransactionTable = (container: any, props: any) => {
    renderTransactionTableView(container, props);
  };
  renderMetadataDropdownTransactionType = (container: any, props: any) => {
    renderDropdownTransactionTypes(container, props);
  };
  renderMetadataDropdownCurrencyType = (container: any, props: any) => {
    renderDropdownCurrencyTypes(container, props);
  };

  renderMetadataDropdownAmountType = (container: any, props: any) => {
    renderDropdownAmountTypes(container, props);
  };

  renderReportChart = (container: any, props: any) => {
    _renderReportChart(container, props);
  };

  renderReportBalanceChart = (container: any, props: any) => {
    _renderReportBalanceChart(container, props);
  };
  renderMiniTransactionTypeCard = (container: any, props: any) => {
    _renderMiniTransactionTypeCard(container, props);
  };
  renderGroupReportChart = (container: any, props: any) => {
    _renderGroupReportChart(container, props);
  };
  renderRecentTransactionTable = (container: any, props: any) => {
    _renderRecentTransactionTable(container, props);
  };
  renderMiniCard = (container: any, props: any) => {
    _renderMiniCard(container, props);
  };
  renderTransactionCount = (container: any, props: any) => {
    _renderTransactionCount(container, props);
  };
  renderTransactionCountLineChart = (container: any, props: any) => {
    _renderTransactionCountLineChart(container, props);
  };
  renderCountPerTransactionTypePieChart = (container: any, props: any) => {
    _renderCountPerTransactionTypePieChart(container, props);
  };
  renderPartnersCount = (container: any, props: any) => {
    _renderPartnersCount(container, props);
  };
  renderUserAchievementsCount = (container: any, props: any) => {
    _renderUserAchievementsCount(container, props);
  };
  renderUserAchievementsLogsCount = (container: any, props: any) => {
    _renderUserAchievementsLogsCount(container, props);
  };
  renderPartnersCountLineChart = (container: any, props: any) => {
    _renderPartnersCountLineChart(container, props);
  };
  renderUserAchievementsCountLineChart = (container: any, props: any) => {
    _renderUserAchievementsCountLineChart(container, props);
  };
  renderUserAchievementsLogsCountLineChart = (container: any, props: any) => {
    _renderUserAchievementsLogsCountLineChart(container, props);
  };
  renderCountPerPartnerTypePieChart = (container: any, props: any) => {
    _renderCountPerPartnerTypePieChart(container, props);
  };
  renderCountPerAchievementsTypePieChart = (container: any, props: any) => {
    _renderCountPerAchievementsTypePieChart(container, props);
  };
  renderCountPerAchievementsLogsTypePieChart = (container: any, props: any) => {
    _renderCountPerAchievementsLogsTypePieChart(container, props);
  };
  renderValidateTransactionRule = (container: any, props: any) => {
    renderTransactionRule(container, props);
  };
  renderValidateCoupon = (container: any, props: any) => {
    renderCouponValidate(container, props);
  };
}

export default WalletStatistics;
