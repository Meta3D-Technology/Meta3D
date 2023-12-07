'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var Js_null_undefined = require("rescript/lib/js/js_null_undefined.js");
var OptionSt$Meta3dCommonlib = require("../../../structure/OptionSt.bs.js");

function getExn(val) {
  return OptionSt$Meta3dCommonlib.getExn((val == null) ? undefined : Caml_option.some(val));
}

function map(val, func) {
  return Js_null_undefined.bind(val, Curry.__1(func));
}

exports.getExn = getExn;
exports.map = map;
/* No side effect */
