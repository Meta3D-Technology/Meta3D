

import * as TypeArrayUtils$Meta3dCommonlib from "./../../../../../meta3d-commonlib/lib/es6_global/src/scene_graph/component/TypeArrayUtils.bs.js";
import * as BufferPBRMaterialUtils$Meta3dComponentWorkerUtils from "./BufferPBRMaterialUtils.bs.js";

function getDiffuseColor(index, typeArr) {
  return TypeArrayUtils$Meta3dCommonlib.getFloat3Tuple(BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getDiffuseColorIndex(index), typeArr);
}

function getSpecular(index, typeArr) {
  return TypeArrayUtils$Meta3dCommonlib.getFloat1(BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getSpecularIndex(index), typeArr);
}

function getSpecularColor(index, typeArr) {
  return TypeArrayUtils$Meta3dCommonlib.getFloat3Tuple(BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getSpecularColorIndex(index), typeArr);
}

function getRoughness(index, typeArr) {
  return TypeArrayUtils$Meta3dCommonlib.getFloat1(BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getRoughnessIndex(index), typeArr);
}

function getMetalness(index, typeArr) {
  return TypeArrayUtils$Meta3dCommonlib.getFloat1(BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getMetalnessIndex(index), typeArr);
}

function getTransmission(index, typeArr) {
  return TypeArrayUtils$Meta3dCommonlib.getFloat1(BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getTransmissionIndex(index), typeArr);
}

function getIOR(index, typeArr) {
  return TypeArrayUtils$Meta3dCommonlib.getFloat1(BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getIORIndex(index), typeArr);
}

export {
  getDiffuseColor ,
  getSpecular ,
  getSpecularColor ,
  getRoughness ,
  getMetalness ,
  getTransmission ,
  getIOR ,
}
/* No side effect */
