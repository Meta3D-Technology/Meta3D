

import * as Js_typed_array from "./../../../../../../node_modules/rescript/lib/es6/js_typed_array.js";

function copyFloat32ArrayWithEndIndex(typeArr, endIndex) {
  return Js_typed_array.$$Float32Array.slice(0, endIndex, typeArr);
}

export {
  copyFloat32ArrayWithEndIndex ,
}
/* No side effect */
