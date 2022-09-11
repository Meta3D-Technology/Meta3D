

import * as BufferGeometryUtils$Meta3dComponentWorkerUtils from "./BufferGeometryUtils.bs.js";
import * as ReallocatedPointsGeometryUtils$Meta3dComponentWorkerUtils from "./ReallocatedPointsGeometryUtils.bs.js";

function getTangents(tangents, tangentsInfos, isDebug, geometry) {
  return ReallocatedPointsGeometryUtils$Meta3dComponentWorkerUtils.getFloat32PointData(BufferGeometryUtils$Meta3dComponentWorkerUtils.getInfoIndex(geometry), tangents, isDebug, tangentsInfos);
}

export {
  getTangents ,
  
}
/* No side effect */
