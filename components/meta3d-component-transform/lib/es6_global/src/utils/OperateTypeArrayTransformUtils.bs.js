

import * as TypeArrayUtils$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/component/TypeArrayUtils.bs.js";
import * as BufferTransformUtils$Meta3dComponentWorkerUtils from "./../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/transform/BufferTransformUtils.bs.js";

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

export {
  setLocalToWorldMatrix ,
  getLocalPositionTuple ,
  setLocalPosition ,
  getLocalRotationTuple ,
  setLocalRotation ,
  getLocalScaleTuple ,
  setLocalScale ,
  
}
/* No side effect */
