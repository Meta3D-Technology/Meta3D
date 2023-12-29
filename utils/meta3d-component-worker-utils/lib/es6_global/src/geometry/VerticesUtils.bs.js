

import * as BufferGeometryUtils$Meta3dComponentWorkerUtils from "./BufferGeometryUtils.bs.js";
import * as ReallocatedPointsGeometryUtils$Meta3dComponentWorkerUtils from "./ReallocatedPointsGeometryUtils.bs.js";

function getVertices(vertices, verticesInfos, isDebug, geometry) {
  return ReallocatedPointsGeometryUtils$Meta3dComponentWorkerUtils.getFloat32PointData(BufferGeometryUtils$Meta3dComponentWorkerUtils.getInfoIndex(geometry), vertices, isDebug, verticesInfos);
}

export {
  getVertices ,
}
/* No side effect */
