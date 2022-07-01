'use strict';

var FloatTool$Meta3dCommonlib = require("./FloatTool.bs.js");

function truncate(param) {
  return [
          FloatTool$Meta3dCommonlib.truncateFloatValue(param[0], 5),
          FloatTool$Meta3dCommonlib.truncateFloatValue(param[1], 5),
          FloatTool$Meta3dCommonlib.truncateFloatValue(param[2], 5)
        ];
}

exports.truncate = truncate;
/* No side effect */
