'use strict';

var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var CreateBasicCameraViewUtils$Meta3dComponentBasiccameraview = require("./CreateBasicCameraViewUtils.bs.js");
var OperateBasicCameraViewUtils$Meta3dComponentBasiccameraview = require("../utils/OperateBasicCameraViewUtils.bs.js");

function clone(state, countRange, sourceBasicCameraView) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(countRange, (function (param, param$1) {
                var match = CreateBasicCameraViewUtils$Meta3dComponentBasiccameraview.create(param[0]);
                var clonedBasicCameraView = match[1];
                var state = OperateBasicCameraViewUtils$Meta3dComponentBasiccameraview.setIsActive(match[0], clonedBasicCameraView, false);
                return [
                        state,
                        ArraySt$Meta3dCommonlib.push(param[1], clonedBasicCameraView)
                      ];
              }), [
              state,
              []
            ]);
}

exports.clone = clone;
/* No side effect */
