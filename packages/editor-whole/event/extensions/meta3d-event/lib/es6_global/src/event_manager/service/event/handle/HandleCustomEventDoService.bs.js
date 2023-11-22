

import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as MutableHashMap$Meta3dCommonlib from "../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/MutableHashMap.bs.js";

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

function _triggerHandleFunc2(customEvent, arr, meta3dState) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(arr, (function (param, param$1) {
                var customEvent = param[1];
                var meta3dState = param[0];
                if (customEvent.isStopPropagation) {
                  return [
                          meta3dState,
                          customEvent
                        ];
                } else {
                  return param$1.handleFunc(meta3dState, customEvent);
                }
              }), [
              meta3dState,
              customEvent
            ]);
}

function _triggerHandleFunc3(customEvent, arr, meta3dState) {
  return ArraySt$Meta3dCommonlib.traverseReducePromiseM(arr, (function (meta3dState, param) {
                if (customEvent.isStopPropagation) {
                  return Promise.resolve(meta3dState);
                } else {
                  return param.handleFunc(meta3dState, customEvent);
                }
              }), meta3dState);
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
  var match = state.eventData;
  var arr = MutableHashMap$Meta3dCommonlib.get(match.customGlobalEventArrMap, customEvent.name);
  if (arr !== undefined) {
    return _triggerHandleFunc(customEvent, arr, state);
  } else {
    return [
            state,
            customEvent
          ];
  }
}

function triggerGlobalEvent2(api, meta3dState, eventExtensionProtocolName, customEvent) {
  var match = api.getExtensionState(meta3dState, eventExtensionProtocolName);
  var match$1 = match.eventManagerState.eventData;
  var arr = MutableHashMap$Meta3dCommonlib.get(match$1.customGlobalEventArrMap2, customEvent.name);
  if (arr !== undefined) {
    return _triggerHandleFunc2(customEvent, arr, meta3dState);
  } else {
    return [
            meta3dState,
            customEvent
          ];
  }
}

function triggerGlobalEvent3(api, meta3dState, eventExtensionProtocolName, customEvent) {
  var match = api.getExtensionState(meta3dState, eventExtensionProtocolName);
  var match$1 = match.eventManagerState.eventData;
  var arr = MutableHashMap$Meta3dCommonlib.get(match$1.customGlobalEventArrMap3, customEvent.name);
  if (arr !== undefined) {
    return _triggerHandleFunc3(customEvent, arr, meta3dState);
  } else {
    return Promise.resolve(meta3dState);
  }
}

function getCustomEventUserData(customEvent) {
  return customEvent.userData;
}

export {
  _triggerHandleFunc ,
  _triggerHandleFunc2 ,
  _triggerHandleFunc3 ,
  stopPropagation ,
  triggerGlobalEvent ,
  triggerGlobalEvent2 ,
  triggerGlobalEvent3 ,
  getCustomEventUserData ,
}
/* No side effect */
