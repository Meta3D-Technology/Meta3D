

import * as Log$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Contract$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/contract/Contract.bs.js";
import * as TypeArrayUtils$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/TypeArrayUtils.bs.js";
import * as ConfigUtils$Meta3dComponentGeometry from "../config/ConfigUtils.bs.js";
import * as BufferGeometryUtils$Meta3dComponentWorkerUtils from "./../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/geometry/BufferGeometryUtils.bs.js";
import * as ReallocatedPointsGeometryUtils$Meta3dComponentGeometry from "./ReallocatedPointsGeometryUtils.bs.js";

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
  return state;
}

export {
  setTexCoords ,
  
}
/* No side effect */
