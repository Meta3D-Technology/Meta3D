

import * as Log$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as Exception$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";
import * as ImmutableSparseMap$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/ImmutableSparseMap.bs.js";
import * as Index$Meta3dComponentPbrmaterialProtocol from "../../../../../../../../node_modules/meta3d-component-pbrmaterial-protocol/lib/es6_global/src/Index.bs.js";
import * as OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils from "../../../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/pbrmaterial/OperateTypeArrayPBRMaterialUtils.bs.js";

function getName(state, material) {
  return ImmutableSparseMap$Meta3dCommonlib.getNullable(state.names, material);
}

function getData(state, param, param$1) {
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
    return ImmutableSparseMap$Meta3dCommonlib.getNullable(state.names, param);
  } else if (param$1 === Index$Meta3dComponentPbrmaterialProtocol.dataName.diffuseColor) {
    return OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils.getDiffuseColor(param, diffuseColors);
  } else if (param$1 === Index$Meta3dComponentPbrmaterialProtocol.dataName.specular) {
    return OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils.getSpecular(param, speculars);
  } else if (param$1 === Index$Meta3dComponentPbrmaterialProtocol.dataName.specularColor) {
    return OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils.getSpecularColor(param, specularColors);
  } else if (param$1 === Index$Meta3dComponentPbrmaterialProtocol.dataName.roughness) {
    return OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils.getRoughness(param, roughnesses);
  } else if (param$1 === Index$Meta3dComponentPbrmaterialProtocol.dataName.metalness) {
    return OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils.getMetalness(param, metalnesses);
  } else if (param$1 === Index$Meta3dComponentPbrmaterialProtocol.dataName.transmission) {
    return OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils.getTransmission(param, transmissions);
  } else if (param$1 === Index$Meta3dComponentPbrmaterialProtocol.dataName.ior) {
    return OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils.getIOR(param, iors);
  } else if (param$1 === Index$Meta3dComponentPbrmaterialProtocol.dataName.diffuseMap) {
    return OptionSt$Meta3dCommonlib.toNullable(MutableSparseMap$Meta3dCommonlib.get(diffuseMap, param));
  } else if (param$1 === Index$Meta3dComponentPbrmaterialProtocol.dataName.roughnessMap) {
    return OptionSt$Meta3dCommonlib.toNullable(MutableSparseMap$Meta3dCommonlib.get(roughnessMap, param));
  } else if (param$1 === Index$Meta3dComponentPbrmaterialProtocol.dataName.metalnessMap) {
    return OptionSt$Meta3dCommonlib.toNullable(MutableSparseMap$Meta3dCommonlib.get(metalnessMap, param));
  } else if (param$1 === Index$Meta3dComponentPbrmaterialProtocol.dataName.normalMap) {
    return OptionSt$Meta3dCommonlib.toNullable(MutableSparseMap$Meta3dCommonlib.get(normalMap, param));
  } else {
    return Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildFatalMessage("getData", "unknown dataName:" + param$1 + "", "", "", "")));
  }
}

export {
  getName ,
  getData ,
}
/* No side effect */
