

import * as MutableSparseMap$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";

function add(state) {
  var gameObjectMap = state.gameObjectMap;
  var gameObjectTransformMap = state.gameObjectTransformMap;
  return function (gameObject, transform) {
    MutableSparseMap$Meta3dCommonlib.set(gameObjectMap, transform, gameObject);
    MutableSparseMap$Meta3dCommonlib.set(gameObjectTransformMap, gameObject, transform);
    return state;
  };
}

export {
  add ,
  
}
/* No side effect */
