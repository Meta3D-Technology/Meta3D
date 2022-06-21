'use strict';

var ArraySt$Meta3dCommonlib = require("../structure/ArraySt.bs.js");

function buildCountRange(count) {
  return ArraySt$Meta3dCommonlib.range(0, count - 1 | 0);
}

exports.buildCountRange = buildCountRange;
/* No side effect */
