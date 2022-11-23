'use strict';

var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");

function getAll(state) {
  return ArraySt$Meta3dCommonlib.range(0, state.maxUID - 1 | 0);
}

exports.getAll = getAll;
/* No side effect */
