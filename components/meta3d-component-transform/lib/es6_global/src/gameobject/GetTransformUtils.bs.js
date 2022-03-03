

import * as MutableSparseMap$Meta3dCommonlib from "./../../../../../meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";

function get(param, gameObject) {
  return MutableSparseMap$Meta3dCommonlib.getNullable(param.gameObjectTransformMap, gameObject);
}

export {
  get ,
  
}
/* No side effect */
