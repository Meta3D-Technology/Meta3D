

import * as TypeArrayUtils$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/TypeArrayUtils.bs.js";
import * as ConfigUtils$Meta3dComponentGeometry from "../config/ConfigUtils.bs.js";
import * as BufferGeometryUtils$Meta3dComponentWorkerUtils from "./../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/geometry/BufferGeometryUtils.bs.js";
import * as ReallocatedPointsGeometryUtils$Meta3dComponentGeometry from "./ReallocatedPointsGeometryUtils.bs.js";

function setIndices(state, geometry, data) {
  var indices = state.indices;
  var indicesInfos = state.indicesInfos;
  var indicesOffset = state.indicesOffset;
  state.indicesOffset = ReallocatedPointsGeometryUtils$Meta3dComponentGeometry.setUint32PointData([
        BufferGeometryUtils$Meta3dComponentWorkerUtils.getInfoIndex(geometry),
        indicesInfos,
        indicesOffset,
        data.length
      ], ConfigUtils$Meta3dComponentGeometry.getIsDebug(state), (function (param) {
          return TypeArrayUtils$Meta3dCommonlib.fillUint32ArrayWithOffset(indices, data, param);
        }));
  
}

export {
  setIndices ,
  
}
/* No side effect */
