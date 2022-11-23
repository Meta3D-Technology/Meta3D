'use strict';

var TypeArrayUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/TypeArrayUtils.bs.js");
var BufferPBRMaterialUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/pbrmaterial/BufferPBRMaterialUtils.bs.js");

function setDiffuseColor(index, data, typeArr) {
  TypeArrayUtils$Meta3dCommonlib.setFloat3(BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getDiffuseColorIndex(index), data, typeArr);
}

function setSpecular(index, data, typeArr) {
  TypeArrayUtils$Meta3dCommonlib.setFloat1(BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getSpecularIndex(index), data, typeArr);
}

function setSpecularColor(index, data, typeArr) {
  TypeArrayUtils$Meta3dCommonlib.setFloat3(BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getSpecularColorIndex(index), data, typeArr);
}

function setRoughness(index, data, typeArr) {
  TypeArrayUtils$Meta3dCommonlib.setFloat1(BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getRoughnessIndex(index), data, typeArr);
}

function setMetalness(index, data, typeArr) {
  TypeArrayUtils$Meta3dCommonlib.setFloat1(BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getMetalnessIndex(index), data, typeArr);
}

function setTransmission(index, data, typeArr) {
  TypeArrayUtils$Meta3dCommonlib.setFloat1(BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getTransmissionIndex(index), data, typeArr);
}

function setIOR(index, data, typeArr) {
  TypeArrayUtils$Meta3dCommonlib.setFloat1(BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getIORIndex(index), data, typeArr);
}

exports.setDiffuseColor = setDiffuseColor;
exports.setSpecular = setSpecular;
exports.setSpecularColor = setSpecularColor;
exports.setRoughness = setRoughness;
exports.setMetalness = setMetalness;
exports.setTransmission = setTransmission;
exports.setIOR = setIOR;
/* No side effect */
