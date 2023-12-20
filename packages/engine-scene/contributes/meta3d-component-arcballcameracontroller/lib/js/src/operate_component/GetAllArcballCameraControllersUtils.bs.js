'use strict';

var ImmutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/ImmutableSparseMap.bs.js");

function getAll(param) {
  return ImmutableSparseMap$Meta3dCommonlib.getValues(param.gameObjectArcballCameraControllerMap);
}

exports.getAll = getAll;
/* No side effect */
