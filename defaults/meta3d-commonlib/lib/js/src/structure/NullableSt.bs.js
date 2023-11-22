'use strict';

var Js_null_undefined = require("rescript/lib/js/js_null_undefined.js");
var OptionSt$Meta3dCommonlib = require("./OptionSt.bs.js");

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
                    return OptionSt$Meta3dCommonlib.fromNullable(func(val));
                  })));
}

function isNullable(prim) {
  return prim == null;
}

function getEmpty(param) {
  
}

var map = Js_null_undefined.bind;

exports.getExn = getExn;
exports.$$return = $$return;
exports.getWithDefault = getWithDefault;
exports.map = map;
exports.bind = bind;
exports.isNullable = isNullable;
exports.getEmpty = getEmpty;
/* No side effect */
