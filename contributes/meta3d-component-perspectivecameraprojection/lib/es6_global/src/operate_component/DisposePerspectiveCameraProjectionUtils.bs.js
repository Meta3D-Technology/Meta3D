

import * as Js_array from "../../../../../../node_modules/rescript/lib/es6/js_array.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as DisposeUtils$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/DisposeUtils.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";
import * as DisposeComponentUtils$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/DisposeComponentUtils.bs.js";
import * as ConfigUtils$Meta3dComponentPerspectivecameraprojection from "../config/ConfigUtils.bs.js";
import * as GetNeedDisposedPerspectiveCameraProjectionsUtils$Meta3dComponentPerspectivecameraprojection from "../gameobject/GetNeedDisposedPerspectiveCameraProjectionsUtils.bs.js";

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
  DisposeUtils$Meta3dCommonlib.checkShouldNeedDisposed(ConfigUtils$Meta3dComponentPerspectivecameraprojection.getIsDebug(state), "perspectiveCameraProjection", cameraProjections, needDisposedComponents);
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
  var state_disposedPerspectiveCameraProjections = Js_array.concat(cameraProjections, state.disposedPerspectiveCameraProjections);
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
  return [
          ArraySt$Meta3dCommonlib.reduceOneParam(cameraProjections, _disposeData, state$1),
          cameraProjections
        ];
}

export {
  deferDisposeComponent ,
  _disposeSparseMapData ,
  _disposeData ,
  disposeComponents ,
}
/* No side effect */
