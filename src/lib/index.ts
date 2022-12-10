import "./index.css";
import PartnerHeirarchyTree from "./partnerHeirarchy/PartnerHeirarchyTree";
import { render } from "./simulator";

class WalletStatistics {
  public static PartnerHeirarchyTree = PartnerHeirarchyTree;

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
 
}

export default WalletStatistics;
