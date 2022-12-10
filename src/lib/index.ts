import "./index.css";
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
}

export default WalletStatistics;
