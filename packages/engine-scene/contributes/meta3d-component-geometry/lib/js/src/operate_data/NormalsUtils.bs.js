'use strict';

var TypeArrayUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/TypeArrayUtils.bs.js");
var ConfigUtils$Meta3dComponentGeometry = require("../config/ConfigUtils.bs.js");
var BufferGeometryUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/geometry/BufferGeometryUtils.bs.js");
var ReallocatedPointsGeometryUtils$Meta3dComponentGeometry = require("./ReallocatedPointsGeometryUtils.bs.js");

function setNormals(state, geometry, data) {
  var normals = state.normals;
  var normalsInfos = state.normalsInfos;
  var normalsOffset = state.normalsOffset;
  state.normalsOffset = ReallocatedPointsGeometryUtils$Meta3dComponentGeometry.setFloat32PointData([
        BufferGeometryUtils$Meta3dComponentWorkerUtils.getInfoIndex(geometry),
        normalsInfos,
        normalsOffset,
        data.length
      ], ConfigUtils$Meta3dComponentGeometry.getIsDebug(state), (function (param) {
          return TypeArrayUtils$Meta3dCommonlib.fillFloat32ArrayWithOffset(normals, data, param);
        }));
}

exports.setNormals = setNormals;
/* No side effect */
