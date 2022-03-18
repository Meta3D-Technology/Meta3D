'use strict';

var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var DisposeUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/DisposeUtils.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");
var DisposeComponentUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/DisposeComponentUtils.bs.js");
var ConfigUtils$Meta3dComponentPerspectivecameraprojection = require("../config/ConfigUtils.bs.js");
var GetNeedDisposedPerspectiveCameraProjectionsUtils$Meta3dComponentPerspectivecameraprojection = require("../gameobject/GetNeedDisposedPerspectiveCameraProjectionsUtils.bs.js");

function deferDisposeComponent(state, param) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          dirtyMap: state.dirtyMap,
          pMatrixMap: state.pMatrixMap,
          nearMap: state.nearMap,
          farMap: state.farMap,
          fovyMap: state.fovyMap,
          aspectMap: state.aspectMap,
          gameObjectMap: state.gameObjectMap,
          gameObjectPerspectiveCameraProjectionMap: MutableSparseMap$Meta3dCommonlib.remove(state.gameObjectPerspectiveCameraProjectionMap, param[1]),
          needDisposedPerspectiveCameraProjections: ArraySt$Meta3dCommonlib.push(state.needDisposedPerspectiveCameraProjections, param[0]),
          disposedPerspectiveCameraProjections: state.disposedPerspectiveCameraProjections
        };
}

var _disposeSparseMapData = MutableSparseMap$Meta3dCommonlib.remove;

function _disposeData(state, cameraProjection) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          dirtyMap: MutableSparseMap$Meta3dCommonlib.remove(state.dirtyMap, cameraProjection),
          pMatrixMap: MutableSparseMap$Meta3dCommonlib.remove(state.pMatrixMap, cameraProjection),
          nearMap: MutableSparseMap$Meta3dCommonlib.remove(state.nearMap, cameraProjection),
          farMap: MutableSparseMap$Meta3dCommonlib.remove(state.farMap, cameraProjection),
          fovyMap: MutableSparseMap$Meta3dCommonlib.remove(state.fovyMap, cameraProjection),
          aspectMap: MutableSparseMap$Meta3dCommonlib.remove(state.aspectMap, cameraProjection),
          gameObjectMap: MutableSparseMap$Meta3dCommonlib.remove(state.gameObjectMap, cameraProjection),
          gameObjectPerspectiveCameraProjectionMap: state.gameObjectPerspectiveCameraProjectionMap,
          needDisposedPerspectiveCameraProjections: state.needDisposedPerspectiveCameraProjections,
          disposedPerspectiveCameraProjections: state.disposedPerspectiveCameraProjections
        };
}

function disposeComponents(state, cameraProjections) {
  var needDisposedComponents = GetNeedDisposedPerspectiveCameraProjectionsUtils$Meta3dComponentPerspectivecameraprojection.get(state);
  DisposeUtils$Meta3dCommonlib.checkShouldNeedDisposed(ConfigUtils$Meta3dComponentPerspectivecameraprojection.getIsDebug(state), "PerspectiveCameraProjection", cameraProjections, needDisposedComponents);
  var state_config = state.config;
  var state_maxIndex = state.maxIndex;
  var state_dirtyMap = state.dirtyMap;
  var state_pMatrixMap = state.pMatrixMap;
  var state_nearMap = state.nearMap;
  var state_farMap = state.farMap;
  var state_fovyMap = state.fovyMap;
  var state_aspectMap = state.aspectMap;
  var state_gameObjectMap = state.gameObjectMap;
  var state_gameObjectPerspectiveCameraProjectionMap = state.gameObjectPerspectiveCameraProjectionMap;
  var state_needDisposedPerspectiveCameraProjections = DisposeComponentUtils$Meta3dCommonlib.batchRemoveFromArray(needDisposedComponents, cameraProjections);
  var state_disposedPerspectiveCameraProjections = state.disposedPerspectiveCameraProjections.concat(cameraProjections);
  var state$1 = {
    config: state_config,
    maxIndex: state_maxIndex,
    dirtyMap: state_dirtyMap,
    pMatrixMap: state_pMatrixMap,
    nearMap: state_nearMap,
    farMap: state_farMap,
    fovyMap: state_fovyMap,
    aspectMap: state_aspectMap,
    gameObjectMap: state_gameObjectMap,
    gameObjectPerspectiveCameraProjectionMap: state_gameObjectPerspectiveCameraProjectionMap,
    needDisposedPerspectiveCameraProjections: state_needDisposedPerspectiveCameraProjections,
    disposedPerspectiveCameraProjections: state_disposedPerspectiveCameraProjections
  };
  return ArraySt$Meta3dCommonlib.reduceOneParam(cameraProjections, _disposeData, state$1);
}

exports.deferDisposeComponent = deferDisposeComponent;
exports._disposeSparseMapData = _disposeSparseMapData;
exports._disposeData = _disposeData;
exports.disposeComponents = disposeComponents;
/* No side effect */
