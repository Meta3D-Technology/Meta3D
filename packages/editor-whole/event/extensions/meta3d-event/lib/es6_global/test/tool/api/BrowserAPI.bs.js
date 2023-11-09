

import * as BrowserDoService$Meta3dEvent from "../../../src/event_manager/service/browser/BrowserDoService.bs.js";
import * as ContainerManager$Meta3dEvent from "../../../src/event_manager/data/ContainerManager.bs.js";
import * as EventExtensionTool$Meta3dEvent from "./EventExtensionTool.bs.js";

function setBrowser(browser) {
  ContainerManager$Meta3dEvent.setState(BrowserDoService$Meta3dEvent.setBrowser(ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined)), browser), EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined));
}

export {
  setBrowser ,
}
/* No side effect */
