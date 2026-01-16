

import * as Js_typed_array from "./../../../../../rescript/lib/es6/js_typed_array.js";
import * as MutableSparseMap$Meta3dCommonlib from "../structure/sparse_map/MutableSparseMap.bs.js";

function copyFloat32ArrayWithEndIndex(typeArr, endIndex) {
  return Js_typed_array.$$Float32Array.slice(0, endIndex, typeArr);
}

function copyUint32ArrayWithEndIndex(typeArr, endIndex) {
  return Js_typed_array.$$Uint32Array.slice(0, endIndex, typeArr);
}

function deepCopyMutableSparseMapOfArray(arr) {
  return MutableSparseMap$Meta3dCommonlib.map(arr, (function (itemArr) {
                return itemArr.slice();
              }));
}

export {
  copyFloat32ArrayWithEndIndex ,
  copyUint32ArrayWithEndIndex ,
  deepCopyMutableSparseMapOfArray ,
}
/* No side effect */
