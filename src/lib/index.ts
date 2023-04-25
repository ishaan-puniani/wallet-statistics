import {
  _renderAvailableAchievements,
  _renderUserAchievements,
  _renderUserAchievementsLogs,
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
  _renderPartnerHeirarchyChart,
  renderPartnerHeirarchyTreeView,
  renderPartnerHeirarchyView,
} from "./partnerHeirarchy";
import { render, renderSimulatorAchievement } from "./simulator";
import { _initialize } from "./services/settings";
import { _fetchBalance, _fetchBalanceHistory } from "./services/balances";
import { _fetchTransactions } from "./services/transactions";
import { _fetchAchievementsLogs } from "./services/achievementLogs";

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
    fetchTransactions: _fetchTransactions,
    fetchAchievementLogs:_fetchAchievementsLogs,
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
}

export default WalletStatistics;
