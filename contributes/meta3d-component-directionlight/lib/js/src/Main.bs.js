'use strict';

var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var TypeArrayUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/TypeArrayUtils.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");
var CopyTypeArrayService$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/copy/CopyTypeArrayService.bs.js");
var Index$Meta3dComponentDirectionlightProtocol = require("meta3d-component-directionlight-protocol/lib/js/src/Index.bs.js");
var CreateStateUtils$Meta3dComponentDirectionlight = require("./create_state/CreateStateUtils.bs.js");
var GetGameObjectsUtils$Meta3dComponentDirectionlight = require("./gameobject/GetGameObjectsUtils.bs.js");
var AddDirectionLightUtils$Meta3dComponentDirectionlight = require("./gameobject/AddDirectionLightUtils.bs.js");
var BufferDirectionLightUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/directionlight/BufferDirectionLightUtils.bs.js");
var GetDirectionLightUtils$Meta3dComponentDirectionlight = require("./gameobject/GetDirectionLightUtils.bs.js");
var HasDirectionLightUtils$Meta3dComponentDirectionlight = require("./gameobject/HasDirectionLightUtils.bs.js");
var CloneDirectionLightUtils$Meta3dComponentDirectionlight = require("./operate_component/CloneDirectionLightUtils.bs.js");
var CreateDirectionLightUtils$Meta3dComponentDirectionlight = require("./operate_component/CreateDirectionLightUtils.bs.js");
var RemoveDirectionLightUtils$Meta3dComponentDirectionlight = require("./gameobject/RemoveDirectionLightUtils.bs.js");
var DisposeDirectionLightUtils$Meta3dComponentDirectionlight = require("./operate_component/DisposeDirectionLightUtils.bs.js");
var GetAllDirectionLightsUtils$Meta3dComponentDirectionlight = require("./operate_component/GetAllDirectionLightsUtils.bs.js");
var GetDirectionLightDataUtils$Meta3dComponentDirectionlight = require("./operate_data/GetDirectionLightDataUtils.bs.js");
var SetDirectionLightDataUtils$Meta3dComponentDirectionlight = require("./operate_data/SetDirectionLightDataUtils.bs.js");
var GetNeedDisposedDirectionLightsUtils$Meta3dComponentDirectionlight = require("./gameobject/GetNeedDisposedDirectionLightsUtils.bs.js");

function _restoreTypeArrays(currentState, targetState) {
  if (currentState.colors === targetState.colors && currentState.intensities === targetState.intensities) {
    return [
            currentState,
            targetState
          ];
  } else {
    CreateStateUtils$Meta3dComponentDirectionlight.setAllTypeArrDataToDefault([
          currentState.colors,
          currentState.intensities
        ], currentState.maxIndex, CreateStateUtils$Meta3dComponentDirectionlight.getDefaultData(undefined));
    TypeArrayUtils$Meta3dCommonlib.fillFloat32ArrayWithFloat32Array([
          currentState.colors,
          0
        ], [
          targetState.colors,
          0
        ], targetState.colors.length);
    TypeArrayUtils$Meta3dCommonlib.fillFloat32ArrayWithFloat32Array([
          currentState.intensities,
          0
        ], [
          targetState.intensities,
          0
        ], targetState.intensities.length);
    return [
            currentState,
            targetState
          ];
  }
}

