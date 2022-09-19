

import * as BrowserDoService$Meta3dEvent from "../service/browser/BrowserDoService.bs.js";
import * as ContainerManager$Meta3dEvent from "../data/ContainerManager.bs.js";

function setBrowser(browser) {
  return ContainerManager$Meta3dEvent.setState(BrowserDoService$Meta3dEvent.setBrowser(ContainerManager$Meta3dEvent.getState(undefined), browser));
}

export {
  setBrowser ,
  
}
/* ContainerManager-Meta3dEvent Not a pure module */
