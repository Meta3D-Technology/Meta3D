'use strict';

var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var TypeArrayUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/TypeArrayUtils.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");
var CopyTypeArrayService$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/copy/CopyTypeArrayService.bs.js");
var Index$Meta3dComponentTransformProtocol = require("meta3d-component-transform-protocol/lib/js/src/Index.bs.js");
var CreateStateUtils$Meta3dComponentTransform = require("./create_state/CreateStateUtils.bs.js");
var AddTransformUtils$Meta3dComponentTransform = require("./gameobject/AddTransformUtils.bs.js");
var GetTransformUtils$Meta3dComponentTransform = require("./gameobject/GetTransformUtils.bs.js");
var HasTransformUtils$Meta3dComponentTransform = require("./gameobject/HasTransformUtils.bs.js");
var CloneTransformUtils$Meta3dComponentTransform = require("./operate_component/CloneTransformUtils.bs.js");
var GetGameObjectsUtils$Meta3dComponentTransform = require("./gameobject/GetGameObjectsUtils.bs.js");
var CreateTransformUtils$Meta3dComponentTransform = require("./operate_component/CreateTransformUtils.bs.js");
var RemoveTransformUtils$Meta3dComponentTransform = require("./gameobject/RemoveTransformUtils.bs.js");
var DisposeTransformUtils$Meta3dComponentTransform = require("./operate_component/DisposeTransformUtils.bs.js");
var GetAllTransformsUtils$Meta3dComponentTransform = require("./operate_component/GetAllTransformsUtils.bs.js");
var GetTransformDataUtils$Meta3dComponentTransform = require("./operate_data/GetTransformDataUtils.bs.js");
var SetTransformDataUtils$Meta3dComponentTransform = require("./operate_data/SetTransformDataUtils.bs.js");
var BufferTransformUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/transform/BufferTransformUtils.bs.js");
var GetNeedDisposedTransformsUtils$Meta3dComponentTransform = require("./gameobject/GetNeedDisposedTransformsUtils.bs.js");

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
                      disposedTransforms: targetState$1.disposedTransforms,
                      names: targetState$1.names
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
                      localToWorldMatrices: CopyTypeArrayService$Meta3dCommonlib.copyFloat32ArrayWithEndIndex(localToWorldMatrices, Math.imul(maxIndex, BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalToWorldMatricesSize(undefined))),
                      localPositions: CopyTypeArrayService$Meta3dCommonlib.copyFloat32ArrayWithEndIndex(localPositions, Math.imul(maxIndex, BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalPositionsSize(undefined))),
                      localRotations: CopyTypeArrayService$Meta3dCommonlib.copyFloat32ArrayWithEndIndex(localRotations, Math.imul(maxIndex, BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalRotationsSize(undefined))),
                      localScales: CopyTypeArrayService$Meta3dCommonlib.copyFloat32ArrayWithEndIndex(localScales, Math.imul(maxIndex, BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalScalesSize(undefined))),
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
                      disposedTransforms: ArraySt$Meta3dCommonlib.copy(disposedTransforms),
                      names: state.names
                    };
            })
        };
}

exports._restoreTypeArrays = _restoreTypeArrays;
exports.getContribute = getContribute;
/* No side effect */
