'use strict';

var BufferGeometryUtils$Meta3dComponentWorkerUtils = require("./BufferGeometryUtils.bs.js");
var ReallocatedPointsGeometryUtils$Meta3dComponentWorkerUtils = require("./ReallocatedPointsGeometryUtils.bs.js");

function getTexCoords(texCoords, texCoordsInfos, isDebug, geometry) {
  return ReallocatedPointsGeometryUtils$Meta3dComponentWorkerUtils.getFloat32PointData(BufferGeometryUtils$Meta3dComponentWorkerUtils.getInfoIndex(geometry), texCoords, isDebug, texCoordsInfos);
}

exports.getTexCoords = getTexCoords;
/* No side effect */
