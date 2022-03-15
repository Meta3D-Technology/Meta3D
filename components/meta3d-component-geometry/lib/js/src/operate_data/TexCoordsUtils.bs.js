'use strict';

var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var Contract$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/contract/Contract.bs.js");
var TypeArrayUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/TypeArrayUtils.bs.js");
var ConfigUtils$Meta3dComponentGeometry = require("../config/ConfigUtils.bs.js");
var BufferGeometryUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/geometry/BufferGeometryUtils.bs.js");
var ReallocatedPointsGeometryUtils$Meta3dComponentGeometry = require("./ReallocatedPointsGeometryUtils.bs.js");

function setTexCoords(state, geometry, data) {
  Contract$Meta3dCommonlib.requireCheck((function (param) {
          return Contract$Meta3dCommonlib.test(Log$Meta3dCommonlib.buildAssertMessage("texCoords in [0.0, 1.0]", "not"), (function (param) {
                        return TypeArrayUtils$Meta3dCommonlib.reduceFloat32Array(data, true, (function (result, value) {
                                      if (result && Contract$Meta3dCommonlib.Operators.$great$eq$dot(value, 0.0)) {
                                        return Contract$Meta3dCommonlib.Operators.$less$eq$dot(value, 1.0);
                                      } else {
                                        return false;
                                      }
                                    }));
                      }));
        }), ConfigUtils$Meta3dComponentGeometry.getIsDebug(state));
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
