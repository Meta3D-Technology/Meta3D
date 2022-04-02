

import * as Log$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Exception$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as Index$Meta3dComponentTransformWorkerProtocol from "./../../../../../../node_modules/meta3d-component-transform-worker-protocol/lib/es6_global/src/Index.bs.js";
import * as ModelMatrixTransformUtils$Meta3dComponentWorkerUtils from "./../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/transform/ModelMatrixTransformUtils.bs.js";

function getData(state, transform, dataName) {
  if (dataName === Index$Meta3dComponentTransformWorkerProtocol.dataName.localToWorldMatrix) {
    return ModelMatrixTransformUtils$Meta3dComponentWorkerUtils.getLocalToWorldMatrix(state.localToWorldMatrices, transform);
  } else {
    return Exception$Meta3dCommonlib.throwErr(Log$Meta3dCommonlib.buildFatalMessage("getData", "unknown dataName:" + dataName, "", "", ""));
  }
}

export {
  getData ,
  
}
/* No side effect */
