

import * as EventManager$Meta3dEvent from "./EventManager.bs.js";

function getExtensionService(api, param) {
  return {
          trigger: (function (param, param$1, param$2, param$3) {
              return EventManager$Meta3dEvent.trigger(api, param, param$1, param$2, param$3);
            }),
          onCustomEvent: EventManager$Meta3dEvent.onCustomEvent
        };
}

function createExtensionState(param) {
  return EventManager$Meta3dEvent.createExtensionState(undefined);
}

export {
  getExtensionService ,
  createExtensionState ,
  
}
/* No side effect */
