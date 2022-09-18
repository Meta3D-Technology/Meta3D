

import * as EventManager$Meta3dEvent from "./EventManager.bs.js";

function getExtensionService(api, param) {
  return {
          trigger: (function (param, param$1, param$2, param$3) {
              return EventManager$Meta3dEvent.trigger(api, param, param$1, param$2, param$3);
            }),
          registerEvent: EventManager$Meta3dEvent.registerEvent
        };
}

function createExtensionState(param) {
  return EventManager$Meta3dEvent.createExtensionState(undefined);
}

function getExtensionLife(param, param$1) {
  return {
          onRegister: null,
          onStart: null
        };
}

export {
  getExtensionService ,
  createExtensionState ,
  getExtensionLife ,
  
}
/* No side effect */
