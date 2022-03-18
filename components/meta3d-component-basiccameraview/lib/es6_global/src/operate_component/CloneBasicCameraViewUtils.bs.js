

import * as ArraySt$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as CreateBasicCameraViewUtils$Meta3dComponentBasiccameraview from "./CreateBasicCameraViewUtils.bs.js";
import * as OperateBasicCameraViewUtils$Meta3dComponentBasiccameraview from "../utils/OperateBasicCameraViewUtils.bs.js";

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

export {
  clone ,
  
}
/* No side effect */
