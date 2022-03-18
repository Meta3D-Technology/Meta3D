'use strict';

var IndexComponentUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/IndexComponentUtils.bs.js");
var BufferComponentUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/BufferComponentUtils.bs.js");
var ConfigUtils$Meta3dComponentDirectionlight = require("../config/ConfigUtils.bs.js");

function create(state) {
  var index = state.maxIndex;
  var match = IndexComponentUtils$Meta3dCommonlib.generateIndex([], index);
  state.maxIndex = match[2];
  return [
          state,
          BufferComponentUtils$Meta3dCommonlib.checkNotExceedMaxCountByIndex(ConfigUtils$Meta3dComponentDirectionlight.getIsDebug(state), match[1], ConfigUtils$Meta3dComponentDirectionlight.getDirectionLightCount(state))
        ];
}

exports.create = create;
/* No side effect */
