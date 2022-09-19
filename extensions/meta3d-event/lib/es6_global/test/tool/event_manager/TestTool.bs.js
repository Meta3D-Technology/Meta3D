

import * as ContainerManager$Meta3dEvent from "../../../src/event_manager/data/ContainerManager.bs.js";
import * as CreateEventManagerState$Meta3dEvent from "../../../src/event_manager/data/CreateEventManagerState.bs.js";

function prepareState(param) {
  return ContainerManager$Meta3dEvent.setState(CreateEventManagerState$Meta3dEvent.create(undefined));
}

export {
  prepareState ,
  
}
/* ContainerManager-Meta3dEvent Not a pure module */
