

import * as MutableSparseMap$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";

function get(param) {
  var gameObjectMap = param.gameObjectMap;
  return function (transform) {
    var gameObject = MutableSparseMap$Meta3dCommonlib.get(gameObjectMap, transform);
    if (gameObject !== undefined) {
      return [gameObject];
    } else {
      return [];
    }
  };
}

export {
  get ,
}
/* No side effect */
