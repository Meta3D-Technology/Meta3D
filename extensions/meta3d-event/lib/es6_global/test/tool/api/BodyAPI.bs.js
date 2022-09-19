

import * as BodyDoService$Meta3dEvent from "../../../src/event_manager/service/dom/BodyDoService.bs.js";
import * as ContainerManager$Meta3dEvent from "../../../src/event_manager/data/ContainerManager.bs.js";
import * as EventExtensionTool$Meta3dEvent from "./EventExtensionTool.bs.js";

function getBodyExn(param) {
  return BodyDoService$Meta3dEvent.getBodyExn(ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined)));
}

function setBody(body) {
  return ContainerManager$Meta3dEvent.setState(BodyDoService$Meta3dEvent.setBody(ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined)), body), EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined));
}

export {
  getBodyExn ,
  setBody ,
  
}
/* No side effect */
