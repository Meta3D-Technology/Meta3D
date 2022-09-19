

import * as ContainerManager$Meta3dEvent from "../data/ContainerManager.bs.js";
import * as InitEventDoService$Meta3dEvent from "../service/init_event/InitEventDoService.bs.js";

function initEvent(param) {
  return ContainerManager$Meta3dEvent.setState(InitEventDoService$Meta3dEvent.initEvent(ContainerManager$Meta3dEvent.getState(undefined)));
}

export {
  initEvent ,
  
}
/* ContainerManager-Meta3dEvent Not a pure module */
