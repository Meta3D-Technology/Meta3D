'use strict';

var IndexComponentUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/IndexComponentUtils.bs.js");
var BufferComponentUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/BufferComponentUtils.bs.js");
var ConfigUtils$Meta3dComponentPbrmaterial = require("../config/ConfigUtils.bs.js");

function create(state) {
  var index = state.maxIndex;
  var match = IndexComponentUtils$Meta3dCommonlib.generateIndex(state.disposedPBRMaterials, index);
  state.maxIndex = match[2];
  state.disposedPBRMaterials = match[0];
  return [
          state,
          BufferComponentUtils$Meta3dCommonlib.checkNotExceedMaxCountByIndex(ConfigUtils$Meta3dComponentPbrmaterial.getIsDebug(state), match[1], ConfigUtils$Meta3dComponentPbrmaterial.getPBRMaterialCount(state))
        ];
}

exports.create = create;
/* No side effect */
