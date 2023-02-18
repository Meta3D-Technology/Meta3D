

import * as OptionSt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";

function get(param) {
  var gameObjectsMap = param.gameObjectsMap;
  return function (geometry) {
    return OptionSt$Meta3dCommonlib.getWithDefault(MutableSparseMap$Meta3dCommonlib.get(gameObjectsMap, geometry), []);
  };
}

export {
  get ,
}
/* No side effect */
