'use strict';

var Caml_array = require("rescript/lib/js/caml_array.js");

function deleteAndResetFloat32TypeArr(sourceIndex, length, defaultValueArr, typeArr) {
  for(var i = 0; i < length; ++i){
    typeArr[sourceIndex + i | 0] = Caml_array.get(defaultValueArr, i);
  }
  return typeArr;
}

exports.deleteAndResetFloat32TypeArr = deleteAndResetFloat32TypeArr;
/* No side effect */
