

import * as Log$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Exception$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as Index$Meta3dComponentPbrmaterialWorkerProtocol from "./../../../../../../node_modules/meta3d-component-pbrmaterial-worker-protocol/lib/es6_global/src/Index.bs.js";
import * as OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils from "./../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/pbrmaterial/OperateTypeArrayPBRMaterialUtils.bs.js";

function getData(state, material, dataName) {
  if (dataName === Index$Meta3dComponentPbrmaterialWorkerProtocol.dataName.diffuseColor) {
    return OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils.getDiffuseColor(material, state.diffuseColors);
  } else if (dataName === Index$Meta3dComponentPbrmaterialWorkerProtocol.dataName.specular) {
    return OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils.getSpecular(material, state.speculars);
  } else {
    return Exception$Meta3dCommonlib.throwErr(Log$Meta3dCommonlib.buildFatalMessage("getData", "unknown dataName:" + dataName, "", "", ""));
  }
}

export {
  getData ,
  
}
/* No side effect */
