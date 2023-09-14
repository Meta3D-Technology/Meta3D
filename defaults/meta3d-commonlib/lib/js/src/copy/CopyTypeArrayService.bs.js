'use strict';

var Js_typed_array = require("rescript/lib/js/js_typed_array.js");
var MutableSparseMap$Meta3dCommonlib = require("../structure/sparse_map/MutableSparseMap.bs.js");

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

exports.copyFloat32ArrayWithEndIndex = copyFloat32ArrayWithEndIndex;
exports.copyUint32ArrayWithEndIndex = copyUint32ArrayWithEndIndex;
exports.deepCopyMutableSparseMapOfArray = deepCopyMutableSparseMapOfArray;
/* No side effect */
