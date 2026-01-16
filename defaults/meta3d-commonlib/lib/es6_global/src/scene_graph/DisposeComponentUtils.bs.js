

import * as Js_array from "./../../../../../rescript/lib/es6/js_array.js";
import * as ArraySt$Meta3dCommonlib from "../structure/ArraySt.bs.js";

function removeFromArray(arr, isDebug, target) {
  var index = Js_array.indexOf(target, arr);
  if (index === -1) {
    return arr;
  }
  var lastIndex = arr.length - 1 | 0;
  ArraySt$Meta3dCommonlib.deleteBySwap(arr, isDebug, index, lastIndex);
  return arr;
}

function batchRemoveFromArray(arr, targets) {
  return Js_array.filter((function (value) {
                return !Js_array.includes(value, targets);
              }), arr);
}

export {
  removeFromArray ,
  batchRemoveFromArray ,
}
/* No side effect */
