

import * as BufferGeometryUtils$Meta3dComponentWorkerUtils from "./BufferGeometryUtils.bs.js";
import * as ReallocatedPointsGeometryUtils$Meta3dComponentWorkerUtils from "./ReallocatedPointsGeometryUtils.bs.js";

function getTexCoords(texCoords, texCoordsInfos, isDebug, geometry) {
  return ReallocatedPointsGeometryUtils$Meta3dComponentWorkerUtils.getFloat32PointData(BufferGeometryUtils$Meta3dComponentWorkerUtils.getInfoIndex(geometry), texCoords, isDebug, texCoordsInfos);
}

export {
  getTexCoords ,
  
}
/* No side effect */
