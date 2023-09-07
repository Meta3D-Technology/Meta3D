

import * as IndexComponentUtils$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/IndexComponentUtils.bs.js";
import * as BufferComponentUtils$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/BufferComponentUtils.bs.js";
import * as ConfigUtils$Meta3dComponentPbrmaterial from "../config/ConfigUtils.bs.js";

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

export {
  create ,
}
/* No side effect */
