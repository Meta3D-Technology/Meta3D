

import * as EventManager$Meta3dEvent from "./EventManager.bs.js";

function getExtensionService(api, param) {
  return {
          trigger: (function (param, param$1, param$2, param$3) {
              return EventManager$Meta3dEvent.trigger(api, param, param$1, param$2, param$3);
            }),
          registerAction: EventManager$Meta3dEvent.registerAction,
          onPointEvent: (function (param, param$1) {
              return EventManager$Meta3dEvent.onPointEvent(api, param, param$1);
            }),
          initEvent: (function (param, param$1) {
              return EventManager$Meta3dEvent.initEvent(api, param, param$1);
            }),
          setBrowser: (function (param, param$1, param$2) {
              return EventManager$Meta3dEvent.setBrowser(api, param, param$1, param$2);
            }),
          setCanvas: (function (param, param$1, param$2) {
              return EventManager$Meta3dEvent.setCanvas(api, param, param$1, param$2);
            }),
          setBody: (function (param, param$1, param$2) {
              return EventManager$Meta3dEvent.setBody(api, param, param$1, param$2);
            }),
          getBrowserChromeType: EventManager$Meta3dEvent.getBrowserChromeType,
          getBrowserFirefoxType: EventManager$Meta3dEvent.getBrowserFirefoxType,
          getBrowserAndroidType: EventManager$Meta3dEvent.getBrowserAndroidType,
          getBrowserIOSType: EventManager$Meta3dEvent.getBrowserIOSType,
          getBrowserUnknownType: EventManager$Meta3dEvent.getBrowserUnknownType,
          getPointDownEventName: EventManager$Meta3dEvent.getPointDownEventName,
          getPointUpEventName: EventManager$Meta3dEvent.getPointUpEventName,
          getPointTapEventName: EventManager$Meta3dEvent.getPointTapEventName,
          getPointMoveEventName: EventManager$Meta3dEvent.getPointMoveEventName,
          getPointScaleEventName: EventManager$Meta3dEvent.getPointScaleEventName,
          getPointDragStartEventName: EventManager$Meta3dEvent.getPointDragStartEventName,
          getPointDragOverEventName: EventManager$Meta3dEvent.getPointDragOverEventName
        };
}

function createExtensionState(param) {
  return EventManager$Meta3dEvent.createExtensionState(undefined);
}

function getExtensionLife(param, param$1) {
  return {
          onRegister: null,
          onStart: null,
          onInit: null,
          onUpdate: null
        };
}

export {
  getExtensionService ,
  createExtensionState ,
  getExtensionLife ,
}
/* EventManager-Meta3dEvent Not a pure module */
