'use strict';

var Matrix3$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/math/Matrix3.bs.js");
var Matrix4$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/math/Matrix4.bs.js");
var Vector3$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/math/Vector3.bs.js");
var Quaternion$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/math/Quaternion.bs.js");
var ConfigUtils$Meta3dComponentTransform = require("../config/ConfigUtils.bs.js");
var HierachyTransformUtils$Meta3dComponentTransform = require("./HierachyTransformUtils.bs.js");
var ModelMatrixTransformUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/transform/ModelMatrixTransformUtils.bs.js");
var OperateTypeArrayTransformUtils$Meta3dComponentTransform = require("../utils/OperateTypeArrayTransformUtils.bs.js");

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

exports.getLocalPosition = getLocalPosition;
exports.setLocalPosition = setLocalPosition;
exports.setPosition = setPosition;
exports.getLocalRotation = getLocalRotation;
exports.setLocalRotation = setLocalRotation;
exports.getLocalScale = getLocalScale;
exports.setLocalScale = setLocalScale;
exports.setScale = setScale;
exports.getLocalEulerAngles = getLocalEulerAngles;
exports.setLocalEulerAngles = setLocalEulerAngles;
exports.getNormalMatrix = getNormalMatrix;
/* No side effect */
