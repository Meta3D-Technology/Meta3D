'use strict';

var BufferGeometryUtils$Meta3dComponentWorkerUtils = require("./BufferGeometryUtils.bs.js");
var ReallocatedPointsGeometryUtils$Meta3dComponentWorkerUtils = require("./ReallocatedPointsGeometryUtils.bs.js");

function getNormals(normals, normalsInfos, isDebug, geometry) {
  return ReallocatedPointsGeometryUtils$Meta3dComponentWorkerUtils.getFloat32PointData(BufferGeometryUtils$Meta3dComponentWorkerUtils.getInfoIndex(geometry), normals, isDebug, normalsInfos);
}

exports.getNormals = getNormals;
/* No side effect */
