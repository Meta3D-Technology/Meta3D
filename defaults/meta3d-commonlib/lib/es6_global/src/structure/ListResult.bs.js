

import * as ListSt$Meta3dCommonlib from "./ListSt.bs.js";
import * as Result$Meta3dCommonlib from "./Result.bs.js";

function mergeResults(resultList) {
  return ListSt$Meta3dCommonlib.reduce(resultList, Result$Meta3dCommonlib.succeed(undefined), (function (mergedResult, result) {
                return Result$Meta3dCommonlib.bind(mergedResult, (function (param) {
                              return result;
                            }));
              }));
}

export {
  mergeResults ,
}
/* No side effect */
