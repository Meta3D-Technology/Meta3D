'use strict';

var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");
var DirtyPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection = require("../utils/DirtyPerspectiveCameraProjectionUtils.bs.js");
var CreatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection = require("./CreatePerspectiveCameraProjectionUtils.bs.js");
var OperatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection = require("../utils/OperatePerspectiveCameraProjectionUtils.bs.js");

function clone(state, countRange, sourcePerspectiveCameraProjection) {
  var near = OptionSt$Meta3dCommonlib.getExn(OperatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.getNear(state, sourcePerspectiveCameraProjection));
  var far = OptionSt$Meta3dCommonlib.getExn(OperatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.getFar(state, sourcePerspectiveCameraProjection));
  var fovy = OptionSt$Meta3dCommonlib.getExn(OperatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.getFovy(state, sourcePerspectiveCameraProjection));
  var aspectOpt = OperatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.getAspect(state, sourcePerspectiveCameraProjection);
  return ArraySt$Meta3dCommonlib.reduceOneParam(countRange, (function (param, param$1) {
                var match = CreatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.create(param[0]);
                var clonedPerspectiveCameraProjection = match[1];
                var state = OperatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.setFovy(OperatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.setFar(OperatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.setNear(DirtyPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.mark(match[0], clonedPerspectiveCameraProjection, true), clonedPerspectiveCameraProjection, near), clonedPerspectiveCameraProjection, far), clonedPerspectiveCameraProjection, fovy);
                return [
                        aspectOpt !== undefined ? OperatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection.setAspect(state, clonedPerspectiveCameraProjection, aspectOpt) : state,
                        ArraySt$Meta3dCommonlib.push(param[1], clonedPerspectiveCameraProjection)
                      ];
              }), [
              state,
              []
            ]);
}

exports.clone = clone;
/* No side effect */
