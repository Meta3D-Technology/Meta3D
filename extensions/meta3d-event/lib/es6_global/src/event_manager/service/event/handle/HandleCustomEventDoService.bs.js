

import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as MutableHashMap$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/MutableHashMap.bs.js";

function _triggerHandleFunc(customEvent, arr, state) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(arr, (function (param, param$1) {
                var customEvent = param[1];
                var state = param[0];
                if (customEvent.isStopPropagation) {
                  return [
                          state,
                          customEvent
                        ];
                } else {
                  return param$1.handleFunc(customEvent, state);
                }
              }), [
              state,
              customEvent
            ]);
}

function stopPropagation(customEvent) {
  return {
          name: customEvent.name,
          isStopPropagation: true,
          phase: customEvent.phase,
          userData: customEvent.userData
        };
}

function triggerGlobalEvent(customEvent, state) {
  var arr = MutableHashMap$Meta3dCommonlib.get(state.eventData.customGlobalEventArrMap, customEvent.name);
  if (arr !== undefined) {
    return _triggerHandleFunc(customEvent, arr, state);
  } else {
    return [
            state,
            customEvent
          ];
  }
}

function getCustomEventUserData(customEvent) {
  return customEvent.userData;
}

export {
  _triggerHandleFunc ,
  stopPropagation ,
  triggerGlobalEvent ,
  getCustomEventUserData ,
}
/* No side effect */
