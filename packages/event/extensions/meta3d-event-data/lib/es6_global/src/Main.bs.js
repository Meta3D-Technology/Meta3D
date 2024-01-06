

import * as ParseEventData$Meta3dEventData from "./ParseEventData.bs.js";
import * as ExportEventData$Meta3dEventData from "./ExportEventData.bs.js";

function getExtensionService(api) {
  return {
          parseEventData: ParseEventData$Meta3dEventData.parse,
          exportEventData: ExportEventData$Meta3dEventData.$$export,
          generateEventDataBuffer: ExportEventData$Meta3dEventData.generateEventDataBuffer
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
