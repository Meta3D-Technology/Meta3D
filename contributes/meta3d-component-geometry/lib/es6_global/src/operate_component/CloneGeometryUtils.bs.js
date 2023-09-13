

import * as Js_array from "./../../../../../rescript/lib/es6/js_array.js";

function clone(state, countRange, sourceGeometry) {
  return [
          state,
          Js_array.map((function (param) {
                  return sourceGeometry;
                }), countRange)
        ];
}

export {
  clone ,
}
/* No side effect */
