'use strict';

var ArraySt$Meta3dCommonlib = require("../structure/ArraySt.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("../structure/sparse_map/MutableSparseMap.bs.js");

function buildSharedBatchDisposeData(components) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(components, (function (dataMap, component) {
                return MutableSparseMap$Meta3dCommonlib.set(dataMap, component, [1]);
              }), MutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined));
}

exports.buildSharedBatchDisposeData = buildSharedBatchDisposeData;
/* No side effect */
