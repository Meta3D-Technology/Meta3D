

import * as MutableSparseMap$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";

function has(param) {
  var gameObjectGeometryMap = param.gameObjectGeometryMap;
  return function (gameObject) {
    return MutableSparseMap$Meta3dCommonlib.has(gameObjectGeometryMap, gameObject);
  };
}

export {
  has ,
}
/* No side effect */
