

import * as Log$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Contract$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/contract/Contract.bs.js";
import * as TypeArrayUtils$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/TypeArrayUtils.bs.js";

function getInfo(infoIndex, isDebug, infos) {
  return Contract$Meta3dCommonlib.ensureCheck([
              TypeArrayUtils$Meta3dCommonlib.getUint32_1(infoIndex, infos),
              TypeArrayUtils$Meta3dCommonlib.getUint32_1(infoIndex + 1 | 0, infos)
            ], (function (param) {
                var endIndex = param[1];
                var startIndex = param[0];
                Contract$Meta3dCommonlib.test(Log$Meta3dCommonlib.buildAssertMessage("has info data", "not"), (function (param) {
                        return Contract$Meta3dCommonlib.assertNullableListExist({
                                    hd: startIndex,
                                    tl: {
                                      hd: endIndex,
                                      tl: /* [] */0
                                    }
                                  });
                      }));
                return Contract$Meta3dCommonlib.test(Log$Meta3dCommonlib.buildAssertMessage("endIndex >= startIndex", "is " + endIndex), (function (param) {
                              return Contract$Meta3dCommonlib.Operators.$great$eq(endIndex, startIndex);
                            }));
              }), isDebug);
}

function getFloat32PointData(infoIndex, points, isDebug, infos) {
  var match = getInfo(infoIndex, isDebug, infos);
  return TypeArrayUtils$Meta3dCommonlib.getFloat32Array(points, match[0], match[1]);
}

function getUint32PointData(infoIndex, points, isDebug, infos) {
  var match = getInfo(infoIndex, isDebug, infos);
  return TypeArrayUtils$Meta3dCommonlib.getUint32Array(points, match[0], match[1]);
}

export {
  getInfo ,
  getFloat32PointData ,
  getUint32PointData ,
  
}
/* No side effect */
