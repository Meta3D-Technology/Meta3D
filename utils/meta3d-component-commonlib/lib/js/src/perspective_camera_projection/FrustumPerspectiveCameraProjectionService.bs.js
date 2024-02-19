'use strict';

var NumberUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/NumberUtils.bs.js");

function computeAspect(param) {
  return NumberUtils$Meta3dCommonlib.dividInt(param[0], param[1]);
}

exports.computeAspect = computeAspect;
/* No side effect */
