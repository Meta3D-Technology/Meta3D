

import * as Js_array from "./../../../../../rescript/lib/es6/js_array.js";
import * as ArraySt$Meta3dCommonlib from "./../../../../../meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as DisposeUtils$Meta3dCommonlib from "./../../../../../meta3d-commonlib/lib/es6_global/src/scene_graph/DisposeUtils.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "./../../../../../meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";
import * as DisposeComponentUtils$Meta3dCommonlib from "./../../../../../meta3d-commonlib/lib/es6_global/src/scene_graph/DisposeComponentUtils.bs.js";
import * as ConfigUtils$Meta3dComponentBasiccameraview from "../config/ConfigUtils.bs.js";
import * as GetNeedDisposedBasicCameraViewsUtils$Meta3dComponentBasiccameraview from "../gameobject/GetNeedDisposedBasicCameraViewsUtils.bs.js";

function deferDisposeComponent(state, param) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          isActiveMap: state.isActiveMap,
          gameObjectMap: state.gameObjectMap,
          gameObjectBasicCameraViewMap: MutableSparseMap$Meta3dCommonlib.remove(state.gameObjectBasicCameraViewMap, param[1]),
          needDisposedBasicCameraViews: ArraySt$Meta3dCommonlib.push(state.needDisposedBasicCameraViews, param[0]),
          disposedBasicCameraViews: state.disposedBasicCameraViews
        };
}

var _disposeSparseMapData = MutableSparseMap$Meta3dCommonlib.remove;

function _disposeData(state, cameraView) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          isActiveMap: MutableSparseMap$Meta3dCommonlib.remove(state.isActiveMap, cameraView),
          gameObjectMap: MutableSparseMap$Meta3dCommonlib.remove(state.gameObjectMap, cameraView),
          gameObjectBasicCameraViewMap: state.gameObjectBasicCameraViewMap,
          needDisposedBasicCameraViews: state.needDisposedBasicCameraViews,
          disposedBasicCameraViews: state.disposedBasicCameraViews
        };
}

function disposeComponents(state, cameraViews) {
  var needDisposedComponents = GetNeedDisposedBasicCameraViewsUtils$Meta3dComponentBasiccameraview.get(state);
  DisposeUtils$Meta3dCommonlib.checkShouldNeedDisposed(ConfigUtils$Meta3dComponentBasiccameraview.getIsDebug(state), "basicCameraView", cameraViews, needDisposedComponents);
  var state_config = state.config;
  var state_maxIndex = state.maxIndex;
  var state_isActiveMap = state.isActiveMap;
  var state_gameObjectMap = state.gameObjectMap;
  var state_gameObjectBasicCameraViewMap = state.gameObjectBasicCameraViewMap;
  var state_needDisposedBasicCameraViews = DisposeComponentUtils$Meta3dCommonlib.batchRemoveFromArray(needDisposedComponents, cameraViews);
  var state_disposedBasicCameraViews = Js_array.concat(cameraViews, state.disposedBasicCameraViews);
  var state$1 = {
    config: state_config,
    maxIndex: state_maxIndex,
    isActiveMap: state_isActiveMap,
    gameObjectMap: state_gameObjectMap,
    gameObjectBasicCameraViewMap: state_gameObjectBasicCameraViewMap,
    needDisposedBasicCameraViews: state_needDisposedBasicCameraViews,
    disposedBasicCameraViews: state_disposedBasicCameraViews
  };
  return ArraySt$Meta3dCommonlib.reduceOneParam(cameraViews, _disposeData, state$1);
}

export {
  deferDisposeComponent ,
  _disposeSparseMapData ,
  _disposeData ,
  disposeComponents ,
}
/* No side effect */
