'use strict';

var Log$Meta3dCommonlib = require("../../log/Log.bs.js");
var Contract$Meta3dCommonlib = require("../../contract/Contract.bs.js");

function checkNotExceedMaxCountByIndex(isDebug, index, maxCount) {
  return Contract$Meta3dCommonlib.ensureCheck(index, (function (index) {
                var maxIndex = maxCount - 1 | 0;
                Contract$Meta3dCommonlib.test(Log$Meta3dCommonlib.buildAssertMessage("index: " + index + " <= maxIndex: " + maxIndex, "not"), (function (param) {
                        return Contract$Meta3dCommonlib.Operators.$less$eq(index, maxIndex);
                      }));
              }), isDebug);
}

exports.checkNotExceedMaxCountByIndex = checkNotExceedMaxCountByIndex;
/* No side effect */
