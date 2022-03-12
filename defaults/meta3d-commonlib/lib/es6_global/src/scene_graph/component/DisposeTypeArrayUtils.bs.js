

import * as Caml_array from "./../../../../../../rescript/lib/es6/caml_array.js";

function deleteAndResetFloat32TypeArr(sourceIndex, length, defaultValueArr, typeArr) {
  for(var i = 0; i < length; ++i){
    typeArr[sourceIndex + i | 0] = Caml_array.get(defaultValueArr, i);
  }
  return typeArr;
}

export {
  deleteAndResetFloat32TypeArr ,
  
}
/* No side effect */
