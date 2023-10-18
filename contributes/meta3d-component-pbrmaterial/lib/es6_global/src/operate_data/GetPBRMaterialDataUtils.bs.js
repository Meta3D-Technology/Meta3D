

import * as Log$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as Exception$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";
import * as Index$Meta3dComponentPbrmaterialProtocol from "../../../../../../node_modules/meta3d-component-pbrmaterial-protocol/lib/es6_global/src/Index.bs.js";
import * as OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils from "../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/pbrmaterial/OperateTypeArrayPBRMaterialUtils.bs.js";

function getData(param, param$1, param$2) {
  var diffuseColors = param.diffuseColors;
  var speculars = param.speculars;
  var specularColors = param.specularColors;
  var roughnesses = param.roughnesses;
  var metalnesses = param.metalnesses;
  var transmissions = param.transmissions;
  var iors = param.iors;
  var normalMap = param.normalMap;
  var metalnessMap = param.metalnessMap;
  var roughnessMap = param.roughnessMap;
  var diffuseMap = param.diffuseMap;
  if (param$2 === Index$Meta3dComponentPbrmaterialProtocol.dataName.diffuseColor) {
    return OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils.getDiffuseColor(param$1, diffuseColors);
  } else if (param$2 === Index$Meta3dComponentPbrmaterialProtocol.dataName.specular) {
    return OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils.getSpecular(param$1, speculars);
  } else if (param$2 === Index$Meta3dComponentPbrmaterialProtocol.dataName.specularColor) {
    return OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils.getSpecularColor(param$1, specularColors);
  } else if (param$2 === Index$Meta3dComponentPbrmaterialProtocol.dataName.roughness) {
    return OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils.getRoughness(param$1, roughnesses);
  } else if (param$2 === Index$Meta3dComponentPbrmaterialProtocol.dataName.metalness) {
    return OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils.getMetalness(param$1, metalnesses);
  } else if (param$2 === Index$Meta3dComponentPbrmaterialProtocol.dataName.transmission) {
    return OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils.getTransmission(param$1, transmissions);
  } else if (param$2 === Index$Meta3dComponentPbrmaterialProtocol.dataName.ior) {
    return OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils.getIOR(param$1, iors);
  } else if (param$2 === Index$Meta3dComponentPbrmaterialProtocol.dataName.diffuseMap) {
    return OptionSt$Meta3dCommonlib.toNullable(MutableSparseMap$Meta3dCommonlib.get(diffuseMap, param$1));
  } else if (param$2 === Index$Meta3dComponentPbrmaterialProtocol.dataName.roughnessMap) {
    return OptionSt$Meta3dCommonlib.toNullable(MutableSparseMap$Meta3dCommonlib.get(roughnessMap, param$1));
  } else if (param$2 === Index$Meta3dComponentPbrmaterialProtocol.dataName.metalnessMap) {
    return OptionSt$Meta3dCommonlib.toNullable(MutableSparseMap$Meta3dCommonlib.get(metalnessMap, param$1));
  } else if (param$2 === Index$Meta3dComponentPbrmaterialProtocol.dataName.normalMap) {
    return OptionSt$Meta3dCommonlib.toNullable(MutableSparseMap$Meta3dCommonlib.get(normalMap, param$1));
  } else {
    return Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildFatalMessage("getData", "unknown dataName:" + param$2 + "", "", "", "")));
  }
}

export {
  getData ,
}
/* No side effect */
