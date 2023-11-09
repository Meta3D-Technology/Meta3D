

import * as CanvasDoService$Meta3dEvent from "../../../src/event_manager/service/dom/CanvasDoService.bs.js";
import * as ContainerManager$Meta3dEvent from "../../../src/event_manager/data/ContainerManager.bs.js";
import * as EventExtensionTool$Meta3dEvent from "./EventExtensionTool.bs.js";

function setCanvas(canvas) {
  ContainerManager$Meta3dEvent.setState(CanvasDoService$Meta3dEvent.setCanvas(ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined)), canvas), EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined));
}

export {
  setCanvas ,
}
/* No side effect */
