

import * as MutableSparseMap$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";

function add(state) {
  var gameObjectMap = state.gameObjectMap;
  var gameObjectDirectionLightMap = state.gameObjectDirectionLightMap;
  return function (gameObject, light) {
    MutableSparseMap$Meta3dCommonlib.set(gameObjectMap, light, gameObject);
    MutableSparseMap$Meta3dCommonlib.set(gameObjectDirectionLightMap, gameObject, light);
    return state;
  };
}

export {
  add ,
}
/* No side effect */
