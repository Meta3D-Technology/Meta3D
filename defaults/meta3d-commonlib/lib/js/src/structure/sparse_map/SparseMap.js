'use strict';

var Caml_option = require("rescript/lib/js/caml_option.js");
var ArraySt$Meta3dCommonlib = require("../ArraySt.js");
var NullUtils$Meta3dCommonlib = require("../utils/NullUtils.js");

function createEmpty(hintSizeOpt, param) {
  return [];
}

function copy(prim) {
  return prim.slice();
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

function getNullable(map, key) {
  return map[key];
}

function has(map, key) {
  return !NullUtils$Meta3dCommonlib.isEmpty(map[key]);
}

function map(map$1, func) {
  return map$1.map(function (value) {
              if (NullUtils$Meta3dCommonlib.isNotInMap(value)) {
                return ;
              } else {
                return func(value);
              }
            });
}

function reducei(map, func, initValue) {
  return ArraySt$Meta3dCommonlib.reduceOneParami(map, (function (previousValue, value, index) {
                if (NullUtils$Meta3dCommonlib.isNotInMap(value)) {
                  return previousValue;
                } else {
                  return func(previousValue, value, index);
                }
              }), initValue);
}

function getValues(map) {
  return map.filter(NullUtils$Meta3dCommonlib.isInMap);
}

function getKeys(map) {
  return ArraySt$Meta3dCommonlib.reduceOneParami(map, (function (arr, value, key) {
                if (NullUtils$Meta3dCommonlib.isNotInMap(value)) {
                  return arr;
                } else {
                  arr.push(key);
                  return arr;
                }
              }), []);
}

exports.createEmpty = createEmpty;
exports.copy = copy;
exports.unsafeGet = unsafeGet;
exports.get = get;
exports.getNullable = getNullable;
exports.has = has;
exports.map = map;
exports.reducei = reducei;
exports.getValues = getValues;
exports.getKeys = getKeys;
/* No side effect */
