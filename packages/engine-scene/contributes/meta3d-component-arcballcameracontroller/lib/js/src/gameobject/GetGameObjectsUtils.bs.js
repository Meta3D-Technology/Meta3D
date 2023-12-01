'use strict';

var ImmutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/ImmutableSparseMap.bs.js");

function get(param, cameraController) {
  var gameObject = ImmutableSparseMap$Meta3dCommonlib.get(param.gameObjectMap, cameraController);
  if (gameObject !== undefined) {
    return [gameObject];
  } else {
    return [];
  }
}

exports.get = get;
/* No side effect */
