

import * as MutableSparseMap$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";

function get(param) {
  var gameObjectPBRMaterialMap = param.gameObjectPBRMaterialMap;
  return function (gameObject) {
    return MutableSparseMap$Meta3dCommonlib.unsafeGet(gameObjectPBRMaterialMap, gameObject);
  };
}

export {
  get ,
}
/* No side effect */
