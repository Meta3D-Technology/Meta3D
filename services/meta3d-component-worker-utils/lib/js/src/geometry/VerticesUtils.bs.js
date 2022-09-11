'use strict';

var BufferGeometryUtils$Meta3dComponentWorkerUtils = require("./BufferGeometryUtils.bs.js");
var ReallocatedPointsGeometryUtils$Meta3dComponentWorkerUtils = require("./ReallocatedPointsGeometryUtils.bs.js");

function getVertices(vertices, verticesInfos, isDebug, geometry) {
  return ReallocatedPointsGeometryUtils$Meta3dComponentWorkerUtils.getFloat32PointData(BufferGeometryUtils$Meta3dComponentWorkerUtils.getInfoIndex(geometry), vertices, isDebug, verticesInfos);
}

exports.getVertices = getVertices;
/* No side effect */
