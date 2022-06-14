

import * as ImmutableHashMap$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function hasExtension(state, name) {
  return ImmutableHashMap$Meta3dCommonlib.has(state.extensionServiceMap, name);
}

function hasContribute(state, name) {
  return ImmutableHashMap$Meta3dCommonlib.has(state.contributeMap, name);
}

export {
  hasExtension ,
  hasContribute ,
  
}
/* No side effect */
