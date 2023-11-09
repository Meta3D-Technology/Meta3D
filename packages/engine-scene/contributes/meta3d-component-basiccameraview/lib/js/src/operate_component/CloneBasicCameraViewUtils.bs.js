'use strict';

var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");
var CreateBasicCameraViewUtils$Meta3dComponentBasiccameraview = require("./CreateBasicCameraViewUtils.bs.js");
var OperateBasicCameraViewUtils$Meta3dComponentBasiccameraview = require("../utils/OperateBasicCameraViewUtils.bs.js");

function clone(state, countRange, sourceBasicCameraView) {
  var nameOpt = OptionSt$Meta3dCommonlib.fromNullable(OperateBasicCameraViewUtils$Meta3dComponentBasiccameraview.getName(state, sourceBasicCameraView));
  return ArraySt$Meta3dCommonlib.reduceOneParam(countRange, (function (param, param$1) {
                var match = CreateBasicCameraViewUtils$Meta3dComponentBasiccameraview.create(param[0]);
                var clonedBasicCameraView = match[1];
                var state = match[0];
                var state$1 = nameOpt !== undefined ? OperateBasicCameraViewUtils$Meta3dComponentBasiccameraview.setName(state, clonedBasicCameraView, nameOpt) : state;
                var state$2 = OperateBasicCameraViewUtils$Meta3dComponentBasiccameraview.setIsActive(state$1, clonedBasicCameraView, false);
                return [
                        state$2,
                        ArraySt$Meta3dCommonlib.push(param[1], clonedBasicCameraView)
                      ];
              }), [
              state,
              []
            ]);
}

exports.clone = clone;
/* No side effect */
