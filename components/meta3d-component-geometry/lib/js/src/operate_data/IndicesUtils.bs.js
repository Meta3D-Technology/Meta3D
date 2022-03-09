'use strict';

var TypeArrayUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/TypeArrayUtils.bs.js");
var ConfigUtils$Meta3dComponentGeometry = require("../config/ConfigUtils.bs.js");
var BufferGeometryUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/geometry/BufferGeometryUtils.bs.js");
var ReallocatedPointsGeometryUtils$Meta3dComponentGeometry = require("./ReallocatedPointsGeometryUtils.bs.js");

function setIndices(state, geometry, data) {
  var indices = state.indices;
  var indicesInfos = state.indicesInfos;
  var indicesOffset = state.indicesOffset;
  state.indicesOffset = ReallocatedPointsGeometryUtils$Meta3dComponentGeometry.setUint32PointData([
        BufferGeometryUtils$Meta3dComponentWorkerUtils.getInfoIndex(geometry),
        indicesInfos,
        indicesOffset,
        data.length
      ], ConfigUtils$Meta3dComponentGeometry.getIsDebug(state), (function (param) {
          return TypeArrayUtils$Meta3dCommonlib.fillUint32ArrayWithOffset(indices, data, param);
        }));
  return state;
}

exports.setIndices = setIndices;
/* No side effect */
