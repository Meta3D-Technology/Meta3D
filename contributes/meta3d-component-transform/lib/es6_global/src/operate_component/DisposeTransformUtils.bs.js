

import * as Js_array from "../../../../../../node_modules/rescript/lib/es6/js_array.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as DisposeUtils$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/DisposeUtils.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";
import * as ImmutableSparseMap$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/ImmutableSparseMap.bs.js";
import * as ConfigUtils$Meta3dComponentTransform from "../config/ConfigUtils.bs.js";
import * as DisposeComponentUtils$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/DisposeComponentUtils.bs.js";
import * as DisposeTypeArrayUtils$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/DisposeTypeArrayUtils.bs.js";
import * as BufferTransformUtils$Meta3dComponentWorkerUtils from "../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/transform/BufferTransformUtils.bs.js";
import * as HierachyTransformUtils$Meta3dComponentTransform from "../operate_data/HierachyTransformUtils.bs.js";
import * as GetNeedDisposedTransformsUtils$Meta3dComponentTransform from "../gameobject/GetNeedDisposedTransformsUtils.bs.js";

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
            disposedTransforms: state.disposedTransforms,
            names: state.names
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
  var names = state.names;
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
    return {
            config: state$1.config,
            maxIndex: state$1.maxIndex,
            buffer: state$1.buffer,
            localToWorldMatrices: state$1.localToWorldMatrices,
            localPositions: state$1.localPositions,
            localRotations: state$1.localRotations,
            localScales: state$1.localScales,
            defaultLocalToWorldMatrix: state$1.defaultLocalToWorldMatrix,
            defaultLocalPosition: state$1.defaultLocalPosition,
            defaultLocalRotation: state$1.defaultLocalRotation,
            defaultLocalScale: state$1.defaultLocalScale,
            parentMap: state$1.parentMap,
            childrenMap: state$1.childrenMap,
            gameObjectMap: state$1.gameObjectMap,
            gameObjectTransformMap: state$1.gameObjectTransformMap,
            dirtyMap: state$1.dirtyMap,
            needDisposedTransforms: state$1.needDisposedTransforms,
            disposedTransforms: state$1.disposedTransforms,
            names: ImmutableSparseMap$Meta3dCommonlib.remove(names, transform)
          };
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

export {
  deferDisposeComponent ,
  _disposeFromParentAndChildMap ,
  _disposeSparseMapData ,
  _disposeData ,
  disposeComponents ,
}
/* No side effect */
