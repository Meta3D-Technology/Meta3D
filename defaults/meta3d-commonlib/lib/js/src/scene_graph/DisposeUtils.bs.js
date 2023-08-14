'use strict';

var Js_array = require("rescript/lib/js/js_array.js");
var Log$Meta3dCommonlib = require("../log/Log.bs.js");
var ArraySt$Meta3dCommonlib = require("../structure/ArraySt.bs.js");
var Contract$Meta3dCommonlib = require("../contract/Contract.bs.js");

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

exports._isNotNeedDispose = _isNotNeedDispose;
exports.checkShouldNeedDisposed = checkShouldNeedDisposed;
/* No side effect */
