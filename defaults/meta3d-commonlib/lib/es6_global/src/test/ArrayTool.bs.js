

import * as Js_array from "./../../../../../rescript/lib/es6/js_array.js";
import * as FloatTool$Meta3dCommonlib from "./FloatTool.bs.js";

function truncate(arr) {
  return Js_array.map((function (__x) {
                return FloatTool$Meta3dCommonlib.truncateFloatValue(__x, 5);
              }), arr);
}

export {
  truncate ,
}
/* No side effect */
