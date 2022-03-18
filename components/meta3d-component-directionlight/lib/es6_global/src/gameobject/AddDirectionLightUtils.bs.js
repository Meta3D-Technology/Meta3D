

import * as MutableSparseMap$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";

function add(state, gameObject, light) {
  MutableSparseMap$Meta3dCommonlib.set(state.gameObjectMap, light, gameObject);
  MutableSparseMap$Meta3dCommonlib.set(state.gameObjectDirectionLightMap, gameObject, light);
  return state;
}

export {
  add ,
  
}
/* No side effect */
