

import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function hasExtension(state, protocolName) {
  return ImmutableHashMap$Meta3dCommonlib.has(state.extensionServiceMap, protocolName);
}

function hasContribute(state, protocolName) {
  return ImmutableHashMap$Meta3dCommonlib.has(state.contributeExceptInputMap, protocolName);
}

export {
  hasExtension ,
  hasContribute ,
}
/* No side effect */
