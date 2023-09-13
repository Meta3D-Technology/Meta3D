

import * as ArraySt$Meta3dCommonlib from "./../../../../../meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "./../../../../../meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as DirtyPerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection from "../utils/DirtyPerspectiveCameraProjectionUtils.bs.js";
import * as CreatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection from "./CreatePerspectiveCameraProjectionUtils.bs.js";
import * as OperatePerspectiveCameraProjectionUtils$Meta3dComponentPerspectivecameraprojection from "../utils/OperatePerspectiveCameraProjectionUtils.bs.js";

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

export {
  clone ,
}
/* No side effect */
