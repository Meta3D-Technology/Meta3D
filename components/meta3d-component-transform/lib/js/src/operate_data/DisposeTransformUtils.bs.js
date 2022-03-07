'use strict';

var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var Contract$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/contract/Contract.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");
var ConfigUtils$Meta3dComponentTransform = require("../config/ConfigUtils.bs.js");
var DisposeTypeArrayUtils$Meta3dComponentTransform = require("../utils/DisposeTypeArrayUtils.bs.js");
var BufferTransformUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/transform/BufferTransformUtils.bs.js");
var HierachyTransformUtils$Meta3dComponentTransform = require("./HierachyTransformUtils.bs.js");

var _removeComponent = MutableSparseMap$Meta3dCommonlib.remove;

function deferDisposeComponentFunc(state) {
  var gameObjectTransformMap = state.gameObjectTransformMap;
  var needDisposedTransformArray = state.needDisposedTransformArray;
  return function (component) {
    var gameObjectTransformMap$1 = MutableSparseMap$Meta3dCommonlib.remove(gameObjectTransformMap, component);
    return {
            config: state.config,
            maxIndex: state.maxIndex,
            buffer: state.buffer,
            localToWorldMatrices: state.localToWorldMatrices,
            localPositions: state.localPositions,
            localRotations: state.localRotations,
            localScales: state.localScales,
            defaultLocalToWorldMatrix: state.defaultLocalToWorldMatrix,
            defaultLocalPosition: state.defaultLocalPosition,
            defaultLocalRotation: state.defaultLocalRotation,
            defaultLocalScale: state.defaultLocalScale,
            parentMap: state.parentMap,
            childrenMap: state.childrenMap,
            gameObjectMap: state.gameObjectMap,
            gameObjectTransformMap: MutableSparseMap$Meta3dCommonlib.remove(gameObjectTransformMap$1, component),
            dirtyMap: state.dirtyMap,
            needDisposedTransformArray: ArraySt$Meta3dCommonlib.push(needDisposedTransformArray, component),
            disposedTransformArray: state.disposedTransformArray
          };
  };
}

function _isNotNeedDispose(component, needDisposedIndexArray) {
  return !needDisposedIndexArray.includes(component);
}

function _disposeFromParentAndChildMap(state, isDebug, component) {
  var parentMap = ArraySt$Meta3dCommonlib.reduceOneParam(HierachyTransformUtils$Meta3dComponentTransform.unsafeGetChildren(state.childrenMap, component), HierachyTransformUtils$Meta3dComponentTransform.removeParentMap, state.parentMap);
  var parent = HierachyTransformUtils$Meta3dComponentTransform.getParent(parentMap, component);
  if (parent !== undefined) {
    HierachyTransformUtils$Meta3dComponentTransform.removeFromChildMap(state.childrenMap, isDebug, parent, component);
    return state;
  } else {
    return state;
  }
}

var _disposeSparseMapData = MutableSparseMap$Meta3dCommonlib.remove;

function _disposeData(state) {
  var localToWorldMatrices = state.localToWorldMatrices;
  var localPositions = state.localPositions;
  var localRotations = state.localRotations;
  var localScales = state.localScales;
  var defaultLocalScale = state.defaultLocalScale;
  var defaultLocalRotation = state.defaultLocalRotation;
  var defaultLocalPosition = state.defaultLocalPosition;
  var defaultLocalToWorldMatrix = state.defaultLocalToWorldMatrix;
  var parentMap = state.parentMap;
  var childrenMap = state.childrenMap;
  var gameObjectMap = state.gameObjectMap;
  var dirtyMap = state.dirtyMap;
  return function (isDebug, component) {
    var state$1 = _disposeFromParentAndChildMap(state, isDebug, component);
    state$1.localToWorldMatrices = DisposeTypeArrayUtils$Meta3dComponentTransform.deleteAndResetFloat32TypeArr(BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalToWorldMatrixIndex(component), BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalToWorldMatricesSize(undefined), defaultLocalToWorldMatrix, localToWorldMatrices);
    state$1.localPositions = DisposeTypeArrayUtils$Meta3dComponentTransform.deleteAndResetFloat32TypeArr(BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalPositionIndex(component), BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalPositionsSize(undefined), defaultLocalPosition, localPositions);
    state$1.localRotations = DisposeTypeArrayUtils$Meta3dComponentTransform.deleteAndResetFloat32TypeArr(BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalRotationIndex(component), BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalRotationsSize(undefined), defaultLocalRotation, localRotations);
    state$1.localScales = DisposeTypeArrayUtils$Meta3dComponentTransform.deleteAndResetFloat32TypeArr(BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalScaleIndex(component), BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalScalesSize(undefined), defaultLocalScale, localScales);
    state$1.parentMap = MutableSparseMap$Meta3dCommonlib.remove(parentMap, component);
    state$1.childrenMap = MutableSparseMap$Meta3dCommonlib.remove(childrenMap, component);
    state$1.dirtyMap = MutableSparseMap$Meta3dCommonlib.remove(dirtyMap, component);
    state$1.gameObjectMap = MutableSparseMap$Meta3dCommonlib.remove(gameObjectMap, component);
    return state$1;
  };
}

function batchDisposeComponentsFunc(state) {
  var needDisposedTransformArray = state.needDisposedTransformArray;
  var disposedTransformArray = state.disposedTransformArray;
  return function (components) {
    Contract$Meta3dCommonlib.requireCheck((function (param) {
            return Contract$Meta3dCommonlib.test(Log$Meta3dCommonlib.buildAssertMessage("component should need disposed", "not"), (function (param) {
                          return ArraySt$Meta3dCommonlib.reduceOneParam(components, (function (isNotNeedDispose, component) {
                                        if (isNotNeedDispose) {
                                          return true;
                                        } else {
                                          return !needDisposedTransformArray.includes(component);
                                        }
                                      }), false);
                        }));
          }), ConfigUtils$Meta3dComponentTransform.getIsDebug(state));
    var isDebug = ConfigUtils$Meta3dComponentTransform.getIsDebug(state);
    state.disposedTransformArray = disposedTransformArray.concat(components);
    return ArraySt$Meta3dCommonlib.reduceOneParam(components, (function (state, component) {
                  return _disposeData(state)(isDebug, component);
                }), state);
  };
}

exports._removeComponent = _removeComponent;
exports.deferDisposeComponentFunc = deferDisposeComponentFunc;
exports._isNotNeedDispose = _isNotNeedDispose;
exports._disposeFromParentAndChildMap = _disposeFromParentAndChildMap;
exports._disposeSparseMapData = _disposeSparseMapData;
exports._disposeData = _disposeData;
exports.batchDisposeComponentsFunc = batchDisposeComponentsFunc;
/* No side effect */
