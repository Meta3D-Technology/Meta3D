'use strict';

var Js_array = require("rescript/lib/js/js_array.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var DisposeUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/DisposeUtils.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");
var DisposeComponentUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/DisposeComponentUtils.bs.js");
var DisposeTypeArrayUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/DisposeTypeArrayUtils.bs.js");
var ConfigUtils$Meta3dComponentDirectionlight = require("../config/ConfigUtils.bs.js");
var BufferDirectionLightUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/directionlight/BufferDirectionLightUtils.bs.js");
var GetNeedDisposedDirectionLightsUtils$Meta3dComponentDirectionlight = require("../gameobject/GetNeedDisposedDirectionLightsUtils.bs.js");

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

exports.deferDisposeComponent = deferDisposeComponent;
exports._getDefaultColor = _getDefaultColor;
exports._getDefaultIntensity = _getDefaultIntensity;
exports._disposeSparseMapData = _disposeSparseMapData;
exports._disposeData = _disposeData;
exports.disposeComponents = disposeComponents;
/* No side effect */
