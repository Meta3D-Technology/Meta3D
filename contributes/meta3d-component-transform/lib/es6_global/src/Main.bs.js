

import * as ArraySt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as TypeArrayUtils$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/TypeArrayUtils.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";
import * as Index$Meta3dComponentTransformProtocol from "../../../../../node_modules/meta3d-component-transform-protocol/lib/es6_global/src/Index.bs.js";
import * as CreateStateUtils$Meta3dComponentTransform from "./create_state/CreateStateUtils.bs.js";
import * as AddTransformUtils$Meta3dComponentTransform from "./gameobject/AddTransformUtils.bs.js";
import * as GetTransformUtils$Meta3dComponentTransform from "./gameobject/GetTransformUtils.bs.js";
import * as HasTransformUtils$Meta3dComponentTransform from "./gameobject/HasTransformUtils.bs.js";
import * as CloneTransformUtils$Meta3dComponentTransform from "./operate_component/CloneTransformUtils.bs.js";
import * as GetGameObjectsUtils$Meta3dComponentTransform from "./gameobject/GetGameObjectsUtils.bs.js";
import * as CopyTypeArrayService$Meta3dComponentCommonlib from "../../../../../node_modules/meta3d-component-commonlib/lib/es6_global/src/copy/CopyTypeArrayService.bs.js";
import * as CreateTransformUtils$Meta3dComponentTransform from "./operate_component/CreateTransformUtils.bs.js";
import * as RemoveTransformUtils$Meta3dComponentTransform from "./gameobject/RemoveTransformUtils.bs.js";
import * as DisposeTransformUtils$Meta3dComponentTransform from "./operate_component/DisposeTransformUtils.bs.js";
import * as GetAllTransformsUtils$Meta3dComponentTransform from "./operate_component/GetAllTransformsUtils.bs.js";
import * as GetTransformDataUtils$Meta3dComponentTransform from "./operate_data/GetTransformDataUtils.bs.js";
import * as SetTransformDataUtils$Meta3dComponentTransform from "./operate_data/SetTransformDataUtils.bs.js";
import * as BufferTransformUtils$Meta3dComponentWorkerUtils from "../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/transform/BufferTransformUtils.bs.js";
import * as GetNeedDisposedTransformsUtils$Meta3dComponentTransform from "./gameobject/GetNeedDisposedTransformsUtils.bs.js";

function _restoreTypeArrays(currentState, targetState) {
  if (currentState.localPositions === targetState.localPositions && currentState.localRotations === targetState.localRotations && currentState.localScales === targetState.localScales && currentState.localToWorldMatrices === targetState.localToWorldMatrices) {
    return [
            currentState,
            targetState
          ];
  } else {
    CreateStateUtils$Meta3dComponentTransform.setAllTypeArrDataToDefault([
          currentState.localToWorldMatrices,
          currentState.localPositions,
          currentState.localRotations,
          currentState.localScales
        ], currentState.maxIndex, [
          currentState.defaultLocalToWorldMatrix,
          currentState.defaultLocalPosition,
          currentState.defaultLocalRotation,
          currentState.defaultLocalScale
        ]);
    TypeArrayUtils$Meta3dCommonlib.fillFloat32ArrayWithFloat32Array([
          currentState.localPositions,
          0
        ], [
          targetState.localPositions,
          0
        ], targetState.localPositions.length);
    TypeArrayUtils$Meta3dCommonlib.fillFloat32ArrayWithFloat32Array([
          currentState.localRotations,
          0
        ], [
          targetState.localRotations,
          0
        ], targetState.localRotations.length);
    TypeArrayUtils$Meta3dCommonlib.fillFloat32ArrayWithFloat32Array([
          currentState.localScales,
          0
        ], [
          targetState.localScales,
          0
        ], targetState.localScales.length);
    TypeArrayUtils$Meta3dCommonlib.fillFloat32ArrayWithFloat32Array([
          currentState.localToWorldMatrices,
          0
        ], [
          targetState.localToWorldMatrices,
          0
        ], targetState.localToWorldMatrices.length);
    return [
            currentState,
            targetState
          ];
  }
}

