'use strict';

var Js_typed_array = require("rescript/lib/js/js_typed_array.js");

function copyFloat32ArrayWithEndIndex(typeArr, endIndex) {
  return Js_typed_array.$$Float32Array.slice(0, endIndex, typeArr);
}

exports.copyFloat32ArrayWithEndIndex = copyFloat32ArrayWithEndIndex;
/* No side effect */
