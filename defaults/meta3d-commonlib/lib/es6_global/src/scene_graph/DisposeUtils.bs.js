

import * as Js_array from "./../../../../../rescript/lib/es6/js_array.js";
import * as Log$Meta3dCommonlib from "../log/Log.bs.js";
import * as ArraySt$Meta3dCommonlib from "../structure/ArraySt.bs.js";
import * as Contract$Meta3dCommonlib from "../contract/Contract.bs.js";

function _isNotNeedDispose(target, needDisposedIndexArray) {
  return !Js_array.includes(target, needDisposedIndexArray);
}

function checkShouldNeedDisposed(isDebug, targetName, targets, needDisposedTargetArray) {
  Contract$Meta3dCommonlib.requireCheck((function (param) {
          Contract$Meta3dCommonlib.test(Log$Meta3dCommonlib.buildAssertMessage("" + targetName + " should need disposed", "not"), (function (param) {
                  return Contract$Meta3dCommonlib.assertFalse(ArraySt$Meta3dCommonlib.reduceOneParam(targets, (function (isNotNeedDispose, target) {
                                    if (isNotNeedDispose) {
                                      return true;
                                    } else {
                                      return !Js_array.includes(target, needDisposedTargetArray);
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
