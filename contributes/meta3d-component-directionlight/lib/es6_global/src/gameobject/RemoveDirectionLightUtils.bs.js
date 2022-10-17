

import * as MutableSparseMap$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";

var _removeComponent = MutableSparseMap$Meta3dCommonlib.remove;

var _removeGameObject = MutableSparseMap$Meta3dCommonlib.remove;

function remove(state) {
  var gameObjectMap = state.gameObjectMap;
  var gameObjectDirectionLightMap = state.gameObjectDirectionLightMap;
  return function (gameObject, light) {
    MutableSparseMap$Meta3dCommonlib.remove(gameObjectMap, light);
    MutableSparseMap$Meta3dCommonlib.remove(gameObjectDirectionLightMap, gameObject);
    return state;
  };
}

export {
  _removeComponent ,
  _removeGameObject ,
  remove ,
  
}
/* No side effect */
