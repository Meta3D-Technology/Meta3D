

import * as Curry from "./../../../../../../../rescript/lib/es6/curry.js";
import * as Caml_option from "./../../../../../../../rescript/lib/es6/caml_option.js";
import * as Js_null_undefined from "./../../../../../../../rescript/lib/es6/js_null_undefined.js";
import * as OptionSt$Meta3dCommonlib from "../../../structure/OptionSt.bs.js";

function getExn(val) {
  return OptionSt$Meta3dCommonlib.getExn((val == null) ? undefined : Caml_option.some(val));
}

function map(val, func) {
  return Js_null_undefined.bind(val, Curry.__1(func));
}

export {
  getExn ,
  map ,
}
/* No side effect */
