

import * as ContainerManager$Meta3dEvent from "../../../src/event_manager/data/ContainerManager.bs.js";
import * as EventExtensionTool$Meta3dEvent from "./EventExtensionTool.bs.js";
import * as InitEventDoService$Meta3dEvent from "../../../src/event_manager/service/init_event/InitEventDoService.bs.js";

function initEvent(param) {
  ContainerManager$Meta3dEvent.setState(InitEventDoService$Meta3dEvent.initEvent(ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined)), EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined)), EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined));
}

export {
  initEvent ,
}
/* InitEventDoService-Meta3dEvent Not a pure module */
