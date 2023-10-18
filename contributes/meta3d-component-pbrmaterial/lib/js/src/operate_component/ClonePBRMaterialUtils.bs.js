'use strict';

var Js_array = require("rescript/lib/js/js_array.js");
var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");
var CloneUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/CloneUtils.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");
var CreatePBRMaterialUtils$Meta3dComponentPbrmaterial = require("./CreatePBRMaterialUtils.bs.js");
var OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial = require("../utils/OperateTypeArrayPBRMaterialUtils.bs.js");
var OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/pbrmaterial/OperateTypeArrayPBRMaterialUtils.bs.js");

function _setData(state) {
  var diffuseColors = state.diffuseColors;
  var speculars = state.speculars;
  var specularColors = state.specularColors;
  var roughnesses = state.roughnesses;
  var metalnesses = state.metalnesses;
  var transmissions = state.transmissions;
  var iors = state.iors;
  var normalMap = state.normalMap;
  var metalnessMap = state.metalnessMap;
  var roughnessMap = state.roughnessMap;
  var diffuseMap = state.diffuseMap;
  return function (clonedMaterial, param) {
    var specular = param[1];
    OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setDiffuseColor(clonedMaterial, param[0], diffuseColors);
    OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setSpecular(clonedMaterial, specular, speculars);
    OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setSpecularColor(clonedMaterial, specular, specularColors);
    OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setRoughness(clonedMaterial, specular, roughnesses);
    OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setMetalness(clonedMaterial, specular, metalnesses);
    OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setTransmission(clonedMaterial, specular, transmissions);
    OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setIOR(clonedMaterial, specular, iors);
    OptionSt$Meta3dCommonlib.map(param[7], (function (diffuseTexture) {
            return MutableSparseMap$Meta3dCommonlib.set(diffuseMap, clonedMaterial, diffuseTexture);
          }));
    OptionSt$Meta3dCommonlib.map(param[8], (function (roughnessTexture) {
            return MutableSparseMap$Meta3dCommonlib.set(roughnessMap, clonedMaterial, roughnessTexture);
          }));
    OptionSt$Meta3dCommonlib.map(param[9], (function (metalnessTexture) {
            return MutableSparseMap$Meta3dCommonlib.set(metalnessMap, clonedMaterial, metalnessTexture);
          }));
    OptionSt$Meta3dCommonlib.map(param[10], (function (normalTexture) {
            return MutableSparseMap$Meta3dCommonlib.set(normalMap, clonedMaterial, normalTexture);
          }));
    return state;
  };
}

function _getData(state) {
  var diffuseColors = state.diffuseColors;
  var speculars = state.speculars;
  var specularColors = state.specularColors;
  var roughnesses = state.roughnesses;
  var metalnesses = state.metalnesses;
  var transmissions = state.transmissions;
  var iors = state.iors;
  var normalMap = state.normalMap;
  var metalnessMap = state.metalnessMap;
  var roughnessMap = state.roughnessMap;
  var diffuseMap = state.diffuseMap;
  return function (sourceMaterial) {
    return [
            OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils.getDiffuseColor(sourceMaterial, diffuseColors),
            OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils.getSpecular(sourceMaterial, speculars),
            OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils.getSpecularColor(sourceMaterial, specularColors),
            OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils.getRoughness(sourceMaterial, roughnesses),
            OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils.getMetalness(sourceMaterial, metalnesses),
            OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils.getTransmission(sourceMaterial, transmissions),
            OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils.getIOR(sourceMaterial, iors),
            MutableSparseMap$Meta3dCommonlib.get(diffuseMap, sourceMaterial),
            MutableSparseMap$Meta3dCommonlib.get(roughnessMap, sourceMaterial),
            MutableSparseMap$Meta3dCommonlib.get(metalnessMap, sourceMaterial),
            MutableSparseMap$Meta3dCommonlib.get(normalMap, sourceMaterial)
          ];
  };
}

function _handleShareMaterial(state, sourceMaterial, countRange) {
  return [
          state,
          Js_array.map((function (param) {
                  return sourceMaterial;
                }), countRange)
        ];
}

function _handleNotShareMaterial(state, sourceMaterial, countRange) {
  return CloneUtils$Meta3dCommonlib.clone(state, [
              CreatePBRMaterialUtils$Meta3dComponentPbrmaterial.create,
              _getData,
              _setData
            ], countRange, sourceMaterial);
}

function clone(state, countRange, param, sourceMaterial) {
  if (param.isShare) {
    return _handleShareMaterial(state, sourceMaterial, countRange);
  } else {
    return _handleNotShareMaterial(state, sourceMaterial, countRange);
  }
}

exports._setData = _setData;
exports._getData = _getData;
exports._handleShareMaterial = _handleShareMaterial;
exports._handleNotShareMaterial = _handleNotShareMaterial;
exports.clone = clone;
/* No side effect */
