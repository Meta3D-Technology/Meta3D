'use strict';

var BufferGeometryUtils$Meta3dComponentWorkerUtils = require("./BufferGeometryUtils.bs.js");
var ReallocatedPointsGeometryUtils$Meta3dComponentWorkerUtils = require("./ReallocatedPointsGeometryUtils.bs.js");

function getIndices(indices, indicesInfos, isDebug, geometry) {
  return ReallocatedPointsGeometryUtils$Meta3dComponentWorkerUtils.getUint32PointData(BufferGeometryUtils$Meta3dComponentWorkerUtils.getInfoIndex(geometry), indices, isDebug, indicesInfos);
}

function getIndicesCount(indicesInfos, isDebug, geometry) {
  var match = ReallocatedPointsGeometryUtils$Meta3dComponentWorkerUtils.getInfo(BufferGeometryUtils$Meta3dComponentWorkerUtils.getInfoIndex(geometry), isDebug, indicesInfos);
  return match[1] - match[0] | 0;
}

exports.getIndices = getIndices;
exports.getIndicesCount = getIndicesCount;
/* No side effect */
