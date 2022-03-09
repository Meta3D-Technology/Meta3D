

import * as TypeArrayUtils$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/TypeArrayUtils.bs.js";
import * as BufferPBRMaterialUtils$Meta3dComponentWorkerUtils from "./../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/pbrmaterial/BufferPBRMaterialUtils.bs.js";

function setDiffuseColor(index, data, typeArr) {
  return TypeArrayUtils$Meta3dCommonlib.setFloat3(BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getDiffuseColorIndex(index), data, typeArr);
}

function setSpecular(index, data, typeArr) {
  return TypeArrayUtils$Meta3dCommonlib.setFloat1(BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getSpecularIndex(index), data, typeArr);
}

function setSpecularColor(index, data, typeArr) {
  return TypeArrayUtils$Meta3dCommonlib.setFloat3(BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getSpecularColorIndex(index), data, typeArr);
}

function setRoughness(index, data, typeArr) {
  return TypeArrayUtils$Meta3dCommonlib.setFloat1(BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getRoughnessIndex(index), data, typeArr);
}

function setMetalness(index, data, typeArr) {
  return TypeArrayUtils$Meta3dCommonlib.setFloat1(BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getMetalnessIndex(index), data, typeArr);
}

function setTransmission(index, data, typeArr) {
  return TypeArrayUtils$Meta3dCommonlib.setFloat1(BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getTransmissionIndex(index), data, typeArr);
}

function setIOR(index, data, typeArr) {
  return TypeArrayUtils$Meta3dCommonlib.setFloat1(BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getIORIndex(index), data, typeArr);
}

export {
  setDiffuseColor ,
  setSpecular ,
  setSpecularColor ,
  setRoughness ,
  setMetalness ,
  setTransmission ,
  setIOR ,
  
}
/* No side effect */
