'use strict';

var Js_null_undefined = require("rescript/lib/js/js_null_undefined.js");
var OptionSt$Meta3dCommonlib = require("./OptionSt.bs.js");

function $$return(data) {
  return data;
}

function getWithDefault(nullableData, $$default) {
  return OptionSt$Meta3dCommonlib.getWithDefault(OptionSt$Meta3dCommonlib.fromNullable(nullableData), $$default);
}

var bind = Js_null_undefined.bind;

exports.$$return = $$return;
exports.getWithDefault = getWithDefault;
exports.bind = bind;
/* No side effect */
