

import * as ConfigUtils$Meta3dComponentGeometry from "../config/ConfigUtils.bs.js";
import * as IndexComponentUtils$Meta3dCommonlib from "./../../../../../meta3d-commonlib/lib/es6_global/src/scene_graph/component/IndexComponentUtils.bs.js";
import * as BufferComponentUtils$Meta3dCommonlib from "./../../../../../meta3d-commonlib/lib/es6_global/src/scene_graph/component/BufferComponentUtils.bs.js";

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

export {
  create ,
  
}
/* No side effect */
