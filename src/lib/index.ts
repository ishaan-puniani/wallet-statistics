import {
  _renderAvailableAchievements,
  _renderUserAchievements,
} from "./Achievement";
import "./index.css";
import {
  renderBalances,
  renderBalancesChart,
  _renderBalancesReportChart,
  renderTransactionProfileView,
  renderTransactionTableView,
} from "./PartnerBalances";
import {
  renderPartnerHeirarchyTreeView,
  renderPartnerHeirarchyView,
} from "./partnerHeirarchy";
import { render } from "./simulator";

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
  renderPartnerHeirarchyTree = (container: any, props: any) => {
    renderPartnerHeirarchyTreeView(container, props);
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
}

export default WalletStatistics;
