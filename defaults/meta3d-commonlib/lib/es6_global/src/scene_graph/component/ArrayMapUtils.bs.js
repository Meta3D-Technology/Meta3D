

import * as ArraySt$Meta3dCommonlib from "../../structure/ArraySt.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "../../structure/sparse_map/MutableSparseMap.bs.js";
import * as DisposeComponentUtils$Meta3dCommonlib from "../DisposeComponentUtils.bs.js";

function addValue(map, key, value) {
  var arr = MutableSparseMap$Meta3dCommonlib.get(map, key);
  if (arr !== undefined) {
    return MutableSparseMap$Meta3dCommonlib.set(map, key, ArraySt$Meta3dCommonlib.push(arr, value));
  } else {
    return MutableSparseMap$Meta3dCommonlib.set(map, key, [value]);
  }
}

function removeValue(map, isDebug, key, value) {
  var match = MutableSparseMap$Meta3dCommonlib.fastGet(map, key);
  if (match[0]) {
    DisposeComponentUtils$Meta3dCommonlib.removeFromArray(match[1], isDebug, value);
    return map;
  } else {
    return map;
  }
}

function batchRemoveValueArr(map, key, valueArr) {
  var match = MutableSparseMap$Meta3dCommonlib.fastGet(map, key);
  if (match[0]) {
    return MutableSparseMap$Meta3dCommonlib.set(map, key, DisposeComponentUtils$Meta3dCommonlib.batchRemoveFromArray(match[1], valueArr));
  } else {
    return map;
  }
}

export {
  addValue ,
  removeValue ,
  batchRemoveValueArr ,
}
/* No side effect */
