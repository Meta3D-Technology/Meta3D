

import * as Log$Meta3dCommonlib from "../log/Log.bs.js";
import * as ArraySt$Meta3dCommonlib from "../structure/ArraySt.bs.js";
import * as Contract$Meta3dCommonlib from "../contract/Contract.bs.js";

function _isNotNeedDispose(target, needDisposedIndexArray) {
  return !needDisposedIndexArray.includes(target);
}

function checkShouldNeedDisposed(isDebug, targetName, targets, needDisposedTargetArray) {
  return Contract$Meta3dCommonlib.requireCheck((function (param) {
                return Contract$Meta3dCommonlib.test(Log$Meta3dCommonlib.buildAssertMessage(targetName + " should need disposed", "not"), (function (param) {
                              return Contract$Meta3dCommonlib.assertFalse(ArraySt$Meta3dCommonlib.reduceOneParam(targets, (function (isNotNeedDispose, target) {
                                                if (isNotNeedDispose) {
                                                  return true;
                                                } else {
                                                  return !needDisposedTargetArray.includes(target);
                                                }
                                              }), false));
                            }));
              }), isDebug);
}

export {
  _isNotNeedDispose ,
  checkShouldNeedDisposed ,
  
}
/* No side effect */
