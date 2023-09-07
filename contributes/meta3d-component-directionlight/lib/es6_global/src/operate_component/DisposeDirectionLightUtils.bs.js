

import * as Js_array from "./../../../../../../node_modules/rescript/lib/es6/js_array.js";
import * as ArraySt$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as DisposeUtils$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/DisposeUtils.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";
import * as DisposeComponentUtils$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/DisposeComponentUtils.bs.js";
import * as DisposeTypeArrayUtils$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/DisposeTypeArrayUtils.bs.js";
import * as ConfigUtils$Meta3dComponentDirectionlight from "../config/ConfigUtils.bs.js";
import * as BufferDirectionLightUtils$Meta3dComponentWorkerUtils from "./../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/directionlight/BufferDirectionLightUtils.bs.js";
import * as GetNeedDisposedDirectionLightsUtils$Meta3dComponentDirectionlight from "../gameobject/GetNeedDisposedDirectionLightsUtils.bs.js";

function deferDisposeComponent(state) {
  var gameObjectDirectionLightMap = state.gameObjectDirectionLightMap;
  var needDisposedDirectionLights = state.needDisposedDirectionLights;
  return function (param) {
    return {
            config: state.config,
            maxIndex: state.maxIndex,
            buffer: state.buffer,
            colors: state.colors,
            intensities: state.intensities,
            gameObjectMap: state.gameObjectMap,
            gameObjectDirectionLightMap: MutableSparseMap$Meta3dCommonlib.remove(gameObjectDirectionLightMap, param[1]),
            needDisposedDirectionLights: ArraySt$Meta3dCommonlib.push(needDisposedDirectionLights, param[0]),
            disposedDirectionLights: state.disposedDirectionLights
          };
  };
}

function _getDefaultColor(param) {
  return [
          1,
          1,
          1
        ];
}

function _getDefaultIntensity(param) {
  return 1;
}

var _disposeSparseMapData = MutableSparseMap$Meta3dCommonlib.remove;

function _disposeData(state) {
  var colors = state.colors;
  var intensities = state.intensities;
  var gameObjectMap = state.gameObjectMap;
  return function (isDebug, light) {
    state.colors = DisposeTypeArrayUtils$Meta3dCommonlib.deleteAndResetFloat32TypeArr(colors, BufferDirectionLightUtils$Meta3dComponentWorkerUtils.getColorIndex(light), BufferDirectionLightUtils$Meta3dComponentWorkerUtils.getColorsSize(undefined), [
          1,
          1,
          1
        ]);
    state.intensities = DisposeTypeArrayUtils$Meta3dCommonlib.deleteAndResetFloat32(intensities, BufferDirectionLightUtils$Meta3dComponentWorkerUtils.getIntensityIndex(light), 1);
    state.gameObjectMap = MutableSparseMap$Meta3dCommonlib.remove(gameObjectMap, light);
    return state;
  };
}

function disposeComponents(state) {
  var disposedDirectionLights = state.disposedDirectionLights;
  return function (lights) {
    var isDebug = ConfigUtils$Meta3dComponentDirectionlight.getIsDebug(state);
    var needDisposedComponents = GetNeedDisposedDirectionLightsUtils$Meta3dComponentDirectionlight.get(state);
    DisposeUtils$Meta3dCommonlib.checkShouldNeedDisposed(isDebug, "directionLight", lights, needDisposedComponents);
    state.disposedDirectionLights = Js_array.concat(lights, disposedDirectionLights);
    state.needDisposedDirectionLights = DisposeComponentUtils$Meta3dCommonlib.batchRemoveFromArray(needDisposedComponents, lights);
    return ArraySt$Meta3dCommonlib.reduceOneParam(lights, (function (state, light) {
                  return _disposeData(state)(isDebug, light);
                }), state);
  };
}

export {
  deferDisposeComponent ,
  _getDefaultColor ,
  _getDefaultIntensity ,
  _disposeSparseMapData ,
  _disposeData ,
  disposeComponents ,
}
/* No side effect */
