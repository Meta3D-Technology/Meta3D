'use strict';

var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var DisposeUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/DisposeUtils.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");
var DisposeComponentUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/DisposeComponentUtils.bs.js");
var ConfigUtils$Meta3dComponentBasiccameraview = require("../config/ConfigUtils.bs.js");
var GetNeedDisposedBasicCameraViewsUtils$Meta3dComponentBasiccameraview = require("../gameobject/GetNeedDisposedBasicCameraViewsUtils.bs.js");

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
  DisposeUtils$Meta3dCommonlib.checkShouldNeedDisposed(ConfigUtils$Meta3dComponentBasiccameraview.getIsDebug(state), "BasicCameraView", cameraViews, needDisposedComponents);
  var state_config = state.config;
  var state_maxIndex = state.maxIndex;
  var state_isActiveMap = state.isActiveMap;
  var state_gameObjectMap = state.gameObjectMap;
  var state_gameObjectBasicCameraViewMap = state.gameObjectBasicCameraViewMap;
  var state_needDisposedBasicCameraViews = DisposeComponentUtils$Meta3dCommonlib.batchRemoveFromArray(needDisposedComponents, cameraViews);
  var state_disposedBasicCameraViews = state.disposedBasicCameraViews.concat(cameraViews);
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

exports.deferDisposeComponent = deferDisposeComponent;
exports._disposeSparseMapData = _disposeSparseMapData;
exports._disposeData = _disposeData;
exports.disposeComponents = disposeComponents;
/* No side effect */
