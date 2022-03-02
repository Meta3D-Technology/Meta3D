

import * as TypeArrayUtils$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/component/TypeArrayUtils.bs.js";
import * as BufferTransformUtils$Meta3dComponentWorkerUtils from "./BufferTransformUtils.bs.js";

function getLocalToWorldMatrixTypeArray(index, typeArr) {
  return TypeArrayUtils$Meta3dCommonlib.getFloat16TypeArray(BufferTransformUtils$Meta3dComponentWorkerUtils.getLocalToWorldMatrixIndex(index), typeArr);
}

export {
  getLocalToWorldMatrixTypeArray ,
  
}
/* No side effect */
