'use strict';

var Caml_obj = require("rescript/lib/js/caml_obj.js");
var ArrayMapUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/ArrayMapUtils.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

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

exports._removeComponent = _removeComponent;
exports.deferDisposeComponent = deferDisposeComponent;
/* No side effect */
