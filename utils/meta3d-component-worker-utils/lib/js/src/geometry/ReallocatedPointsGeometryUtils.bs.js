'use strict';

var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var Contract$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/contract/Contract.bs.js");
var TypeArrayUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/TypeArrayUtils.bs.js");

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
                Contract$Meta3dCommonlib.test(Log$Meta3dCommonlib.buildAssertMessage("endIndex >= startIndex", "is " + endIndex), (function (param) {
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

exports.getInfo = getInfo;
exports.getFloat32PointData = getFloat32PointData;
exports.getUint32PointData = getUint32PointData;
/* No side effect */
