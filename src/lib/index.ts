import "./index.css";
import { init } from "./simulator";

class MyLibrary {
  constructor() {
    console.log("Library constructor loaded");
  }

  myMethod = (): boolean => {
    console.log("Library method fired");
    return true;
  };
  initSimulator = (container: any) => {
    init(container);
  };
}

export default MyLibrary;
