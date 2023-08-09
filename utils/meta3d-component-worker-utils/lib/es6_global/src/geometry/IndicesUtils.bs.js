

import * as BufferGeometryUtils$Meta3dComponentWorkerUtils from "./BufferGeometryUtils.bs.js";
import * as ReallocatedPointsGeometryUtils$Meta3dComponentWorkerUtils from "./ReallocatedPointsGeometryUtils.bs.js";

function getIndices(indices, indicesInfos, isDebug, geometry) {
  return ReallocatedPointsGeometryUtils$Meta3dComponentWorkerUtils.getUint32PointData(BufferGeometryUtils$Meta3dComponentWorkerUtils.getInfoIndex(geometry), indices, isDebug, indicesInfos);
}

function getIndicesCount(indicesInfos, isDebug, geometry) {
  var match = ReallocatedPointsGeometryUtils$Meta3dComponentWorkerUtils.getInfo(BufferGeometryUtils$Meta3dComponentWorkerUtils.getInfoIndex(geometry), isDebug, indicesInfos);
  return match[1] - match[0] | 0;
}

export {
  getIndices ,
  getIndicesCount ,
}
/* No side effect */
