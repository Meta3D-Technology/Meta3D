'use strict';

var ListSt$Meta3dCommonlib = require("./ListSt.bs.js");
var Result$Meta3dCommonlib = require("./Result.bs.js");

function mergeResults(resultList) {
  return ListSt$Meta3dCommonlib.reduce(resultList, Result$Meta3dCommonlib.succeed(undefined), (function (mergedResult, result) {
                return Result$Meta3dCommonlib.bind(mergedResult, (function (param) {
                              return result;
                            }));
              }));
}

exports.mergeResults = mergeResults;
/* No side effect */
