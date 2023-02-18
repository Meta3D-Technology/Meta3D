

import * as Log$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Contract$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/contract/Contract.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";
import * as ImmutableSparseMap$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/ImmutableSparseMap.bs.js";
import * as ConfigUtils$Meta3dComponentArcballcameracontroller from "../config/ConfigUtils.bs.js";

function mark(state, cameraController, isDirty) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          gameObjectMap: state.gameObjectMap,
          dirtyMap: ImmutableSparseMap$Meta3dCommonlib.set(state.dirtyMap, cameraController, isDirty),
          distanceMap: state.distanceMap,
          minDistanceMap: state.minDistanceMap,
          phiMap: state.phiMap,
          thetaMap: state.thetaMap,
          thetaMarginMap: state.thetaMarginMap,
          targetMap: state.targetMap,
          moveSpeedXMap: state.moveSpeedXMap,
          moveSpeedYMap: state.moveSpeedYMap,
          rotateSpeedMap: state.rotateSpeedMap,
          wheelSpeedMap: state.wheelSpeedMap,
          gameObjectArcballCameraControllerMap: state.gameObjectArcballCameraControllerMap,
          needDisposedArcballCameraControllers: state.needDisposedArcballCameraControllers,
          disposedArcballCameraControllers: state.disposedArcballCameraControllers
        };
}

function isDirty(state, cameraController) {
  return MutableSparseMap$Meta3dCommonlib.unsafeGet(state.dirtyMap, cameraController) === Contract$Meta3dCommonlib.ensureCheck(true, (function (isDirty) {
                Contract$Meta3dCommonlib.test(Log$Meta3dCommonlib.buildAssertMessage("return bool", "not"), (function (param) {
                        return Contract$Meta3dCommonlib.assertIsBool(isDirty);
                      }));
              }), ConfigUtils$Meta3dComponentArcballcameracontroller.getIsDebug(state));
}

export {
  mark ,
  isDirty ,
}
/* No side effect */
