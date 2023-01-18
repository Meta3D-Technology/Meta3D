

import * as FloatTool$Meta3dCommonlib from "./FloatTool.bs.js";

function truncate(arr) {
  return arr.map(function (__x) {
              return FloatTool$Meta3dCommonlib.truncateFloatValue(__x, 5);
            });
}

export {
  truncate ,
  
}
/* No side effect */
