

import * as Curry from "../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Js_math from "../../../../../../../../../../node_modules/rescript/lib/es6/js_math.js";

function generateUniqueKey(random) {
  return Js_math.floor_int(Curry._1(random, undefined) * 1000000.0).toString();
}

export {
  generateUniqueKey ,
}
/* No side effect */
