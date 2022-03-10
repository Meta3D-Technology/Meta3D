'use strict';

var ArrayMapUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/ArrayMapUtils.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");
var ConfigUtils$Meta3dComponentGeometry = require("../config/ConfigUtils.bs.js");

var _removeComponent = MutableSparseMap$Meta3dCommonlib.remove;

function remove(state, gameObject, geometry) {
  ArrayMapUtils$Meta3dCommonlib.removeValue(state.gameObjectsMap, ConfigUtils$Meta3dComponentGeometry.getIsDebug(state), geometry, gameObject);
  MutableSparseMap$Meta3dCommonlib.remove(state.gameObjectGeometryMap, gameObject);
  return state;
}

exports._removeComponent = _removeComponent;
exports.remove = remove;
/* No side effect */
