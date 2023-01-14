'use strict';

var Log$Meta3dCommonlib = require("../log/Log.bs.js");
var ArraySt$Meta3dCommonlib = require("../structure/ArraySt.bs.js");
var Contract$Meta3dCommonlib = require("../contract/Contract.bs.js");

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

exports._isNotNeedDispose = _isNotNeedDispose;
exports.checkShouldNeedDisposed = checkShouldNeedDisposed;
/* No side effect */
