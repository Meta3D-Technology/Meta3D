'use strict';

var TypeArrayUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/TypeArrayUtils.bs.js");
var ConfigUtils$Meta3dComponentGeometry = require("../config/ConfigUtils.bs.js");
var BufferGeometryUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/geometry/BufferGeometryUtils.bs.js");
var ReallocatedPointsGeometryUtils$Meta3dComponentGeometry = require("./ReallocatedPointsGeometryUtils.bs.js");

function setTexCoords(state, geometry, data) {
  var texCoords = state.texCoords;
  var texCoordsInfos = state.texCoordsInfos;
  var texCoordsOffset = state.texCoordsOffset;
  state.texCoordsOffset = ReallocatedPointsGeometryUtils$Meta3dComponentGeometry.setFloat32PointData([
        BufferGeometryUtils$Meta3dComponentWorkerUtils.getInfoIndex(geometry),
        texCoordsInfos,
        texCoordsOffset,
        data.length
      ], ConfigUtils$Meta3dComponentGeometry.getIsDebug(state), (function (param) {
          return TypeArrayUtils$Meta3dCommonlib.fillFloat32ArrayWithOffset(texCoords, data, param);
        }));
}

exports.setTexCoords = setTexCoords;
/* No side effect */
