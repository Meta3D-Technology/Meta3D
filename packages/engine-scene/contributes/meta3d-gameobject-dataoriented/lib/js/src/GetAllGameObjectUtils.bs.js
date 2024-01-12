'use strict';

var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var DisposeComponentUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/DisposeComponentUtils.bs.js");
var GetNeedDisposedGameObjectsUtils$Meta3dGameobjectDataoriented = require("./GetNeedDisposedGameObjectsUtils.bs.js");

function getAll(state) {
  return DisposeComponentUtils$Meta3dCommonlib.batchRemoveFromArray(DisposeComponentUtils$Meta3dCommonlib.batchRemoveFromArray(ArraySt$Meta3dCommonlib.range(0, state.maxUID - 1 | 0), GetNeedDisposedGameObjectsUtils$Meta3dGameobjectDataoriented.get(state)), state.disposedGameObjectArray);
}

exports.getAll = getAll;
/* No side effect */
