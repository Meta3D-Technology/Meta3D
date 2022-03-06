

import * as Matrix3$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/math/Matrix3.bs.js";
import * as Matrix4$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/math/Matrix4.bs.js";
import * as Vector3$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/math/Vector3.bs.js";
import * as Quaternion$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/math/Quaternion.bs.js";
import * as ConfigUtils$Meta3dComponentTransform from "../config/ConfigUtils.bs.js";
import * as HierachyTransformUtils$Meta3dComponentTransform from "./HierachyTransformUtils.bs.js";
import * as ModelMatrixTransformUtils$Meta3dComponentWorkerUtils from "./../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/transform/ModelMatrixTransformUtils.bs.js";
import * as OperateTypeArrayTransformUtils$Meta3dComponentTransform from "../utils/OperateTypeArrayTransformUtils.bs.js";

function getLocalPosition(localPositions, transform) {
  return OperateTypeArrayTransformUtils$Meta3dComponentTransform.getLocalPositionTuple(transform, localPositions);
}

function setLocalPosition(state, transform, localPosition) {
  OperateTypeArrayTransformUtils$Meta3dComponentTransform.setLocalPosition(transform, localPosition, state.localPositions);
  return HierachyTransformUtils$Meta3dComponentTransform.markHierachyDirty(state, transform);
}

function setPosition(state, transform, parent, position) {
  return setLocalPosition(state, transform, Vector3$Meta3dCommonlib.transformMat4Tuple(position, Matrix4$Meta3dCommonlib.invert(ConfigUtils$Meta3dComponentTransform.getFloat32Array1(state), ModelMatrixTransformUtils$Meta3dComponentWorkerUtils.getLocalToWorldMatrix(state.localToWorldMatrices, parent))));
}

function getLocalRotation(localRotations, transform) {
  return OperateTypeArrayTransformUtils$Meta3dComponentTransform.getLocalRotationTuple(transform, localRotations);
}

function setLocalRotation(state, transform, localRotation) {
  OperateTypeArrayTransformUtils$Meta3dComponentTransform.setLocalRotation(transform, localRotation, state.localRotations);
  return HierachyTransformUtils$Meta3dComponentTransform.markHierachyDirty(state, transform);
}

function getLocalScale(localScales, transform) {
  return OperateTypeArrayTransformUtils$Meta3dComponentTransform.getLocalScaleTuple(transform, localScales);
}

function setLocalScale(state, transform, localScale) {
  OperateTypeArrayTransformUtils$Meta3dComponentTransform.setLocalScale(transform, localScale, state.localScales);
  return HierachyTransformUtils$Meta3dComponentTransform.markHierachyDirty(state, transform);
}

function setScale(state, transform, parent, scale) {
  return setLocalScale(state, transform, Vector3$Meta3dCommonlib.transformMat4Tuple(scale, Matrix4$Meta3dCommonlib.invert(ConfigUtils$Meta3dComponentTransform.getFloat32Array1(state), ModelMatrixTransformUtils$Meta3dComponentWorkerUtils.getLocalToWorldMatrix(state.localToWorldMatrices, parent))));
}

function getLocalEulerAngles(localRotations, transform) {
  return Quaternion$Meta3dCommonlib.getEulerAngles(OperateTypeArrayTransformUtils$Meta3dComponentTransform.getLocalRotationTuple(transform, localRotations));
}

function setLocalEulerAngles(state, transform, localEulerAngles) {
  return setLocalRotation(state, transform, Quaternion$Meta3dCommonlib.setFromEulerAngles(localEulerAngles));
}

function getNormalMatrix(state, transform) {
  return Matrix3$Meta3dCommonlib.transposeSelf(Matrix4$Meta3dCommonlib.invertTo3x3(ConfigUtils$Meta3dComponentTransform.getFloat9Array1(state), ModelMatrixTransformUtils$Meta3dComponentWorkerUtils.getLocalToWorldMatrix(state.localToWorldMatrices, transform)));
}

export {
  getLocalPosition ,
  setLocalPosition ,
  setPosition ,
  getLocalRotation ,
  setLocalRotation ,
  getLocalScale ,
  setLocalScale ,
  setScale ,
  getLocalEulerAngles ,
  setLocalEulerAngles ,
  getNormalMatrix ,
  
}
/* No side effect */
