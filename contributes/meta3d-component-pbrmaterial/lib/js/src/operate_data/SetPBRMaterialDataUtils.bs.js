'use strict';

var Caml_obj = require("rescript/lib/js/caml_obj.js");
var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var Exception$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Exception.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");
var ImmutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/ImmutableSparseMap.bs.js");
var Index$Meta3dComponentPbrmaterialProtocol = require("meta3d-component-pbrmaterial-protocol/lib/js/src/Index.bs.js");
var OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial = require("../utils/OperateTypeArrayPBRMaterialUtils.bs.js");

function setName(state, material, name) {
  var newrecord = Caml_obj.obj_dup(state);
  newrecord.names = ImmutableSparseMap$Meta3dCommonlib.set(state.names, material, name);
  return newrecord;
}

function setData(state, param, param$1, param$2) {
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
  if (param$1 === Index$Meta3dComponentPbrmaterialProtocol.dataName.name) {
    return setName(state, param, param$2);
  } else if (param$1 === Index$Meta3dComponentPbrmaterialProtocol.dataName.diffuseColor) {
    OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setDiffuseColor(param, param$2, diffuseColors);
    return state;
  } else if (param$1 === Index$Meta3dComponentPbrmaterialProtocol.dataName.specular) {
    OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setSpecular(param, param$2, speculars);
    return state;
  } else if (param$1 === Index$Meta3dComponentPbrmaterialProtocol.dataName.specularColor) {
    OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setSpecularColor(param, param$2, specularColors);
    return state;
  } else if (param$1 === Index$Meta3dComponentPbrmaterialProtocol.dataName.roughness) {
    OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setRoughness(param, param$2, roughnesses);
    return state;
  } else if (param$1 === Index$Meta3dComponentPbrmaterialProtocol.dataName.metalness) {
    OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setMetalness(param, param$2, metalnesses);
    return state;
  } else if (param$1 === Index$Meta3dComponentPbrmaterialProtocol.dataName.transmission) {
    OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setTransmission(param, param$2, transmissions);
    return state;
  } else if (param$1 === Index$Meta3dComponentPbrmaterialProtocol.dataName.ior) {
    OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setIOR(param, param$2, iors);
    return state;
  } else if (param$1 === Index$Meta3dComponentPbrmaterialProtocol.dataName.diffuseMap) {
    MutableSparseMap$Meta3dCommonlib.set(diffuseMap, param, param$2);
    return state;
  } else if (param$1 === Index$Meta3dComponentPbrmaterialProtocol.dataName.roughnessMap) {
    MutableSparseMap$Meta3dCommonlib.set(roughnessMap, param, param$2);
    return state;
  } else if (param$1 === Index$Meta3dComponentPbrmaterialProtocol.dataName.metalnessMap) {
    MutableSparseMap$Meta3dCommonlib.set(metalnessMap, param, param$2);
    return state;
  } else if (param$1 === Index$Meta3dComponentPbrmaterialProtocol.dataName.normalMap) {
    MutableSparseMap$Meta3dCommonlib.set(normalMap, param, param$2);
    return state;
  } else {
    return Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildFatalMessage("setData", "unknown dataName:" + param$1 + "", "", "", "")));
  }
}

exports.setName = setName;
exports.setData = setData;
/* No side effect */
