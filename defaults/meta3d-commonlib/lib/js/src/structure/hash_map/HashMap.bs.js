'use strict';

var Js_dict = require("rescript/lib/js/js_dict.js");
var Js_array = require("rescript/lib/js/js_array.js");
var Belt_Array = require("rescript/lib/js/belt_Array.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var Js_null_undefined = require("rescript/lib/js/js_null_undefined.js");
var NullUtils$Meta3dCommonlib = require("../utils/NullUtils.bs.js");

function createEmpty(hintSizeOpt, param) {
  return {};
}

function unsafeGet(map, key) {
  return map[key];
}

function get(map, key) {
  var value = map[key];
  if (NullUtils$Meta3dCommonlib.isEmpty(value)) {
    return ;
  } else {
    return Caml_option.some(value);
  }
}

var _getExn = ((nullableData) => {
  if (nullableData !== undefined) {
    return nullableData;
  }

  throw new Error("Not_found")
});

function getExn(map, key) {
  return _getExn(map[key]);
}

function getNullable(map, key) {
  return Js_null_undefined.fromOption(get(map, key));
}

function has(map, key) {
  return !NullUtils$Meta3dCommonlib.isEmpty(map[key]);
}

var entries = Js_dict.entries;

function _mutableSet(map, key, value) {
  map[key] = value;
  return map;
}

function _createEmpty(param) {
  return {};
}

function _reduceArray(arr, func, param) {
  return Belt_Array.reduceU(arr, param, func);
}

function copy(map) {
  return Belt_Array.reduceU(Js_dict.entries(map), {}, (function (newMap, param) {
                return _mutableSet(newMap, param[0], param[1]);
              }));
}

function getValidValues(map) {
  var __x = Js_dict.values(map);
  return Js_array.filter(NullUtils$Meta3dCommonlib.isInMap, __x);
}

function map(map$1, func) {
  return Js_dict.map(func, map$1);
}

function merge(sourceMap, targetMap) {
  return Belt_Array.reduceU(Js_dict.entries(sourceMap), targetMap, (function (targetMap, param) {
                return _mutableSet(targetMap, param[0], param[1]);
              }));
}

exports.createEmpty = createEmpty;
exports.unsafeGet = unsafeGet;
exports.get = get;
exports._getExn = _getExn;
exports.getExn = getExn;
exports.getNullable = getNullable;
exports.has = has;
exports.entries = entries;
exports._mutableSet = _mutableSet;
exports._createEmpty = _createEmpty;
exports._reduceArray = _reduceArray;
exports.copy = copy;
exports.getValidValues = getValidValues;
exports.map = map;
exports.merge = merge;
/* No side effect */
