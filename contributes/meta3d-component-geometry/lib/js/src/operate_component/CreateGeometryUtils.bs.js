'use strict';

var ConfigUtils$Meta3dComponentGeometry = require("../config/ConfigUtils.bs.js");
var IndexComponentUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/IndexComponentUtils.bs.js");
var BufferComponentUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/BufferComponentUtils.bs.js");

function create(state) {
  var index = state.maxIndex;
  var match = IndexComponentUtils$Meta3dCommonlib.generateIndex(state.disposedGeometrys, index);
  state.maxIndex = match[2];
  state.disposedGeometrys = match[0];
  return [
          state,
          BufferComponentUtils$Meta3dCommonlib.checkNotExceedMaxCountByIndex(ConfigUtils$Meta3dComponentGeometry.getIsDebug(state), match[1], ConfigUtils$Meta3dComponentGeometry.getGeometryCount(state))
        ];
}

exports.create = create;
/* No side effect */
