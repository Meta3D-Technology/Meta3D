

import * as FloatTool$Meta3dCommonlib from "./FloatTool.bs.js";

function truncate(param) {
  return [
          FloatTool$Meta3dCommonlib.truncateFloatValue(param[0], 5),
          FloatTool$Meta3dCommonlib.truncateFloatValue(param[1], 5),
          FloatTool$Meta3dCommonlib.truncateFloatValue(param[2], 5)
        ];
}

export {
  truncate ,
}
/* No side effect */
