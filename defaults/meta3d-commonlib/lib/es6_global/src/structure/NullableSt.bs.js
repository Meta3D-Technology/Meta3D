

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Js_null_undefined from "../../../../../../node_modules/rescript/lib/es6/js_null_undefined.js";
import * as OptionSt$Meta3dCommonlib from "./OptionSt.bs.js";

function getExn(data) {
  return OptionSt$Meta3dCommonlib.getExn(OptionSt$Meta3dCommonlib.fromNullable(data));
}

function $$return(data) {
  return data;
}

function getWithDefault(nullableData, $$default) {
  return OptionSt$Meta3dCommonlib.getWithDefault(OptionSt$Meta3dCommonlib.fromNullable(nullableData), $$default);
}

function bind(nullableData, func) {
  return OptionSt$Meta3dCommonlib.toNullable(OptionSt$Meta3dCommonlib.bind(OptionSt$Meta3dCommonlib.fromNullable(nullableData), (function (val) {
                    return OptionSt$Meta3dCommonlib.fromNullable(Curry._1(func, val));
                  })));
}

var map = Js_null_undefined.bind;

export {
  getExn ,
  $$return ,
  getWithDefault ,
  map ,
  bind ,
  
}
/* No side effect */
