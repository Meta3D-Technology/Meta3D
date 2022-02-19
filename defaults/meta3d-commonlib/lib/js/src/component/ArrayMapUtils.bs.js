'use strict';

var ArraySt$Meta3dCommonlib = require("../structure/ArraySt.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("../structure/sparse_map/MutableSparseMap.bs.js");

function addValue(map, key, value) {
  var arr = MutableSparseMap$Meta3dCommonlib.get(map, key);
  if (arr !== undefined) {
    return MutableSparseMap$Meta3dCommonlib.set(map, key, ArraySt$Meta3dCommonlib.push(arr, value));
  } else {
    return MutableSparseMap$Meta3dCommonlib.set(map, key, [value]);
  }
}

exports.addValue = addValue;
/* No side effect */
