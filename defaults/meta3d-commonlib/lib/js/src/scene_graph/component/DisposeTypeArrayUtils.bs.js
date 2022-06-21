'use strict';

var Caml_array = require("rescript/lib/js/caml_array.js");

function deleteAndResetFloat32TypeArr(typeArr, sourceIndex, length, defaultValueArr) {
  for(var i = 0; i < length; ++i){
    typeArr[sourceIndex + i | 0] = Caml_array.get(defaultValueArr, i);
  }
  return typeArr;
}

function deleteAndResetFloat32(typeArr, sourceIndex, defaultValue) {
  typeArr[sourceIndex] = defaultValue;
  return typeArr;
}

exports.deleteAndResetFloat32TypeArr = deleteAndResetFloat32TypeArr;
exports.deleteAndResetFloat32 = deleteAndResetFloat32;
/* No side effect */
