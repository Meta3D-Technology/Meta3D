

import * as ArraySt$Meta3dCommonlib from "../structure/ArraySt.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "../structure/sparse_map/MutableSparseMap.bs.js";

function addValue(map, key, value) {
  var arr = MutableSparseMap$Meta3dCommonlib.get(map, key);
  if (arr !== undefined) {
    return MutableSparseMap$Meta3dCommonlib.set(map, key, ArraySt$Meta3dCommonlib.push(arr, value));
  } else {
    return MutableSparseMap$Meta3dCommonlib.set(map, key, [value]);
  }
}

export {
  addValue ,
  
}
/* No side effect */
