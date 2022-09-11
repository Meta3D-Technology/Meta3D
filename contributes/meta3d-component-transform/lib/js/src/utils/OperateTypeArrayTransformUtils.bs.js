'use strict';

var TypeArrayUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/TypeArrayUtils.bs.js");
var BufferTransformUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/transform/BufferTransformUtils.bs.js");

function setLocalToWorldMatrix(index, data, typeArr) {
  return TypeArrayUtils$Meta3dCommonlib.setFloat16(BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalToWorldMatrixIndex(index), data, typeArr);
}

function getLocalPositionTuple(index, typeArr) {
  return TypeArrayUtils$Meta3dCommonlib.getFloat3Tuple(BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalPositionIndex(index), typeArr);
}

function setLocalPosition(index, data, typeArr) {
  return TypeArrayUtils$Meta3dCommonlib.setFloat3(BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalPositionIndex(index), data, typeArr);
}

function getLocalRotationTuple(index, typeArr) {
  return TypeArrayUtils$Meta3dCommonlib.getFloat4Tuple(BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalRotationIndex(index), typeArr);
}

function setLocalRotation(index, data, typeArr) {
  return TypeArrayUtils$Meta3dCommonlib.setFloat4(BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalRotationIndex(index), data, typeArr);
}

function getLocalScaleTuple(index, typeArr) {
  return TypeArrayUtils$Meta3dCommonlib.getFloat3Tuple(BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalScaleIndex(index), typeArr);
}

function setLocalScale(index, data, typeArr) {
  return TypeArrayUtils$Meta3dCommonlib.setFloat3(BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalScaleIndex(index), data, typeArr);
}

exports.setLocalToWorldMatrix = setLocalToWorldMatrix;
exports.getLocalPositionTuple = getLocalPositionTuple;
exports.setLocalPosition = setLocalPosition;
exports.getLocalRotationTuple = getLocalRotationTuple;
exports.setLocalRotation = setLocalRotation;
exports.getLocalScaleTuple = getLocalScaleTuple;
exports.setLocalScale = setLocalScale;
/* No side effect */
