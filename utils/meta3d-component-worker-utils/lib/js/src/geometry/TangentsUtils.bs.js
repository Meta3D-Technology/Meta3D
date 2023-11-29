'use strict';

var BufferGeometryUtils$Meta3dComponentWorkerUtils = require("./BufferGeometryUtils.bs.js");
var ReallocatedPointsGeometryUtils$Meta3dComponentWorkerUtils = require("./ReallocatedPointsGeometryUtils.bs.js");

function getTangents(tangents, tangentsInfos, isDebug, geometry) {
  return ReallocatedPointsGeometryUtils$Meta3dComponentWorkerUtils.getFloat32PointData(BufferGeometryUtils$Meta3dComponentWorkerUtils.getInfoIndex(geometry), tangents, isDebug, tangentsInfos);
}

exports.getTangents = getTangents;
/* No side effect */
