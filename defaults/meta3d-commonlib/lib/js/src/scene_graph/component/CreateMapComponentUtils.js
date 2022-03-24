'use strict';

var MutableSparseMap$Meta3dCommonlib = require("../../structure/sparse_map/MutableSparseMap.js");

function createEmptyMap(componentCount) {
  return MutableSparseMap$Meta3dCommonlib.createEmpty(componentCount, undefined);
}

exports.createEmptyMap = createEmptyMap;
/* No side effect */
