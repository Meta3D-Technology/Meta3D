'use strict';

var TypeArrayUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/TypeArrayUtils.bs.js");
var BufferPBRMaterialUtils$Meta3dComponentWorkerUtils = require("./BufferPBRMaterialUtils.bs.js");

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

exports.getDiffuseColor = getDiffuseColor;
exports.getSpecular = getSpecular;
exports.getSpecularColor = getSpecularColor;
exports.getRoughness = getRoughness;
exports.getMetalness = getMetalness;
exports.getTransmission = getTransmission;
exports.getIOR = getIOR;
/* No side effect */
