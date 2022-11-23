

import * as ImmutableSparseMap$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/ImmutableSparseMap.bs.js";

function add(state, gameObject, cameraController) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          gameObjectMap: ImmutableSparseMap$Meta3dCommonlib.set(state.gameObjectMap, cameraController, gameObject),
          dirtyMap: state.dirtyMap,
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
          gameObjectArcballCameraControllerMap: ImmutableSparseMap$Meta3dCommonlib.set(state.gameObjectArcballCameraControllerMap, gameObject, cameraController),
          needDisposedArcballCameraControllers: state.needDisposedArcballCameraControllers,
          disposedArcballCameraControllers: state.disposedArcballCameraControllers
        };
}

export {
  add ,
}
/* No side effect */
