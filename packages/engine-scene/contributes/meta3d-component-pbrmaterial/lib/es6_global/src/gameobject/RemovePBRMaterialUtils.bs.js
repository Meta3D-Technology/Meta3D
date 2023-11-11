

import * as ArrayMapUtils$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/ArrayMapUtils.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";
import * as ConfigUtils$Meta3dComponentPbrmaterial from "../config/ConfigUtils.bs.js";

var _removeComponent = MutableSparseMap$Meta3dCommonlib.remove;

function remove(state) {
  var gameObjectsMap = state.gameObjectsMap;
  var gameObjectPBRMaterialMap = state.gameObjectPBRMaterialMap;
  return function (gameObject, pbrMaterial) {
    ArrayMapUtils$Meta3dCommonlib.removeValue(gameObjectsMap, ConfigUtils$Meta3dComponentPbrmaterial.getIsDebug(state), pbrMaterial, gameObject);
    MutableSparseMap$Meta3dCommonlib.remove(gameObjectPBRMaterialMap, gameObject);
    return state;
  };
}

export {
  _removeComponent ,
  remove ,
}
/* No side effect */
