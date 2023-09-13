

import * as IndexComponentUtils$Meta3dCommonlib from "./../../../../../meta3d-commonlib/lib/es6_global/src/scene_graph/component/IndexComponentUtils.bs.js";
import * as BufferComponentUtils$Meta3dCommonlib from "./../../../../../meta3d-commonlib/lib/es6_global/src/scene_graph/component/BufferComponentUtils.bs.js";
import * as ConfigUtils$Meta3dComponentDirectionlight from "../config/ConfigUtils.bs.js";

function create(state) {
  var index = state.maxIndex;
  var match = IndexComponentUtils$Meta3dCommonlib.generateIndex(state.disposedDirectionLights, index);
  state.maxIndex = match[2];
  state.disposedDirectionLights = match[0];
  return [
          state,
          BufferComponentUtils$Meta3dCommonlib.checkNotExceedMaxCountByIndex(ConfigUtils$Meta3dComponentDirectionlight.getIsDebug(state), match[1], ConfigUtils$Meta3dComponentDirectionlight.getDirectionLightCount(state))
        ];
}

export {
  create ,
}
/* No side effect */
