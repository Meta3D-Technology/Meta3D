

import * as Caml_array from "./../../../../../../rescript/lib/es6/caml_array.js";

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

export {
  deleteAndResetFloat32TypeArr ,
  deleteAndResetFloat32 ,
}
/* No side effect */
