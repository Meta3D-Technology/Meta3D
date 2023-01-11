'use strict';

var Js_array = require("rescript/lib/js/js_array.js");
var FloatTool$Meta3dCommonlib = require("./FloatTool.bs.js");

function truncate(arr) {
  return Js_array.map((function (__x) {
                return FloatTool$Meta3dCommonlib.truncateFloatValue(__x, 5);
              }), arr);
}

exports.truncate = truncate;
/* No side effect */
