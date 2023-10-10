

import * as Log$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Exception$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";
import * as Index$Meta3dComponentPbrmaterialProtocol from "../../../../../../node_modules/meta3d-component-pbrmaterial-protocol/lib/es6_global/src/Index.bs.js";
import * as OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial from "../utils/OperateTypeArrayPBRMaterialUtils.bs.js";

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
  if (param$1 === Index$Meta3dComponentPbrmaterialProtocol.dataName.diffuseColor) {
    OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setDiffuseColor(param, param$2, diffuseColors);
  } else if (param$1 === Index$Meta3dComponentPbrmaterialProtocol.dataName.specular) {
    OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setSpecular(param, param$2, speculars);
  } else if (param$1 === Index$Meta3dComponentPbrmaterialProtocol.dataName.specularColor) {
    OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setSpecularColor(param, param$2, specularColors);
  } else if (param$1 === Index$Meta3dComponentPbrmaterialProtocol.dataName.roughness) {
    OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setRoughness(param, param$2, roughnesses);
  } else if (param$1 === Index$Meta3dComponentPbrmaterialProtocol.dataName.metalness) {
    OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setMetalness(param, param$2, metalnesses);
  } else if (param$1 === Index$Meta3dComponentPbrmaterialProtocol.dataName.transmission) {
    OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setTransmission(param, param$2, transmissions);
  } else if (param$1 === Index$Meta3dComponentPbrmaterialProtocol.dataName.ior) {
    OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setIOR(param, param$2, iors);
  } else if (param$1 === Index$Meta3dComponentPbrmaterialProtocol.dataName.diffuseMap) {
    MutableSparseMap$Meta3dCommonlib.set(diffuseMap, param, param$2);
  } else if (param$1 === Index$Meta3dComponentPbrmaterialProtocol.dataName.roughnessMap) {
    MutableSparseMap$Meta3dCommonlib.set(roughnessMap, param, param$2);
  } else if (param$1 === Index$Meta3dComponentPbrmaterialProtocol.dataName.metalnessMap) {
    MutableSparseMap$Meta3dCommonlib.set(metalnessMap, param, param$2);
  } else if (param$1 === Index$Meta3dComponentPbrmaterialProtocol.dataName.normalMap) {
    MutableSparseMap$Meta3dCommonlib.set(normalMap, param, param$2);
  } else {
    Exception$Meta3dCommonlib.throwErr(Log$Meta3dCommonlib.buildFatalMessage("setData", "unknown dataName:" + param$1 + "", "", "", ""));
  }
  return state;
}

export {
  setData ,
}
/* No side effect */
