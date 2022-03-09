'use strict';

var ConfigUtils$Meta3dComponentGeometry = require("../config/ConfigUtils.bs.js");
var IndexComponentUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/IndexComponentUtils.bs.js");
var BufferComponentUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/BufferComponentUtils.bs.js");

function create(state) {
  var index = state.maxIndex;
  var match = IndexComponentUtils$Meta3dCommonlib.generateIndex([], index);
  state.maxIndex = match[2];
  return [
          state,
          BufferComponentUtils$Meta3dCommonlib.checkNotExceedMaxCountByIndex(ConfigUtils$Meta3dComponentGeometry.getIsDebug(state), index, ConfigUtils$Meta3dComponentGeometry.getGeometryCount(state))
        ];
}

exports.create = create;
/* No side effect */
