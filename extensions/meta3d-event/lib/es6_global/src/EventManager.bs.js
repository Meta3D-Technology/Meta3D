

import * as Curry from "./../../../../../node_modules/rescript/lib/es6/curry.js";
import * as ImmutableHashMap$Meta3dCommonlib from "./../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function registerEvent(state, eventContribute) {
  return {
          eventContributeMap: ImmutableHashMap$Meta3dCommonlib.set(state.eventContributeMap, eventContribute.eventName, eventContribute)
        };
}

function trigger(api, meta3dState, eventExtensionName, eventName, eventData) {
  var state = api.getExtensionState(meta3dState, eventExtensionName);
  var eventContribute = ImmutableHashMap$Meta3dCommonlib.getExn(state.eventContributeMap, eventName);
  return Curry._2(eventContribute.handler, meta3dState, eventData);
}

function createExtensionState(param) {
  return {
          eventContributeMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
        };
}

export {
  registerEvent ,
  trigger ,
  createExtensionState ,
  
}
/* No side effect */
