import "./index.css";
import { renderBalances, renderBalancesChart } from "./PartnerBalances";
import { renderPartnerHeirarchyTreeView } from "./partnerHeirarchy";
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
  
}

export default WalletStatistics;
