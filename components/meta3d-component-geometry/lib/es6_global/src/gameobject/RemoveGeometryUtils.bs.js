

import * as ArrayMapUtils$Meta3dCommonlib from "./../../../../../meta3d-commonlib/lib/es6_global/src/scene_graph/component/ArrayMapUtils.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "./../../../../../meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";
import * as ConfigUtils$Meta3dComponentGeometry from "../config/ConfigUtils.bs.js";

var _removeComponent = MutableSparseMap$Meta3dCommonlib.remove;

function remove(state) {
  var gameObjectsMap = state.gameObjectsMap;
  var gameObjectGeometryMap = state.gameObjectGeometryMap;
  return function (gameObject, geometry) {
    ArrayMapUtils$Meta3dCommonlib.removeValue(gameObjectsMap, ConfigUtils$Meta3dComponentGeometry.getIsDebug(state), geometry, gameObject);
    MutableSparseMap$Meta3dCommonlib.remove(gameObjectGeometryMap, gameObject);
    return state;
  };
}

export {
  _removeComponent ,
  remove ,
  
}
/* No side effect */
