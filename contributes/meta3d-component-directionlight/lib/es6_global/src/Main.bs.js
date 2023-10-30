

import * as ArraySt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as TypeArrayUtils$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/TypeArrayUtils.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";
import * as CopyTypeArrayService$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/copy/CopyTypeArrayService.bs.js";
import * as Index$Meta3dComponentDirectionlightProtocol from "../../../../../node_modules/meta3d-component-directionlight-protocol/lib/es6_global/src/Index.bs.js";
import * as CreateStateUtils$Meta3dComponentDirectionlight from "./create_state/CreateStateUtils.bs.js";
import * as GetGameObjectsUtils$Meta3dComponentDirectionlight from "./gameobject/GetGameObjectsUtils.bs.js";
import * as AddDirectionLightUtils$Meta3dComponentDirectionlight from "./gameobject/AddDirectionLightUtils.bs.js";
import * as BufferDirectionLightUtils$Meta3dComponentWorkerUtils from "../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/directionlight/BufferDirectionLightUtils.bs.js";
import * as GetDirectionLightUtils$Meta3dComponentDirectionlight from "./gameobject/GetDirectionLightUtils.bs.js";
import * as HasDirectionLightUtils$Meta3dComponentDirectionlight from "./gameobject/HasDirectionLightUtils.bs.js";
import * as CloneDirectionLightUtils$Meta3dComponentDirectionlight from "./operate_component/CloneDirectionLightUtils.bs.js";
import * as CreateDirectionLightUtils$Meta3dComponentDirectionlight from "./operate_component/CreateDirectionLightUtils.bs.js";
import * as RemoveDirectionLightUtils$Meta3dComponentDirectionlight from "./gameobject/RemoveDirectionLightUtils.bs.js";
import * as DisposeDirectionLightUtils$Meta3dComponentDirectionlight from "./operate_component/DisposeDirectionLightUtils.bs.js";
import * as GetAllDirectionLightsUtils$Meta3dComponentDirectionlight from "./operate_component/GetAllDirectionLightsUtils.bs.js";
import * as GetDirectionLightDataUtils$Meta3dComponentDirectionlight from "./operate_data/GetDirectionLightDataUtils.bs.js";
import * as SetDirectionLightDataUtils$Meta3dComponentDirectionlight from "./operate_data/SetDirectionLightDataUtils.bs.js";
import * as GetNeedDisposedDirectionLightsUtils$Meta3dComponentDirectionlight from "./gameobject/GetNeedDisposedDirectionLightsUtils.bs.js";

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

export {
  _restoreTypeArrays ,
  getContribute ,
}
/* No side effect */
