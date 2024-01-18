

import * as Main$Meta3dEventDataUtils from "../../../../../../../node_modules/meta3d-event-data-utils/lib/es6_global/src/Main.bs.js";
import * as ParseEventData$Meta3dEventData from "./ParseEventData.bs.js";

function getExtensionService(api) {
  return {
          parseEventData: ParseEventData$Meta3dEventData.parse,
          exportEventData: Main$Meta3dEventDataUtils.exportEventData,
          generateEventDataBuffer: Main$Meta3dEventDataUtils.generateEventDataBuffer
        };
}

function createExtensionState(param, param$1) {
  return {};
}

function getExtensionLife(api, extensionProtocolName) {
  return {
          onRegister: null,
          onRestore: null,
          onDeepCopy: null,
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
/* No side effect */
