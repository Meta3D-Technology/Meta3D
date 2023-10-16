'use strict';

var Js_array = require("rescript/lib/js/js_array.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var DisposeUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/DisposeUtils.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");
var ConfigUtils$Meta3dComponentTransform = require("../config/ConfigUtils.bs.js");
var DisposeComponentUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/DisposeComponentUtils.bs.js");
var DisposeTypeArrayUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/DisposeTypeArrayUtils.bs.js");
var BufferTransformUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/transform/BufferTransformUtils.bs.js");
var HierachyTransformUtils$Meta3dComponentTransform = require("../operate_data/HierachyTransformUtils.bs.js");
var GetNeedDisposedTransformsUtils$Meta3dComponentTransform = require("../gameobject/GetNeedDisposedTransformsUtils.bs.js");

function deferDisposeComponent(state) {
  var gameObjectTransformMap = state.gameObjectTransformMap;
  var needDisposedTransforms = state.needDisposedTransforms;
  return function (param) {
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
            gameObjectTransformMap: MutableSparseMap$Meta3dCommonlib.remove(gameObjectTransformMap, param[1]),
            dirtyMap: state.dirtyMap,
            needDisposedTransforms: ArraySt$Meta3dCommonlib.push(needDisposedTransforms, param[0]),
            disposedTransforms: state.disposedTransforms
          };
  };
}

function _disposeFromParentAndChildMap(state, isDebug, transform) {
  var parentMap = ArraySt$Meta3dCommonlib.reduceOneParam(HierachyTransformUtils$Meta3dComponentTransform.unsafeGetChildren(state.childrenMap, transform), HierachyTransformUtils$Meta3dComponentTransform.removeParentMap, state.parentMap);
  var parent = HierachyTransformUtils$Meta3dComponentTransform.getParent(parentMap, transform);
  if (parent !== undefined) {
    HierachyTransformUtils$Meta3dComponentTransform.removeFromChildMap(state.childrenMap, isDebug, parent, transform);
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
  return function (isDebug, transform) {
    var state$1 = _disposeFromParentAndChildMap(state, isDebug, transform);
    state$1.localToWorldMatrices = DisposeTypeArrayUtils$Meta3dCommonlib.deleteAndResetFloat32TypeArr(localToWorldMatrices, BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalToWorldMatrixIndex(transform), BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalToWorldMatricesSize(undefined), defaultLocalToWorldMatrix);
    state$1.localPositions = DisposeTypeArrayUtils$Meta3dCommonlib.deleteAndResetFloat32TypeArr(localPositions, BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalPositionIndex(transform), BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalPositionsSize(undefined), defaultLocalPosition);
    state$1.localRotations = DisposeTypeArrayUtils$Meta3dCommonlib.deleteAndResetFloat32TypeArr(localRotations, BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalRotationIndex(transform), BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalRotationsSize(undefined), defaultLocalRotation);
    state$1.localScales = DisposeTypeArrayUtils$Meta3dCommonlib.deleteAndResetFloat32TypeArr(localScales, BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalScaleIndex(transform), BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalScalesSize(undefined), defaultLocalScale);
    state$1.parentMap = MutableSparseMap$Meta3dCommonlib.remove(parentMap, transform);
    state$1.childrenMap = MutableSparseMap$Meta3dCommonlib.remove(childrenMap, transform);
    state$1.dirtyMap = MutableSparseMap$Meta3dCommonlib.remove(dirtyMap, transform);
    state$1.gameObjectMap = MutableSparseMap$Meta3dCommonlib.remove(gameObjectMap, transform);
    return state$1;
  };
}

function disposeComponents(state) {
  var disposedTransforms = state.disposedTransforms;
  return function (transforms) {
    var isDebug = ConfigUtils$Meta3dComponentTransform.getIsDebug(state);
    var needDisposedComponents = GetNeedDisposedTransformsUtils$Meta3dComponentTransform.get(state);
    DisposeUtils$Meta3dCommonlib.checkShouldNeedDisposed(isDebug, "transform", transforms, needDisposedComponents);
    state.disposedTransforms = Js_array.concat(transforms, disposedTransforms);
    state.needDisposedTransforms = DisposeComponentUtils$Meta3dCommonlib.batchRemoveFromArray(needDisposedComponents, transforms);
    return [
            ArraySt$Meta3dCommonlib.reduceOneParam(transforms, (function (state, transform) {
                    return _disposeData(state)(isDebug, transform);
                  }), state),
            transforms
          ];
  };
}

exports.deferDisposeComponent = deferDisposeComponent;
exports._disposeFromParentAndChildMap = _disposeFromParentAndChildMap;
exports._disposeSparseMapData = _disposeSparseMapData;
exports._disposeData = _disposeData;
exports.disposeComponents = disposeComponents;
/* No side effect */
