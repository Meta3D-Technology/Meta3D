

import * as MutableSparseMap$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";

function get(param) {
  var gameObjectGeometryMap = param.gameObjectGeometryMap;
  return function (gameObject) {
    return MutableSparseMap$Meta3dCommonlib.getNullable(gameObjectGeometryMap, gameObject);
  };
}

export {
  get ,
}
/* No side effect */
