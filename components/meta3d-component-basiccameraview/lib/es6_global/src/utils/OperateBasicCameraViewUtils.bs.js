

import * as OptionSt$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as ImmutableSparseMap$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/ImmutableSparseMap.bs.js";

function _setAllNotActive(state) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          isActiveMap: ImmutableSparseMap$Meta3dCommonlib.map(state.isActiveMap, (function (value) {
                  return false;
                })),
          gameObjectMap: state.gameObjectMap,
          gameObjectBasicCameraViewMap: state.gameObjectBasicCameraViewMap
        };
}

function getIsActive(state, cameraView) {
  return OptionSt$Meta3dCommonlib.getWithDefault(ImmutableSparseMap$Meta3dCommonlib.get(state.isActiveMap, cameraView), false);
}

function setIsActive(state, cameraView, isActive) {
  var state$1 = isActive === true ? _setAllNotActive(state) : state;
  return {
          config: state$1.config,
          maxIndex: state$1.maxIndex,
          isActiveMap: ImmutableSparseMap$Meta3dCommonlib.set(state$1.isActiveMap, cameraView, isActive),
          gameObjectMap: state$1.gameObjectMap,
          gameObjectBasicCameraViewMap: state$1.gameObjectBasicCameraViewMap
        };
}

export {
  _setAllNotActive ,
  getIsActive ,
  setIsActive ,
  
}
/* No side effect */