function getContribute(param) {
  return {
          componentName: Index$Meta3dComponentTransformProtocol.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$Meta3dComponentTransform.createState(param.isDebug, param.transformCount, param.float9Array1, param.float32Array1);
            }),
          getGameObjectsFunc: (function (state, transform) {
              return GetGameObjectsUtils$Meta3dComponentTransform.get(state)(transform);
            }),
          createComponentFunc: CreateTransformUtils$Meta3dComponentTransform.create,
          addComponentFunc: (function (state, gameObject, transform) {
              return AddTransformUtils$Meta3dComponentTransform.add(state)(gameObject, transform);
            }),
          removeComponentFunc: (function (state, gameObject, transform) {
              return RemoveTransformUtils$Meta3dComponentTransform.remove(state)(gameObject, transform);
            }),
          hasComponentFunc: (function (state, gameObject) {
              return HasTransformUtils$Meta3dComponentTransform.has(state)(gameObject);
            }),
          getComponentFunc: (function (state, gameObject) {
              return GetTransformUtils$Meta3dComponentTransform.get(state)(gameObject);
            }),
          getNeedDisposedComponentsFunc: GetNeedDisposedTransformsUtils$Meta3dComponentTransform.get,
          getComponentDataFunc: (function (state, transform, dataName) {
              return GetTransformDataUtils$Meta3dComponentTransform.getData(state, transform, dataName);
            }),
          setComponentDataFunc: (function (state, transform, dataName, dataValue) {
              return SetTransformDataUtils$Meta3dComponentTransform.setData(state, transform, dataName, dataValue);
            }),
          deferDisposeComponentFunc: (function (state, transformData) {
              return DisposeTransformUtils$Meta3dComponentTransform.deferDisposeComponent(state)(transformData);
            }),
          disposeComponentsFunc: (function (state, transforms) {
              return DisposeTransformUtils$Meta3dComponentTransform.disposeComponents(state)(transforms);
            }),
          cloneComponentFunc: (function (state, countRange, param, sourceTransform) {
              return CloneTransformUtils$Meta3dComponentTransform.clone(state, countRange, sourceTransform);
            }),
          getAllComponentsFunc: GetAllTransformsUtils$Meta3dComponentTransform.getAll,
          restore: (function (currentState, targetState) {
              var match = _restoreTypeArrays(currentState, targetState);
              var targetState$1 = match[1];
              var currentState$1 = match[0];
              return {
                      config: targetState$1.config,
                      maxIndex: targetState$1.maxIndex,
                      buffer: currentState$1.buffer,
                      localToWorldMatrices: currentState$1.localToWorldMatrices,
                      localPositions: currentState$1.localPositions,
                      localRotations: currentState$1.localRotations,
                      localScales: currentState$1.localScales,
                      defaultLocalToWorldMatrix: targetState$1.defaultLocalToWorldMatrix,
                      defaultLocalPosition: targetState$1.defaultLocalPosition,
                      defaultLocalRotation: targetState$1.defaultLocalRotation,
                      defaultLocalScale: targetState$1.defaultLocalScale,
                      parentMap: targetState$1.parentMap,
                      childrenMap: targetState$1.childrenMap,
                      gameObjectMap: targetState$1.gameObjectMap,
                      gameObjectTransformMap: targetState$1.gameObjectTransformMap,
                      dirtyMap: targetState$1.dirtyMap,
                      needDisposedTransforms: targetState$1.needDisposedTransforms,
                      disposedTransforms: targetState$1.disposedTransforms
                    };
            }),
          deepCopy: (function (state) {
              var maxIndex = state.maxIndex;
              var localToWorldMatrices = state.localToWorldMatrices;
              var localPositions = state.localPositions;
              var localRotations = state.localRotations;
              var localScales = state.localScales;
              var parentMap = state.parentMap;
              var childrenMap = state.childrenMap;
              var gameObjectMap = state.gameObjectMap;
              var gameObjectTransformMap = state.gameObjectTransformMap;
              var dirtyMap = state.dirtyMap;
              var needDisposedTransforms = state.needDisposedTransforms;
              var disposedTransforms = state.disposedTransforms;
              return {
                      config: state.config,
                      maxIndex: state.maxIndex,
                      buffer: state.buffer,
                      localToWorldMatrices: CopyTypeArrayService$Meta3dComponentCommonlib.copyFloat32ArrayWithEndIndex(localToWorldMatrices, Math.imul(maxIndex, BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalToWorldMatricesSize(undefined))),
                      localPositions: CopyTypeArrayService$Meta3dComponentCommonlib.copyFloat32ArrayWithEndIndex(localPositions, Math.imul(maxIndex, BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalPositionsSize(undefined))),
                      localRotations: CopyTypeArrayService$Meta3dComponentCommonlib.copyFloat32ArrayWithEndIndex(localRotations, Math.imul(maxIndex, BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalRotationsSize(undefined))),
                      localScales: CopyTypeArrayService$Meta3dComponentCommonlib.copyFloat32ArrayWithEndIndex(localScales, Math.imul(maxIndex, BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalScalesSize(undefined))),
                      defaultLocalToWorldMatrix: state.defaultLocalToWorldMatrix,
                      defaultLocalPosition: state.defaultLocalPosition,
                      defaultLocalRotation: state.defaultLocalRotation,
                      defaultLocalScale: state.defaultLocalScale,
                      parentMap: MutableSparseMap$Meta3dCommonlib.copy(parentMap),
                      childrenMap: MutableSparseMap$Meta3dCommonlib.copy(childrenMap),
                      gameObjectMap: MutableSparseMap$Meta3dCommonlib.copy(gameObjectMap),
                      gameObjectTransformMap: MutableSparseMap$Meta3dCommonlib.copy(gameObjectTransformMap),
                      dirtyMap: MutableSparseMap$Meta3dCommonlib.copy(dirtyMap),
                      needDisposedTransforms: ArraySt$Meta3dCommonlib.copy(needDisposedTransforms),
                      disposedTransforms: ArraySt$Meta3dCommonlib.copy(disposedTransforms)
                    };
            })
        };
}

export {
  _restoreTypeArrays ,
  getContribute ,
}
/* No side effect */
