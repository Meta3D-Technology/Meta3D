

import * as ArrayBufferUtils$Meta3dCommonlib from "./../../../../../meta3d-commonlib/lib/es6_global/src/scene_graph/component/ArrayBufferUtils.bs.js";

function getLocalToWorldMatricesSize(param) {
  return 16;
}

function getLocalToWorldMatricesLength(count) {
  return (count << 4);
}

function getLocalToWorldMatricesOffset(count) {
  return 0;
}

function getLocalPositionsSize(param) {
  return 3;
}

function getLocalPositionsLength(count) {
  return Math.imul(count, 3);
}

function getLocalPositionsOffset(count) {
  return 0 + Math.imul((count << 4), Float32Array.BYTES_PER_ELEMENT) | 0;
}

function getLocalRotationsSize(param) {
  return 4;
}

function getLocalRotationsLength(count) {
  return (count << 2);
}

function getLocalRotationsOffset(count) {
  return getLocalPositionsOffset(count) + Math.imul(Math.imul(count, 3), Float32Array.BYTES_PER_ELEMENT) | 0;
}

function getLocalScalesSize(param) {
  return 3;
}

function getLocalScalesLength(count) {
  return Math.imul(count, 3);
}

function getLocalScalesOffset(count) {
  return getLocalRotationsOffset(count) + Math.imul((count << 2), Float32Array.BYTES_PER_ELEMENT) | 0;
}

function getLocalToWorldMatrixIndex(index) {
  return (index << 4);
}

function getLocalPositionIndex(index) {
  return Math.imul(index, 3);
}

function getLocalRotationIndex(index) {
  return (index << 2);
}

function getLocalScaleIndex(index) {
  return Math.imul(index, 3);
}

function getTotalByteLength(count) {
  return Math.imul(Math.imul(count, Float32Array.BYTES_PER_ELEMENT), 26);
}

function createBuffer(count) {
  return ArrayBufferUtils$Meta3dCommonlib.newArrayBuffer(getTotalByteLength(count));
}

export {
  getLocalToWorldMatricesSize ,
  getLocalToWorldMatricesLength ,
  getLocalToWorldMatricesOffset ,
  getLocalPositionsSize ,
  getLocalPositionsLength ,
  getLocalPositionsOffset ,
  getLocalRotationsSize ,
  getLocalRotationsLength ,
  getLocalRotationsOffset ,
  getLocalScalesSize ,
  getLocalScalesLength ,
  getLocalScalesOffset ,
  getLocalToWorldMatrixIndex ,
  getLocalPositionIndex ,
  getLocalRotationIndex ,
  getLocalScaleIndex ,
  getTotalByteLength ,
  createBuffer ,
}
/* No side effect */
