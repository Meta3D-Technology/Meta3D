

import * as ContainerManager$Meta3dEvent from "../../../src/event_manager/data/ContainerManager.bs.js";
import * as EventExtensionTool$Meta3dEvent from "../api/EventExtensionTool.bs.js";
import * as CreateEventManagerState$Meta3dEvent from "../../../src/event_manager/data/CreateEventManagerState.bs.js";

function prepareState(param) {
  return ContainerManager$Meta3dEvent.setState(CreateEventManagerState$Meta3dEvent.create(undefined), EventExtensionTool$Meta3dEvent.buildEventExtentsionName(undefined));
}

export {
  prepareState ,
  
}
/* No side effect */
