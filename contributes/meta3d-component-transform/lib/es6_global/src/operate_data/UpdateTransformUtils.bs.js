

import * as Matrix4$Meta3dCommonlib from "./../../../../../meta3d-commonlib/lib/es6_global/src/math/Matrix4.bs.js";
import * as Quaternion$Meta3dCommonlib from "./../../../../../meta3d-commonlib/lib/es6_global/src/math/Quaternion.bs.js";
import * as ConfigUtils$Meta3dComponentTransform from "../config/ConfigUtils.bs.js";
import * as DirtyTransformUtils$Meta3dComponentTransform from "./DirtyTransformUtils.bs.js";
import * as HierachyTransformUtils$Meta3dComponentTransform from "./HierachyTransformUtils.bs.js";
import * as ModelMatrixTransformUtils$Meta3dComponentTransform from "./ModelMatrixTransformUtils.bs.js";
import * as ModelMatrixTransformUtils$Meta3dComponentWorkerUtils from "./../../../../../meta3d-component-worker-utils/lib/es6_global/src/transform/ModelMatrixTransformUtils.bs.js";

function mutableUpdate(state, transform) {
  var localToWorldMatrices = state.localToWorldMatrices;
  var localPositions = state.localPositions;
  var localRotations = state.localRotations;
  var localScales = state.localScales;
  var parentMap = state.parentMap;
  if (!DirtyTransformUtils$Meta3dComponentTransform.isDirty(state, transform)) {
    return state;
  }
  var state$1 = DirtyTransformUtils$Meta3dComponentTransform.mark(state, transform, false);
  var parent = HierachyTransformUtils$Meta3dComponentTransform.getParent(parentMap, transform);
  if (parent !== undefined) {
    var state$2 = mutableUpdate(state$1, parent);
    var localToWorldMatrices$1 = state$2.localToWorldMatrices;
    var localPositions$1 = state$2.localPositions;
    var localRotations$1 = state$2.localRotations;
    var localScales$1 = state$2.localScales;
    var parentLocalToWorldMatrix = ModelMatrixTransformUtils$Meta3dComponentWorkerUtils.getLocalToWorldMatrix(localToWorldMatrices$1, parent);
    var childLocalToWorldMatrix = ModelMatrixTransformUtils$Meta3dComponentWorkerUtils.getLocalToWorldMatrix(localToWorldMatrices$1, transform);
    Matrix4$Meta3dCommonlib.multiply(childLocalToWorldMatrix, parentLocalToWorldMatrix, Matrix4$Meta3dCommonlib.fromTranslationRotationScale(ConfigUtils$Meta3dComponentTransform.getFloat32Array1(state$2), ModelMatrixTransformUtils$Meta3dComponentTransform.getLocalPosition(localPositions$1, transform), ModelMatrixTransformUtils$Meta3dComponentTransform.getLocalRotation(localRotations$1, transform), ModelMatrixTransformUtils$Meta3dComponentTransform.getLocalScale(localScales$1, transform)));
    return state$2;
  }
  var localToWorldMatrix = ModelMatrixTransformUtils$Meta3dComponentWorkerUtils.getLocalToWorldMatrix(localToWorldMatrices, transform);
  Matrix4$Meta3dCommonlib.fromTranslationRotationScale(localToWorldMatrix, ModelMatrixTransformUtils$Meta3dComponentTransform.getLocalPosition(localPositions, transform), ModelMatrixTransformUtils$Meta3dComponentTransform.getLocalRotation(localRotations, transform), ModelMatrixTransformUtils$Meta3dComponentTransform.getLocalScale(localScales, transform));
  return state$1;
}

function updateAndGetPosition(state, transform) {
  var state$1 = mutableUpdate(state, transform);
  var localToWorldMatrices = state$1.localToWorldMatrices;
  return [
          state$1,
          Matrix4$Meta3dCommonlib.getTranslationTuple(ModelMatrixTransformUtils$Meta3dComponentWorkerUtils.getLocalToWorldMatrix(localToWorldMatrices, transform))
        ];
}

function updateAndSetPosition(state, transform, position) {
  var parentMap = state.parentMap;
  var parent = HierachyTransformUtils$Meta3dComponentTransform.getParent(parentMap, transform);
  if (parent === undefined) {
    return ModelMatrixTransformUtils$Meta3dComponentTransform.setLocalPosition(state, transform, position);
  }
  var state$1 = mutableUpdate(state, parent);
  return ModelMatrixTransformUtils$Meta3dComponentTransform.setPosition(state$1, transform, parent, position);
}

function updateAndGetRotation(state, transform) {
  var state$1 = mutableUpdate(state, transform);
  var localToWorldMatrices = state$1.localToWorldMatrices;
  return [
          state$1,
          Matrix4$Meta3dCommonlib.getRotationTuple(ModelMatrixTransformUtils$Meta3dComponentWorkerUtils.getLocalToWorldMatrix(localToWorldMatrices, transform))
        ];
}

function updateAndSetRotation(state, transform, rotation) {
  var parentMap = state.parentMap;
  var parent = HierachyTransformUtils$Meta3dComponentTransform.getParent(parentMap, transform);
  if (parent === undefined) {
    return ModelMatrixTransformUtils$Meta3dComponentTransform.setLocalRotation(state, transform, rotation);
  }
  var match = updateAndGetRotation(state, parent);
  return ModelMatrixTransformUtils$Meta3dComponentTransform.setLocalRotation(match[0], transform, Quaternion$Meta3dCommonlib.multiply(Quaternion$Meta3dCommonlib.invert(match[1]), rotation));
}

function updateAndGetScale(state, transform) {
  var state$1 = mutableUpdate(state, transform);
  var localToWorldMatrices = state$1.localToWorldMatrices;
  return [
          state$1,
          Matrix4$Meta3dCommonlib.getScaleTuple(ModelMatrixTransformUtils$Meta3dComponentWorkerUtils.getLocalToWorldMatrix(localToWorldMatrices, transform))
        ];
}

function updateAndSetScale(state, transform, scale) {
  var parentMap = state.parentMap;
  var parent = HierachyTransformUtils$Meta3dComponentTransform.getParent(parentMap, transform);
  if (parent === undefined) {
    return ModelMatrixTransformUtils$Meta3dComponentTransform.setLocalScale(state, transform, scale);
  }
  var state$1 = mutableUpdate(state, parent);
  return ModelMatrixTransformUtils$Meta3dComponentTransform.setScale(state$1, transform, parent, scale);
}

function updateAndGetEulerAngles(state, transform) {
  var state$1 = mutableUpdate(state, transform);
  var localToWorldMatrices = state$1.localToWorldMatrices;
  return [
          state$1,
          Matrix4$Meta3dCommonlib.getEulerAngles(ModelMatrixTransformUtils$Meta3dComponentWorkerUtils.getLocalToWorldMatrix(localToWorldMatrices, transform))
        ];
}

function updateAndSetEulerAngles(state, transform, eulerAngles) {
  return updateAndSetRotation(state, transform, Quaternion$Meta3dCommonlib.setFromEulerAngles(eulerAngles));
}

export {
  mutableUpdate ,
  updateAndGetPosition ,
  updateAndSetPosition ,
  updateAndGetRotation ,
  updateAndSetRotation ,
  updateAndGetScale ,
  updateAndSetScale ,
  updateAndGetEulerAngles ,
  updateAndSetEulerAngles ,
}
/* No side effect */
