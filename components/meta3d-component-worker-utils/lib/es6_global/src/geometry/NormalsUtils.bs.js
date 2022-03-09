

import * as BufferGeometryUtils$Meta3dComponentWorkerUtils from "./BufferGeometryUtils.bs.js";
import * as ReallocatedPointsGeometryUtils$Meta3dComponentWorkerUtils from "./ReallocatedPointsGeometryUtils.bs.js";

function getNormals(normals, normalsInfos, isDebug, geometry) {
  return ReallocatedPointsGeometryUtils$Meta3dComponentWorkerUtils.getFloat32PointData(BufferGeometryUtils$Meta3dComponentWorkerUtils.getInfoIndex(geometry), normals, isDebug, normalsInfos);
}

export {
  getNormals ,
  
}
/* No side effect */
