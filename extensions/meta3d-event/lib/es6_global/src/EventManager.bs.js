

import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function onCustomEvent(state, eventName, eventHandler) {
  return {
          eventHandlerMap: ImmutableHashMap$Meta3dCommonlib.set(state.eventHandlerMap, eventName, eventHandler)
        };
}

function trigger(api, meta3dState, eventExtensionName, eventName, eventData) {
  var state = api.getExtensionStateExn(meta3dState, eventExtensionName);
  var eventHandler = ImmutableHashMap$Meta3dCommonlib.getExn(state.eventHandlerMap, eventName);
  return Curry._2(eventHandler, meta3dState, eventData);
}

function createExtensionState(param) {
  return {
          eventHandlerMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
        };
}

export {
  onCustomEvent ,
  trigger ,
  createExtensionState ,
  
}
/* No side effect */
