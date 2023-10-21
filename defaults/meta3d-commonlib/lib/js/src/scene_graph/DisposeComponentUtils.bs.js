'use strict';

var Js_array = require("rescript/lib/js/js_array.js");
var ArraySt$Meta3dCommonlib = require("../structure/ArraySt.bs.js");

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

exports.removeFromArray = removeFromArray;
exports.batchRemoveFromArray = batchRemoveFromArray;
/* No side effect */
