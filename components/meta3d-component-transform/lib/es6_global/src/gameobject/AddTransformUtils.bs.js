

import * as MutableSparseMap$Meta3dCommonlib from "./../../../../../meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";

function add(state, gameObject, transform) {
  MutableSparseMap$Meta3dCommonlib.set(state.gameObjectMap, transform, gameObject);
  MutableSparseMap$Meta3dCommonlib.set(state.gameObjectTransformMap, gameObject, transform);
  return state;
}

export {
  add ,
  
}
/* No side effect */
