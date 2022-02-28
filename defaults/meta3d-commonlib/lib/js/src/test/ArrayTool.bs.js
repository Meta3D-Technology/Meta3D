'use strict';

var FloatTool$Meta3dCommonlib = require("./FloatTool.bs.js");

function truncate(arr) {
  return arr.map(function (__x) {
              return FloatTool$Meta3dCommonlib.truncateFloatValue(__x, 5);
            });
}

exports.truncate = truncate;
/* No side effect */
