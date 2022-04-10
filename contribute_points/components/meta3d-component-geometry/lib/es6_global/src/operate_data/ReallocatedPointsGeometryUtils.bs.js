

import * as Curry from "./../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Log$Meta3dCommonlib from "./../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Contract$Meta3dCommonlib from "./../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/contract/Contract.bs.js";
import * as TypeArrayUtils$Meta3dCommonlib from "./../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/TypeArrayUtils.bs.js";
import * as ReallocatedPointsGeometryUtils$Meta3dComponentWorkerUtils from "./../../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/geometry/ReallocatedPointsGeometryUtils.bs.js";

function setInfo(infos, infoIndex, startIndex, endIndex, isDebug) {
  Contract$Meta3dCommonlib.requireCheck((function (param) {
          Contract$Meta3dCommonlib.test(Log$Meta3dCommonlib.buildAssertMessage("startIndex >= 0", "is " + startIndex), (function (param) {
                  return Contract$Meta3dCommonlib.Operators.$great$eq(startIndex, 0);
                }));
          return Contract$Meta3dCommonlib.test(Log$Meta3dCommonlib.buildAssertMessage("endIndex >= startIndex", "is " + endIndex), (function (param) {
                        return Contract$Meta3dCommonlib.Operators.$great$eq(endIndex, startIndex);
                      }));
        }), isDebug);
  TypeArrayUtils$Meta3dCommonlib.setUint32_1(infoIndex, startIndex, infos);
  return TypeArrayUtils$Meta3dCommonlib.setUint32_1(infoIndex + 1 | 0, endIndex, infos);
}

function hasPointData(infoIndex, isDebug, infos) {
  var match = ReallocatedPointsGeometryUtils$Meta3dComponentWorkerUtils.getInfo(infoIndex, isDebug, infos);
  return match[1] > match[0];
}

function _setPointData(param, isDebug, fillTypeArrayFunc) {
  var offset = param[2];
  var newOffset = offset + param[3] | 0;
  setInfo(param[1], param[0], offset, newOffset, isDebug);
  Curry._1(fillTypeArrayFunc, offset);
  return newOffset;
}

var setFloat32PointData = _setPointData;

var setUint32PointData = _setPointData;

export {
  setInfo ,
  hasPointData ,
  _setPointData ,
  setFloat32PointData ,
  setUint32PointData ,
  
}
/* No side effect */
