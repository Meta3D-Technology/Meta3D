

import * as TypeArrayUtils$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/TypeArrayUtils.bs.js";
import * as ConfigUtils$Meta3dComponentGeometry from "../config/ConfigUtils.bs.js";
import * as BufferGeometryUtils$Meta3dComponentWorkerUtils from "./../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/geometry/BufferGeometryUtils.bs.js";
import * as ReallocatedPointsGeometryUtils$Meta3dComponentGeometry from "./ReallocatedPointsGeometryUtils.bs.js";

function setNormals(state, geometry, data) {
  var normals = state.normals;
  var normalsInfos = state.normalsInfos;
  var normalsOffset = state.normalsOffset;
  state.normalsOffset = ReallocatedPointsGeometryUtils$Meta3dComponentGeometry.setFloat32PointData([
        BufferGeometryUtils$Meta3dComponentWorkerUtils.getInfoIndex(geometry),
        normalsInfos,
        normalsOffset,
        data.length
      ], ConfigUtils$Meta3dComponentGeometry.getIsDebug(state), (function (param) {
          return TypeArrayUtils$Meta3dCommonlib.fillFloat32ArrayWithOffset(normals, data, param);
        }));
  
}

export {
  setNormals ,
  
}
/* No side effect */
