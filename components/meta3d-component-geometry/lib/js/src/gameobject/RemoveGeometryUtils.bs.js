'use strict';

var ArrayMapUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/ArrayMapUtils.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");
var ConfigUtils$Meta3dComponentGeometry = require("../config/ConfigUtils.bs.js");

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

exports._removeComponent = _removeComponent;
exports.remove = remove;
/* No side effect */