function getContribute(param) {
  return {
          componentName: Index$Meta3dComponentDirectionlightProtocol.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$Meta3dComponentDirectionlight.createState(param.isDebug, param.directionLightCount);
            }),
          getGameObjectsFunc: (function (state, light) {
              return GetGameObjectsUtils$Meta3dComponentDirectionlight.get(state)(light);
            }),
          createComponentFunc: CreateDirectionLightUtils$Meta3dComponentDirectionlight.create,
          addComponentFunc: (function (state, gameObject, light) {
              return AddDirectionLightUtils$Meta3dComponentDirectionlight.add(state)(gameObject, light);
            }),
          removeComponentFunc: (function (state, gameObject, light) {
              return RemoveDirectionLightUtils$Meta3dComponentDirectionlight.remove(state)(gameObject, light);
            }),
          hasComponentFunc: HasDirectionLightUtils$Meta3dComponentDirectionlight.has,
          getComponentFunc: GetDirectionLightUtils$Meta3dComponentDirectionlight.get,
          getNeedDisposedComponentsFunc: GetNeedDisposedDirectionLightsUtils$Meta3dComponentDirectionlight.get,
          getComponentDataFunc: (function (state, light, dataName) {
              return GetDirectionLightDataUtils$Meta3dComponentDirectionlight.getData(state, light, dataName);
            }),
          setComponentDataFunc: (function (state, light, dataName, dataValue) {
              return SetDirectionLightDataUtils$Meta3dComponentDirectionlight.setData(state, light, dataName, dataValue);
            }),
          deferDisposeComponentFunc: (function (state, lightData) {
              return DisposeDirectionLightUtils$Meta3dComponentDirectionlight.deferDisposeComponent(state)(lightData);
            }),
          disposeComponentsFunc: (function (state, lights) {
              return DisposeDirectionLightUtils$Meta3dComponentDirectionlight.disposeComponents(state)(lights);
            }),
          cloneComponentFunc: (function (state, countRange, param, sourceDirectionLight) {
              return CloneDirectionLightUtils$Meta3dComponentDirectionlight.clone(state, countRange, sourceDirectionLight);
            }),
          getAllComponentsFunc: GetAllDirectionLightsUtils$Meta3dComponentDirectionlight.getAll,
          restore: (function (currentState, targetState) {
              var match = _restoreTypeArrays(currentState, targetState);
              var targetState$1 = match[1];
              var currentState$1 = match[0];
              return {
                      config: targetState$1.config,
                      maxIndex: targetState$1.maxIndex,
                      buffer: currentState$1.buffer,
                      colors: currentState$1.colors,
                      intensities: currentState$1.intensities,
                      gameObjectMap: targetState$1.gameObjectMap,
                      gameObjectDirectionLightMap: targetState$1.gameObjectDirectionLightMap,
                      needDisposedDirectionLights: targetState$1.needDisposedDirectionLights,
                      disposedDirectionLights: targetState$1.disposedDirectionLights,
                      names: targetState$1.names
                    };
            }),
          deepCopy: (function (state) {
              var maxIndex = state.maxIndex;
              var colors = state.colors;
              var intensities = state.intensities;
              var gameObjectMap = state.gameObjectMap;
              var needDisposedDirectionLights = state.needDisposedDirectionLights;
              var disposedDirectionLights = state.disposedDirectionLights;
              return {
                      config: state.config,
                      maxIndex: state.maxIndex,
                      buffer: state.buffer,
                      colors: CopyTypeArrayService$Meta3dCommonlib.copyFloat32ArrayWithEndIndex(colors, Math.imul(maxIndex, BufferDirectionLightUtils$Meta3dComponentWorkerUtils.getColorsSize(undefined))),
                      intensities: CopyTypeArrayService$Meta3dCommonlib.copyFloat32ArrayWithEndIndex(intensities, Math.imul(maxIndex, BufferDirectionLightUtils$Meta3dComponentWorkerUtils.getIntensitiesSize(undefined))),
                      gameObjectMap: MutableSparseMap$Meta3dCommonlib.copy(gameObjectMap),
                      gameObjectDirectionLightMap: MutableSparseMap$Meta3dCommonlib.copy(state.gameObjectDirectionLightMap),
                      needDisposedDirectionLights: ArraySt$Meta3dCommonlib.copy(needDisposedDirectionLights),
                      disposedDirectionLights: ArraySt$Meta3dCommonlib.copy(disposedDirectionLights),
                      names: state.names
                    };
            })
        };
}

exports._restoreTypeArrays = _restoreTypeArrays;
exports.getContribute = getContribute;
/* No side effect */
