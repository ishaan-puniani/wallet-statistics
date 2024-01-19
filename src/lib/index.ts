import {
  _renderAvailableAchievements,
  _renderUserAchievements,
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
import { _renderReportChart } from "./Reports";
import {
  _renderPartnerHeirarchyChart,
  renderPartnerHeirarchyTreeView,
  renderPartnerHeirarchyView,
} from "./partnerHeirarchy";
import { render, renderSimulatorAchievement } from "./simulator";
import { _initialize } from "./services/settings";
import {
  _fetchBalance,
  _fetchBalanceHistory,
  _fetchGetBalances,
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
class WalletStatistics {
  constructor() {
    console.log("Library constructor loaded");
  }

  myMethod = (): boolean => {
    console.log("Library method fired");
    return true;
  };
  initSimulator = (container: any) => {
    render(container);
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
}

export default WalletStatistics;
