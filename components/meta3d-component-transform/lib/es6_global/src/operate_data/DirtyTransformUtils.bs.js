

import * as Log$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Contract$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/contract/Contract.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";
import * as ConfigUtils$Meta3dComponentTransform from "../config/ConfigUtils.bs.js";

function mark(state, transform, isDirty) {
  MutableSparseMap$Meta3dCommonlib.set(state.dirtyMap, transform, isDirty);
  return state;
}

function isDirty(state, transform) {
  return MutableSparseMap$Meta3dCommonlib.unsafeGet(state.dirtyMap, transform) === Contract$Meta3dCommonlib.ensureCheck(true, (function (isDirty) {
                return Contract$Meta3dCommonlib.test(Log$Meta3dCommonlib.buildAssertMessage("return bool", "not"), (function (param) {
                              return Contract$Meta3dCommonlib.assertIsBool(isDirty);
                            }));
              }), ConfigUtils$Meta3dComponentTransform.getIsDebug(state));
}

export {
  mark ,
  isDirty ,
  
}
/* No side effect */
