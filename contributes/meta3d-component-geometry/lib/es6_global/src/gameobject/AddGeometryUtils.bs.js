

import * as ArrayMapUtils$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/ArrayMapUtils.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";

function add(state) {
  var gameObjectsMap = state.gameObjectsMap;
  var gameObjectGeometryMap = state.gameObjectGeometryMap;
  return function (gameObject, geometry) {
    ArrayMapUtils$Meta3dCommonlib.addValue(gameObjectsMap, geometry, gameObject);
    MutableSparseMap$Meta3dCommonlib.set(gameObjectGeometryMap, gameObject, geometry);
    return state;
  };
}

export {
  add ,
  
}
/* No side effect */
