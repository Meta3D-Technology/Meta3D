

import * as ArraySt$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as DisposeUtils$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/DisposeUtils.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";
import * as ConfigUtils$Meta3dComponentTransform from "../config/ConfigUtils.bs.js";
import * as DisposeComponentUtils$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/DisposeComponentUtils.bs.js";
import * as DisposeTypeArrayUtils$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/DisposeTypeArrayUtils.bs.js";
import * as BufferTransformUtils$Meta3dComponentWorkerUtils from "./../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/transform/BufferTransformUtils.bs.js";
import * as HierachyTransformUtils$Meta3dComponentTransform from "./HierachyTransformUtils.bs.js";
import * as GetNeedDisposedTransformsUtils$Meta3dComponentTransform from "../gameobject/GetNeedDisposedTransformsUtils.bs.js";

var _removeComponent = MutableSparseMap$Meta3dCommonlib.remove;

function deferDisposeComponent(state) {
  var gameObjectTransformMap = state.gameObjectTransformMap;
  var needDisposedTransformArray = state.needDisposedTransformArray;
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
            needDisposedTransformArray: ArraySt$Meta3dCommonlib.push(needDisposedTransformArray, param[0]),
            disposedTransformArray: state.disposedTransformArray
          };
  };
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
    state$1.localToWorldMatrices = DisposeTypeArrayUtils$Meta3dCommonlib.deleteAndResetFloat32TypeArr(localToWorldMatrices, BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalToWorldMatrixIndex(component), BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalToWorldMatricesSize(undefined), defaultLocalToWorldMatrix);
    state$1.localPositions = DisposeTypeArrayUtils$Meta3dCommonlib.deleteAndResetFloat32TypeArr(localPositions, BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalPositionIndex(component), BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalPositionsSize(undefined), defaultLocalPosition);
    state$1.localRotations = DisposeTypeArrayUtils$Meta3dCommonlib.deleteAndResetFloat32TypeArr(localRotations, BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalRotationIndex(component), BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalRotationsSize(undefined), defaultLocalRotation);
    state$1.localScales = DisposeTypeArrayUtils$Meta3dCommonlib.deleteAndResetFloat32TypeArr(localScales, BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalScaleIndex(component), BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalScalesSize(undefined), defaultLocalScale);
    state$1.parentMap = MutableSparseMap$Meta3dCommonlib.remove(parentMap, component);
    state$1.childrenMap = MutableSparseMap$Meta3dCommonlib.remove(childrenMap, component);
    state$1.dirtyMap = MutableSparseMap$Meta3dCommonlib.remove(dirtyMap, component);
    state$1.gameObjectMap = MutableSparseMap$Meta3dCommonlib.remove(gameObjectMap, component);
    return state$1;
  };
}

function disposeComponents(state) {
  var disposedTransformArray = state.disposedTransformArray;
  return function (components) {
    var isDebug = ConfigUtils$Meta3dComponentTransform.getIsDebug(state);
    var needDisposedComponents = GetNeedDisposedTransformsUtils$Meta3dComponentTransform.get(state);
    DisposeUtils$Meta3dCommonlib.checkShouldNeedDisposed(isDebug, "component", components, needDisposedComponents);
    state.disposedTransformArray = disposedTransformArray.concat(components);
    state.needDisposedTransformArray = DisposeComponentUtils$Meta3dCommonlib.batchRemoveFromArray(needDisposedComponents, components);
    return ArraySt$Meta3dCommonlib.reduceOneParam(components, (function (state, component) {
                  return _disposeData(state)(isDebug, component);
                }), state);
  };
}

export {
  _removeComponent ,
  deferDisposeComponent ,
  _disposeFromParentAndChildMap ,
  _disposeSparseMapData ,
  _disposeData ,
  disposeComponents ,
  
}
/* No side effect */
