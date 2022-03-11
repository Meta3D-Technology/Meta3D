

import * as Caml_obj from "./../../../../../../node_modules/rescript/lib/es6/caml_obj.js";
import * as ArrayMapUtils$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/ArrayMapUtils.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";

var _removeComponent = MutableSparseMap$Meta3dCommonlib.remove;

function deferDisposeComponent(state) {
  var gameObjectPBRMaterialMap = state.gameObjectPBRMaterialMap;
  var needDisposedPBRMaterialArray = state.needDisposedPBRMaterialArray;
  return function (param) {
    var component = param[0];
    var newrecord = Caml_obj.caml_obj_dup(state);
    newrecord.needDisposedPBRMaterialArray = ArrayMapUtils$Meta3dCommonlib.addValue(needDisposedPBRMaterialArray, component, param[1]);
    newrecord.gameObjectPBRMaterialMap = MutableSparseMap$Meta3dCommonlib.remove(gameObjectPBRMaterialMap, component);
    return newrecord;
  };
}

export {
  _removeComponent ,
  deferDisposeComponent ,
  
}
/* No side effect */
